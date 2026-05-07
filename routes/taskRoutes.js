import express from "express";

import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get tasks
router.get("/", authMiddleware, getTasks);

// Create task (Admin only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTask
);

// Update task status
router.put("/:id", authMiddleware, updateTaskStatus);

export default router;