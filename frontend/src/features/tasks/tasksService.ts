// src/features/tasks/tasksService.ts
import API from "../../services/api";
import type { Task } from "../../types";

export const fetchTasks = () => API.get<Task[]>("/tasks");

export const createTask = (data: { title: string; description?: string }) =>
  API.post<Task>("/tasks", data);

export const deleteTask = (id: number) => API.delete<{ message?: string }>(`/tasks/${id}`);
export const updateTask = (id: number, data: Partial<Task>) =>
  API.put<Task>(`/tasks/${id}`, data);