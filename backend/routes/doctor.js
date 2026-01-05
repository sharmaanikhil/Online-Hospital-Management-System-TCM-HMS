const router = require("express").Router();
const User = require("../models/user");
const Appointment = require("../models/appointment");
const authMiddleware = require("../middleware/AuthMiddleware");
const { v4: uuidv4 } = require("uuid");

router.get("/fetch-doctors", async (req, res) => {
  const doctors = await User.find({ role: "doctor" }).select("-password");
  res.json({ doctors });
});

router.get("/doctor-details/:id", async (req, res) => {
  const doctor = await User.findById(req.params.id).select("-password");
  const appointments = await Appointment.find({
    doctor: req.params.id,
    status: "Pending",
  }).select("date time");

  res.json({ user: doctor, appointments });
});

router.post("/book-appointment", authMiddleware, async (req, res) => {
  const { doctorId, date, time } = req.body;
  const roomId = uuidv4();

  const exists = await Appointment.findOne({ doctor: doctorId, date, time });
  if (exists) return res.status(400).json({ message: "Slot already booked" });

  const appt = await Appointment.create({
    doctor: doctorId,
    patient: req.user.id,
    date,
    time,
    roomId,
  });

  res.status(201).json({ message: "Booked", appointment: appt });
});

router.put(
  "/update-appointment-status/:id",
  authMiddleware,
  async (req, res) => {
    if (req.user.role !== "doctor")
      return res.status(403).json({ message: "Doctor only" });

    await Appointment.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });

    res.json({ success: true });
  }
);

router.get("/doctor-appointments", authMiddleware, async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.user.id })
    .populate("patient")
    .lean();
  res.json({ appointments });
});

module.exports = router;
