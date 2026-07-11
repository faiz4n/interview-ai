const express = require("express");
const path = require("path");
const app = express();
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({ origin: process.env.VITE_FRONTEND_URL, credentials: true }));

// app.get("/", (req, res) => {
//   res.send("Welcome to the Interview Preparation API!");
// });

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

module.exports = app;
