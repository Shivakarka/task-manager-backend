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

// Routes
app.use("/api/tasks", taskRoutes);

// MongoDB connection
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

// Wrap the Express app to connect to the database before handling requests
const handler = async (req: Request, res: Response) => {
  await connectToDatabase();
  return app(req, res);
};

export default handler;