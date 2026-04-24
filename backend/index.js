import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3050;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const allowedOrigins = [
  "http://localhost:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/booking", bookingRoutes);

app.get('/api', (req, res) => {
  res.send('welcome to devbhoomi api');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist'))); 

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
