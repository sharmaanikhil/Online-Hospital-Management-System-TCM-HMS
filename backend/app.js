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
  "http://localhost:5173",
  process.env.FRONTEND_URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server & Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
