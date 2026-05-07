import "./Login.css";
import { useState } from "react";
import axios from "axios";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);

      alert("Login successful ✅");

      window.location.href = "/dashboard";

    } catch (error) {

      console.error(error);

      alert("Login failed ❌");
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>
          Login to continue managing your projects and tasks
        </p>

        <form onSubmit={handleLogin}>

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

          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?
          <span
            onClick={() => window.location.href = "/register"}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;