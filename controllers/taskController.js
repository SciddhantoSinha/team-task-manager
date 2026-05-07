import pool from "../config/db.js";

// ================= GET TASKS =================
export const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query(
      `SELECT tasks.*, users.name AS assigned_user
       FROM tasks
       LEFT JOIN users
       ON tasks.assigned_to = users.id
       ORDER BY tasks.id DESC`
    );

    res.status(200).json({
      message: "Tasks fetched successfully ✅",
      tasks: tasks.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};

// ================= CREATE TASK =================
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      project_id,
      assigned_to,
    } = req.body;

    const newTask = await pool.query(
      `INSERT INTO tasks
       (title, description, status, project_id, assigned_to)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        title,
        description,
        status || "pending",
        project_id,
        assigned_to,
      ]
    );

    res.status(201).json({
      message: "Task created successfully ✅",
      task: newTask.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};

// ================= UPDATE TASK STATUS =================
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await pool.query(
      `UPDATE tasks
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    res.status(200).json({
      message: "Task status updated successfully ✅",
      task: updatedTask.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};