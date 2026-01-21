import express from "express";
import { createPost, getPosts } from "../controllers/forum.js";
import { auth } from "../middleware/jwt.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

router.post("/posts", auth, requireRole(["coordinator", "admin"]), createPost);
router.get("/post", getPosts);

export default router;
