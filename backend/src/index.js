import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "../routes/auth.js";

dotenv.config();
const app = express();

app.use("/api/auth", authRoutes);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})

