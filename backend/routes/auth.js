import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { z } from "zod";
import { signupSchema, loginSchema } from "../validators/zod.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const { name, email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hash,
      role: "user",
      isVerified: true,
    });

    res.status(201).json({
      message: "Signup successful!",
      userId: user._id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0].message;
      return res.status(400).json({ message: errorMessage });
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    console.log(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const { email, password } = parsed.data;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message: "invalid credentials",
      });

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );

    res.json({
      token: token,
      role: user.role,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0].message;
      return res.status(400).json({ message: errorMessage });
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
