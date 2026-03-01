import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminAuthRoutes from "./routes/admin/adminUserRoutes.js";
import planRoutes from "./routes/admin/planRoutes.js";

import OrderRoutes from "./routes/admin/orderRoutes.js";
import contactRoutes from "./routes/admin/contactRoutes.js";
import aboutRoutes from "./routes/admin/about.js";
import courseRoutes from "./routes/admin/courseRoutes.js";
import publicCourseRoutes from "./routes/courseRoutes.js";


import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

//Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large' });
    }
  }

  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});


//Routes
app.use('/api/auth', authRoutes);

app.use('/api/admin/', adminAuthRoutes);
app.use("/api/admin/plans", planRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/admin/about", aboutRoutes);
app.use("/api/admin/courses", courseRoutes);
app.use("/api/courses", publicCourseRoutes);

app.use("/api/admin/orders", OrderRoutes);


app.use("/api/orders/webhook", express.raw({ type: "application/json" }));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))