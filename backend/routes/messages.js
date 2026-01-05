const router = require("express").Router();
const Message = require("../models/messages");

router.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  await Message.create({ name, email, message });
  res.status(201).json({ message: "Message sent successfully" });
});

module.exports = router;
