import express from "express";
import ProblemStatement from "../models/ProblemStatement.js";
import { auth, requireRole } from "../middleware/jwt.js";

const router = express.Router();
// Public: get all problem statements for an event
router.get("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    const problems = await ProblemStatement.find({ eventId }).sort({
      createdAt: -1
    });

    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Coordinator only: add problem statement to an event
router.post(
  "/:eventId",
  auth,
  requireRole("coordinator"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { eventId } = req.params;

      const problem = await ProblemStatement.create({
        title,
        description,
        eventId,
        createdBy: req.user.id
      });

      res.status(201).json(problem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
