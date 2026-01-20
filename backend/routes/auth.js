import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { signupSchema, loginSchema } from "../validators/zod.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const { name, email, password } = parsed.data;

    const hash = await bcrypt.hash(password, 10);

    await User.create({
        name: name,
        email: email,
        password: hash,
        role: "user"
    });

    res.json({
        message: "Signup success"
    });
});


router.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    console.log(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const { email, password } = parsed.data;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({
        message: "invalid  credentials"
    });

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        return res.status(401).json({
            message: "invalid  credentials"
        });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
    );

    res.json({
        token: token,
        role: user.role
    });
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // input check karo
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

     //password match hona chaiye
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email does not exist"
      });
    }
    // password same hona chaiye
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({
        message: "New password cannot be same as old password"
      });
    }

    //  Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //  Save new password
    user.password = hashedPassword;
    await user.save();

    //  Success response
    return res.status(200).json({
      message: "Password reset successful. Please login again."
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;