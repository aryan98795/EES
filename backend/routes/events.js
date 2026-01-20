import express from "express";
import Event from "../models/Event.js";
import { auth, requireRole } from "../middleware/jwt.js";

const router = express.Router();

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

router.post(
  "/create-event",
  auth,
  requireRole("coordinator"),
  async (req, res) => {
    try {
      const { title } = req.body;

      const event = await Event.create({
        title,
      });

      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
