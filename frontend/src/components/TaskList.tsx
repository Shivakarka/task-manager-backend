import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { Task } from '../types/Task';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
   try {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
    console.log('Tasks loaded:', fetchedTasks);
   } catch (error) {
     console.error(error);
   }
  };

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description) return;
    await createTask(newTask);
    setNewTask({ title: '', description: '', completed: false });
    loadTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const task = tasks.find((task) => task._id === id);
    if (task) {
      await updateTask(id, { ...task, completed: !completed });
      loadTasks();
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>

      <ul>
        {tasks?.map((task) => (
          <li key={task._id} className={`${task.completed ? "done" : "undone"} `}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleToggleComplete(task._id!, task.completed)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task._id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
