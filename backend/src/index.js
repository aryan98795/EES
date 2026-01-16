import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "../routes/auth.js";

dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})

