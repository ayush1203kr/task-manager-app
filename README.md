📝 Task Manager App

A full-stack task management application built with React + TypeScript, Redux Toolkit, Node.js, Express, Prisma, and PostgreSQL.
Users can register, log in, and manage tasks (add, delete, update status).

🚀 Tech Stack
Frontend

⚛️ React (TypeScript)

🛠️ Redux Toolkit

🌐 React Router

📝 React Hook Form + Zod

⚡ Vite

🎨 TailwindCSS

🔗 Axios

Backend

🟩 Node.js + Express

🗄️ PostgreSQL

🧩 Prisma ORM

🔐 JWT Authentication

🔒 bcryptjs (for hashing)

📦 TypeScript

📂 Project Structure
task-manager-app/
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── prisma/
│   ├── package.json
│   └── .env (not committed)
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── features/
    │   ├── services/
    │   └── store/
    ├── package.json
    └── index.html

⚙️ Backend Setup
1️⃣ Install dependencies
cd backend
npm install

2️⃣ Create .env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5000/task_manager_db?schema=public"
JWT_SECRET="supersecret_jwt_key"
PORT=5001

3️⃣ Run Prisma migrations
npx prisma migrate dev

4️⃣ Start backend server
npm run dev


Backend runs at:
👉 http://localhost:5001

🎨 Frontend Setup
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Start development server
npm run dev


Frontend runs at:
👉 http://localhost:5173

🔐 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login & return JWT token
Register Request
{
  "username": "ayush",
  "password": "12345678"
}

Login Response
{
  "token": "your-jwt-token"
}

Task Routes (Protected)

Requires Header:
Authorization: Bearer <token>

Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
Create Task
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs"
}

Update Task
{
  "status": "completed"
}

🖥️ Features
Backend Features

✔ User Registration
✔ Password Hashing
✔ JWT Authentication
✔ Auth Middleware
✔ CRUD for Tasks
✔ Prisma ORM + PostgreSQL
✔ Status field (pending / completed)

Frontend Features

✔ Login & Register pages
✔ Protected Dashboard
✔ Add Task Form
✔ Delete Task
✔ View Tasks
✔ Global State with Redux Toolkit
✔ Auto redirect on expired token
✔ TailwindCSS UI

👨‍💻 Author

Ayush Kumar
📌 GitHub: https://github.com/ayush1203kr

📧 Email: sahilayush1203@gmail.com
