import pool from "../config/db.js";

// ================= GET PROJECTS =================
export const getProjects = async (req, res) => {
  try {
    const projects = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );

    res.status(200).json({
      message: "Projects fetched successfully ✅",
      projects: projects.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};

// ================= CREATE PROJECT =================
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Logged in user
    const created_by = req.user.id;

    // Insert into DB
    const newProject = await pool.query(
      `INSERT INTO projects (title, description, created_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description, created_by]
    );

    res.status(201).json({
      message: "Project created successfully ✅",
      project: newProject.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};