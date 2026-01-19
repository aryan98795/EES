import express from "express";
import Solution from "../models/Solution.js";
import { auth, requireRole } from "../middleware/jwt.js";
import upload from "../middleware/upload.js";
import path from "path";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Student only: upload solution for a problem
router.post(
    "/:problemId/upload",
    auth,
    requireRole("student"),
    upload.single("file"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const { problemId } = req.params;

            cloudinary.uploader
                .upload_stream({ resource_type: "auto" }, async (error, result) => {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: "Cloudinary upload failed" });
                    }

                    try {
                        const solution = await Solution.create({
                            problemId,
                            studentId: req.user.id,
                            fileUrl: result.secure_url,
                        });

                        res.status(201).json({
                            message: "Solution uploaded successfully",
                            solution,
                        });
                    } catch (dbError) {
                        res.status(500).json({ message: dbError.message });
                    }
                })
                .end(req.file.buffer);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// Coordinator only: download a solution
router.get(
    "/:solutionId/download",
    auth,
    requireRole("coordinator"),
    async (req, res) => {
        try {
            const { solutionId } = req.params;

            const solution = await Solution.findById(solutionId);
            if (!solution) {
                return res.status(404).json({ message: "Solution not found" });
            }

            // Redirect to Cloudinary file URL
            res.redirect(solution.fileUrl);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

export default router;
