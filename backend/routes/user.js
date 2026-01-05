const router = require("express").Router();
const User = require("../models/user");
const Appointment = require("../models/appointment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/AuthMiddleware");
const upload = require("../helpers/multer");
const cloudinary = require("../helpers/cloudinary");

router.post("/sign-up", async (req, res) => {
  const { name, email, password, gender, contact } = req.body;
  if (!name || !email || !password || !gender || !contact)
    return res.status(400).json({ error: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "User exists" });

  await User.create({ name, email, password, gender, contact });
  res.status(201).json({ message: "Registered" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || user.role === "admin")
    return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.cookie("vhaToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  const { password, ...safeUser } = user._doc;
  res.json({ user: safeUser });
});

router.get("/user-details", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
});

router.get("/logout", (req, res) => {
  res.clearCookie("vhaToken");
  res.json({ message: "Logged out" });
});

router.post(
  "/upload-report",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      async (err, result) => {
        await User.findByIdAndUpdate(req.user.id, {
          patientReport: result.secure_url,
        });
        res.json({ patientReport: result.secure_url });
      }
    );
    result.end(req.file.buffer);
  }
);

router.get("/my-appointments", authMiddleware, async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user.id })
    .populate("doctor")
    .lean();
  res.json({ appointments });
});

router.get("/get-openRouter-key", authMiddleware, (req, res) => {
  res.json({ key: process.env.OPENROUTER_API_KEY });
});

module.exports = router;
