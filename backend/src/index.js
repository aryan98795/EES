import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "../routes/auth.js";
import { auth, requireRole } from "../middleware/jwt.js";
import adminRoutes from "../routes/admin.js";
import eventsRoutes from "../routes/events.js";
import problemStatementRoutes from "../routes/problemStatements.js";
import solutionRoutes from "../routes/solutions.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/problems", problemStatementRoutes);
app.use("/api/solutions", solutionRoutes);

mongoose.connect(process.env.MONGO_URI);


app.get("/admin", auth, requireRole("admin"), (req, res) => {
    res.json({ message: "Admin access granted" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
