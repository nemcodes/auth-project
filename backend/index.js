import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { join } from "path";
import { fileURLToPath } from "url";
const serverless = require("serverless-http");

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Serve frontend static files
app.use(express.static(join(__dirname, "../frontend/dist")));

// ✅ Express 5–safe fallback for all other routes
app.use((req, res) => {
  res.sendFile(join(__dirname, "../frontend/dist/index.html"));
});

// Start server & connect to DB
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

module.exports = serverless(app);

export default app;
