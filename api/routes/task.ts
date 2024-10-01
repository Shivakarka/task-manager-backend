import { Router, Request, Response } from "express";
import { Task, ITask } from "../models/Task";

const router = Router();

// Create Task
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    const task = new Task({ title, description, completed });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update task
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
