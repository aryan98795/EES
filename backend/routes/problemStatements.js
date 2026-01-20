import express from "express";
import ProblemStatement from "../models/ProblemStatement.js";
import { auth, requireRole } from "../middleware/jwt.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post(
  "/:eventId/upload",
  auth,
  requireRole("coordinator"),
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { eventId } = req.params;
    const { title } = req.body;

    cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: req.file.originalname.split(".")[0],
        use_filename: true,
        unique_filename: false
      },
      async (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        const ps = await ProblemStatement.create({
          title,
          eventId,
          fileUrl: result.secure_url,
        });

        res.status(201).json(ps);
      }
    ).end(req.file.buffer);
  }
);


router.get(
  "/:eventId/:psId/download",
  auth,
  async (req, res) => {
    try {
      const { psId } = req.params;
      const ps = await ProblemStatement.findById(psId);
      if (!ps) return res.status(404).json({ message: "Problem statement not found" });
      res.redirect(ps.fileUrl);
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
)
export default router;
