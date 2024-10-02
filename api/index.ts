import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/task";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
let cachedDb: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const mongoURI = process.env.MONGO_URI as string;
  const db = await mongoose.connect(mongoURI);
  cachedDb = db;
  return db;
}

// Routes
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

module.exports = async (req: Request, res: Response) => {
  await connectToDatabase();
  app(req, res);
};