// src/components/TaskItem.tsx
import React from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onDelete }: Props) {
  return (
    <div className="p-3 bg-white shadow rounded flex justify-between items-center">
      <div>
        <div className="font-semibold">{task.title}</div>
        {task.description && <div className="text-sm text-gray-600">{task.description}</div>}
      </div>
      <button onClick={() => onDelete(task.id)} className="text-red-600 text-sm">Delete</button>
    </div>
  );
}
