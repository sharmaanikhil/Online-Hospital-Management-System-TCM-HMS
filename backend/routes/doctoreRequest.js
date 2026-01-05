const router = require("express").Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/AuthMiddleware");
const upload = require("../helpers/multer");
const cloudinary = require("../helpers/cloudinary");
const DoctorRequest = require("../models/doctorRequest");

router.post(
  "/doctor-request",
  authMiddleware,
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const { specialization, degree, address, description } = req.body;

      // ✅ basic validation
      if (!specialization || !degree || !address || !description) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Profile photo is required." });
      }

      // ✅ fetch user safely
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // ✅ only patient can apply
      if (user.role !== "patient") {
        return res
          .status(403)
          .json({ message: "Only patients can apply to become a doctor." });
      }

      // ✅ prevent duplicate requests
      const existingRequest = await DoctorRequest.findOne({
        userId: user._id,
        status: { $in: ["Pending", "Approved"] },
      });

      if (existingRequest) {
        return res.status(400).json({
          message: "You have already submitted a doctor application.",
        });
      }

      // ✅ upload image to cloudinary
      const uploadedImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "doctor-profile-photos",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      // ✅ create doctor request
      const doctorRequest = new DoctorRequest({
        userId: user._id,
        name: user.name,
        email: user.email,
        specialization,
        degree,
        address,
        description,
        profilePhotoUrl: uploadedImage.secure_url,
        status: "Pending",
      });

      await doctorRequest.save();

      return res.status(201).json({
        success: true,
        message: "Doctor application submitted successfully.",
      });
    } catch (error) {
      console.error("Doctor request error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
