import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
    project_id: "",
    assigned_to: 1,
  });

  // =========================
  // Fetch Projects
  // =========================

  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProjects(response.data.projects || []);

    } catch (error) {

      console.error(error);
    }
  };

  // =========================
  // Fetch Tasks
  // =========================

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(response.data.tasks || []);

    } catch (error) {

      console.error(error);
    }
  };

  // =========================
  // Create Project
  // =========================

  const handleCreateProject = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/projects",
        projectData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Project created successfully ✅");

      setProjectData({
        title: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {

      console.error(error);

      alert("Failed to create project ❌");
    }
  };

  // =========================
  // Create Task
  // =========================

  const handleCreateTask = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tasks",
        taskData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Task created successfully ✅");

      setTaskData({
        title: "",
        description: "",
        status: "pending",
        project_id: "",
        assigned_to: 1,
      });

      fetchTasks();

    } catch (error) {

      console.error(error);

      alert("Failed to create task ❌");
    }
  };

  // =========================
  // Logout
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  // =========================
  // Load Data
  // =========================

  useEffect(() => {

    fetchProjects();
    fetchTasks();

  }, []);

  return (

    <div className="dashboard-container">

      {/* Header */}

      <div className="dashboard-header">

        <h1 className="dashboard-title">
          Dashboard 🚀
        </h1>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

      {/* Create Project */}

      <div className="form-section">

        <h2 className="form-title">
          Create Project
        </h2>

        <form
          onSubmit={handleCreateProject}
          className="form-container"
        >

          <input
            type="text"
            placeholder="Project title"
            value={projectData.title}
            onChange={(e) =>
              setProjectData({
                ...projectData,
                title: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Project description"
            value={projectData.description}
            onChange={(e) =>
              setProjectData({
                ...projectData,
                description: e.target.value,
              })
            }
          />

          <button type="submit">
            Create Project
          </button>

        </form>

      </div>

      {/* Create Task */}

      <div className="form-section">

        <h2 className="form-title">
          Create Task
        </h2>

        <form
          onSubmit={handleCreateTask}
          className="form-container"
        >

          <input
            type="text"
            placeholder="Task title"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                title: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Task description"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                description: e.target.value,
              })
            }
          />

          <select
            value={taskData.status}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                status: e.target.value,
              })
            }
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="number"
            placeholder="Project ID"
            value={taskData.project_id}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                project_id: e.target.value,
              })
            }
          />

          <button type="submit">
            Create Task
          </button>

        </form>

      </div>

      {/* Projects */}

      <h2 className="section-title">
        Projects
      </h2>

      <div className="cards-container">

        {projects.map((project) => (

          <div
            key={project.id}
            className="card"
          >

            <h3>{project.title}</h3>

            <p>{project.description}</p>

          </div>

        ))}

      </div>

      {/* Tasks */}

      <h2 className="section-title">
        Tasks
      </h2>

      <div className="cards-container">

        {tasks.map((task) => (

          <div
            key={task.id}
            className="card"
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p
              className={`status ${task.status}`}
            >
              <strong>Status:</strong> {task.status}
            </p>

            <p>
              <strong>Project ID:</strong> {task.project_id}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;