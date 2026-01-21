import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "../routes/auth.js";
import { auth, requireRole } from "../middleware/jwt.js";
import adminRoutes from "../routes/admin.js";
import eventsRoutes from "../routes/events.js";
import solutionRoutes from "../routes/solutions.js";
import forumRoutes from "../routes/forum.js";
import ProblemStatement from "../models/ProblemStatement.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/events", eventsRoutes);
app.use("/api/solutions", solutionRoutes);

app.post(
  "/api/upload",
  auth,
  requireRole(["coordinator"]),
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title } = req.body;

    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "raw",
          public_id: req.file.originalname.split(".")[0],
          use_filename: true,
          unique_filename: false,
        },
        async (err, result) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }

          const ps = await ProblemStatement.create({
            title,
            fileUrl: result.secure_url,
          });

          res.status(201).json(ps);
        },
      )
      .end(req.file.buffer);
  },
);

app.get("/api/ps/:psId/download", auth, async (req, res) => {
  try {
    const { psId } = req.params;
    const ps = await ProblemStatement.findById(psId);

    if (!ps) {
      return res.status(404).json({ message: "Problem statement not found" });
    }

    res.redirect(ps.fileUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.connect(process.env.MONGO_URI);

app.get("/admin", auth, requireRole("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
