import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { auth, requireRole } from "../middleware/jwt.js";

const router = express.Router();

router.post(
    "/create-user",
    auth,
    requireRole(["admin"]),
    async (req, res) => {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Missing fields" });
        }

        if (!["admin", "coordinator"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hash,
            role
        });

        res.json({ message: `${role} created successfully` });
    }
);

export default router;
