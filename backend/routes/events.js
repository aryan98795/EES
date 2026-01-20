import express from "express";
import Event from "../models/Event.js";
import { auth, requireRole } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/",
  auth,
  requireRole("coordinator"),
  async (req, res) => {
    try {
      const { title, description, date } = req.body;

      const event = await Event.create({
        title,
        description,
        date,
        createdBy: req.user.id
      });

      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
