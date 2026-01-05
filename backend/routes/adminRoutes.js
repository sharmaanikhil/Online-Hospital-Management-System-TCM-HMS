const router = require("express").Router();
const User = require("../models/user");
const Message = require("../models/messages");
const DoctorRequest = require("../models/doctorRequest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/AuthMiddleware");
const adminOnly = require("../middleware/adminOnly"); // ✅ NOW EXISTS

/* ================= ADMIN LOGIN ================= */
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const admin = await User.findOne({ email });
    if (!admin || admin.role !== "admin") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("vhaToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: { email: admin.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= DASHBOARD STATS ================= */
router.get(
  "/dashboard-details",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const patients = await User.countDocuments({ role: "patient" });
      const doctors = await User.countDocuments({ role: "doctor" });
      const admins = await User.countDocuments({ role: "admin" });

      res.status(200).json({
        success: true,
        data: { patients, doctors, admins },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= FETCH MESSAGES ================= */
router.get(
  "/fetch-messages",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  }
);

/* ================= FETCH DOCTOR REQUESTS ================= */
router.get(
  "/fetch-doctors-requests",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    const requests = await DoctorRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  }
);

/* ================= UPDATE DOCTOR REQUEST ================= */
router.put(
  "/update-doctor-request/:id",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    const { status } = req.body;

    const request = await DoctorRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    if (status === "Approved") {
      await User.findByIdAndUpdate(request.userId, {
        role: "doctor",
        doctorInfo: {
          specialization: request.specialization,
          degree: request.degree,
          address: request.address,
          description: request.description,
          profilePhoto: request.profilePhotoUrl,
        },
      });
    }

    res.json({ success: true, message: "Status updated" });
  }
);

module.exports = router;
