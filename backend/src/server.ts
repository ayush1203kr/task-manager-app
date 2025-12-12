// backend/src/server.ts
import "dotenv/config";

// Use require() to avoid esModuleInterop/runtime .default issues
const express = require("express");
const cors = require("cors");

// require local modules - prefer require to avoid import default/name mismatches
const authRoutes = require("./routes/auth").default || require("./routes/auth");
const taskRoutes = require("./routes/tasks").default || require("./routes/tasks");
const authMiddlewareModule = require("./middleware/auth");
const authMiddleware = authMiddlewareModule.authMiddleware || authMiddlewareModule.default || authMiddlewareModule;

const app = express();
const PORT = process.env.PORT || 5001;

// CORS middleware (handles preflight)
app.use(
  cors({
    origin: "http://localhost:5173", // update if your Vite uses a different port
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Light OPTIONS responder (safe)
app.use((req: any, res: any, next: any) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json());

// Ensure each route/middleware is a function before using it
if (typeof authRoutes === "function" || (authRoutes && authRoutes.stack)) {
  app.use("/api/auth", authRoutes);
} else {
  console.error("authRoutes is not a router/function:", typeof authRoutes, authRoutes);
}

if (typeof authMiddleware === "function") {
  if (typeof taskRoutes === "function" || (taskRoutes && taskRoutes.stack)) {
    app.use("/api/tasks", authMiddleware, taskRoutes);
  } else {
    console.error("taskRoutes is not a router/function:", typeof taskRoutes, taskRoutes);
  }
} else {
  console.error("authMiddleware is not a function:", typeof authMiddleware, authMiddleware);
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`DATABASE_URL="${process.env.DATABASE_URL}"`);
  console.log(`JWT_SECRET="${process.env.JWT_SECRET}"`);
  console.log(`PORT=${process.env.PORT}`);
});
