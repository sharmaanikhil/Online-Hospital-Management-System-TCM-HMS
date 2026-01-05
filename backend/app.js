const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./conn/conn");
const cookieParser = require("cookie-parser");

const usersAPI = require("./routes/user");
const messagesAPI = require("./routes/messages");
const doctorsAPI = require("./routes/doctor");
const doctorRequestsAPI = require("./routes/doctoreRequest");
const adminAPI = require("./routes/adminRoutes");

const app = express();

/* 🔐 REQUIRED FOR RENDER / COOKIES */
app.set("trust proxy", 1);

/* MIDDLEWARES */
app.use(express.json());
app.use(cookieParser());

/* 🌐 CORS CONFIG (DEV + PROD SAFE) */
const allowedOrigins = [
  "http://localhost:5173",                 // local frontend
  process.env.FRONTEND_URL                // deployed frontend (Vercel)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ROUTES */
app.use("/api/v1", usersAPI);
app.use("/api/v1", messagesAPI);
app.use("/api/v1", doctorsAPI);
app.use("/api/v1", doctorRequestsAPI);
app.use("/api/v1", adminAPI);

/* SERVER */
const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
