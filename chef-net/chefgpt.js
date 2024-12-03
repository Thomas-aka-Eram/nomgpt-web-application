import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import GeneralRoutes from "./Routes/GeneralRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use("/api/", GeneralRoutes);

const port = process.env.PORT || 5000;
const uri = process.env.DB_KEY;

// Connect to MongoDB
mongoose
    .connect(uri, {})
    .then(() => console.log('MongoDB connection established...'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`server running on ${port}`);
});
