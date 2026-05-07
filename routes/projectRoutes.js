import express from "express";

import {
  getProjects,
  createProject,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get projects
router.get("/", authMiddleware, getProjects);

// Create project (Admin only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProject
);

export default router;