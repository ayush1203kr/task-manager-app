import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = Router();

// Helper to get userId from JWT payload
const getUserId = (req: Request): number | null => {
  const user = (req as any).user as { userId?: number };
  return user?.userId ?? null;
};

// GET /api/tasks - list tasks of current user
router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/tasks - create new task
router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "pending",
        userId,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/tasks/:id - update task
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const taskId = Number(req.params.id);
    const { title, description, status } = req.body;

    const existing = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existing) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        status: status ?? existing.status,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/tasks/:id - delete task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const taskId = Number(req.params.id);

    const existing = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existing) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({ where: { id: taskId } });

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
