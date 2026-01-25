import express from "express";
import Event from "../models/Event.js";
import { auth, requireRole } from "../middleware/jwt.js";

const router = express.Router();

/* ===================== PUBLIC ===================== */

// Get all events (navbar dropdown)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .select("title")
      .sort({ createdAt: -1 });

    res.json(events);
  } catch {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// Get single event details
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch {
    res.status(500).json({ message: "Failed to fetch event" });
  }
});

/* ================= COORDINATOR / ADMIN ================= */

// Create event
router.post(
  "/",
  auth,
  requireRole(["coordinator", "admin"]),
  async (req, res) => {
    try {
      const { title, description, resources, coordinators } = req.body;

      const event = await Event.create({
        title,
        description,
        resources,
        coordinators,
      });

      res.status(201).json(event);
    } catch {
      res.status(500).json({ message: "Failed to create event" });
    }
  }
);

// Update event
router.put(
  "/:eventId",
  auth,
  requireRole(["coordinator", "admin"]),
  async (req, res) => {
    try {
      const { title, description, resources, coordinators } = req.body;

      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (resources !== undefined) updateData.resources = resources;
      if (coordinators !== undefined) updateData.coordinators = coordinators;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
      }

      const event = await Event.findByIdAndUpdate(
        req.params.eventId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update event" });
    }
  }
);


// Delete event
router.delete(
  "/:eventId",
  auth,
  requireRole(["coordinator", "admin"]),
  async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });
      res.json({ message: "Event deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete event" });
    }
  }
);

export default router;
