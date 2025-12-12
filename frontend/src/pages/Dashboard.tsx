import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuth } from "../features/auth/authSlice";
import {
  fetchTasks,
  createTask as createTaskAPI,
  deleteTask as deleteTaskAPI,
  updateTask,
} from "../features/tasks/tasksService";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import type { Task } from "../types";
import { isAxiosError } from "axios";

type NewTaskPayload = {
  title: string;
  description?: string;
  status?: "pending" | "completed";
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchTasks();
        if (!mounted) return;
        setTasks(res.data);
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 401) {
          dispatch(clearAuth());
          navigate("/login");
          return;
        }
        alert("Failed to load tasks");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch, navigate]);

  const onCreate = async (data: NewTaskPayload) => {
    const res = await createTaskAPI(data);
    setTasks((prev) => [res.data, ...prev]);
  };

  const onDelete = async (id: number) => {
    await deleteTaskAPI(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onToggleStatus = async (id: number, status: "pending" | "completed") => {
    const res = await updateTask(id, { status });

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: res.data.status } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Dashboard</h2>
        <button
          onClick={() => {
            dispatch(clearAuth());
            navigate("/login");
          }}
          className="text-sm text-red-600"
        >
          Logout
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TaskForm onCreate={onCreate} />

      <div className="space-y-3 mt-4">
        {filteredTasks.length === 0 ? (
          <div className="text-gray-600">No tasks found.</div>
        ) : (
          filteredTasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))
        )}
      </div>
    </div>
  );
}
