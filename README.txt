# Team Task Manager (Full-Stack)

A full-stack Team Task Manager application where users can create projects, assign tasks, and track project progress with role-based access control.

---

## 🚀 Features

* User Authentication (Signup/Login)
* JWT-based Authentication & Authorization
* Role-based Access Control (Admin / Member)
* Project Management
* Task Creation & Assignment
* Task Status Tracking
* Dashboard Overview
* PostgreSQL Database Integration
* REST API Architecture
* Railway Deployment

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcrypt.js

### Deployment

* Railway

---

## 📂 Project Structure

```
team-task-manager/
│
├── config/
├── controllers/
├── middleware/
├── routes/
├── frontend/
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=your_postgresql_connection_url
JWT_SECRET=your_jwt_secret
PORT=8080
```

---

## ▶️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/SciddhantoSinha/team-task-manager.git
```

### 2. Navigate Into Project

```bash
cd team-task-manager
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 5. Run Backend Server

```bash
npm start
```

### 6. Run Frontend

```bash
npm run dev
```

---

## 🌐 Railway Deployment

### Live Application URL

[https://team-task-manager-production-f3afd.up.railway.app](https://team-task-manager-production-f3afd.up.railway.app)

### GitHub Repository

[https://github.com/SciddhantoSinha/team-task-manager](https://github.com/SciddhantoSinha/team-task-manager)

---

## 🔐 Authentication

The application uses:

* JWT (JSON Web Tokens)
* Protected Routes
* Role-Based Access

---

## 📌 API Routes

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### Projects

* `GET /api/projects`
* `POST /api/projects`

### Tasks

* `GET /api/tasks`
* `POST /api/tasks`
* `PUT /api/tasks/:id`

---

## 📊 Dashboard Features

* View assigned tasks
* Track task status
* Monitor overdue tasks
* Manage project workflow

---

## 👨‍💻 Author

Sciddhanto Sinha

GitHub: [https://github.com/SciddhantoSinha](https://github.com/SciddhantoSinha)
