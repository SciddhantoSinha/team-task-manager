import "./Register.css";
import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("Registration successful ✅");

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      alert("Registration failed ❌");
    }
  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h1>Create Account 🚀</h1>

        <p>
          Register to start managing projects and tasks
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value,
              })
            }
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <span onClick={() => window.location.href = "/"}>
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;