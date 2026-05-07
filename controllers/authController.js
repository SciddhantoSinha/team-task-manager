import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import bcrypt from "bcrypt";

// ================= REGISTER USER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, role || "member"]
    );

    res.status(201).json({
      message: "User registered successfully ✅",
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};

// ================= LOGIN USER =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "User not found ❌",
      });
    }

    const user = userResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials ❌",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
};