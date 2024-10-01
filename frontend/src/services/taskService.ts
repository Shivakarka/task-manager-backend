import api from "../api";
import { Task } from "../types/Task";

// Get all tasks
export const getTasks = async () => {
  const response = await api.get("/");
  return response.data;
};

// Create a new task
export const createTask = async (task: Task) => {
  const response = await api.post("/", task);
  return response.data;
};

// Update task
export const updateTask = async (id: string, task: Task) => {
  const response = await api.put(`/${id}`, task);
  return response.data;
};

// Delete task
export const deleteTask = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
