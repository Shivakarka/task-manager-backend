"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Task_1 = require("../models/Task");
const router = (0, express_1.Router)();
// Create Task
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, completed } = req.body;
        const task = new Task_1.Task({ title, description, completed });
        yield task.save();
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}));
// Get all tasks
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.Task.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}));
// Update task
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const updatedTask = yield Task_1.Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}));
// Delete task
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Task_1.Task.findByIdAndDelete(id);
        res.json({ message: "Task Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}));
exports.default = router;
