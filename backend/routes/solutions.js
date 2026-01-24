import express from "express";
import Solution from "../models/Solution.js";
import { auth, requireRole } from "../middleware/jwt.js";
import upload from "../middleware/upload.js";
import path from "path";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

const router = express.Router();

router.post(
  "/:problemId/upload",
  auth,
  requireRole(["student", "admin", "coordinator"]),
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { problemId } = req.params;

      const result = await uploadToCloudinary(req.file.buffer);

      const solution = await Solution.create({
        problemId,
        studentId: req.user.id,
        fileUrl: result.secure_url,
      });

      res.status(201).json({
        message: "Solution uploaded successfully",
        solution,
      });
    } catch (err) {
      console.error("Solution upload failed:", err);
      res.status(500).json({
        message: "Failed to upload solution",
      });
    }
  }
);


router.get(
  "/:solutionId/download",
  auth,
  requireRole(["admin", "coordinator"]),
  async (req, res) => {
    try {
      const { solutionId } = req.params;

      const solution = await Solution.findById(solutionId);
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }

      res.redirect(solution.fileUrl);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
