import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  description?: string;
  status: string;
};

type Props = {
  onCreate: (data: FormData) => void;
};

export default function TaskForm({ onCreate }: Props) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { status: "pending" },
  });

  const submit = (data: FormData) => {
    onCreate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3 p-3 border rounded">
      <input
        {...register("title", { required: true })}
        placeholder="Task title"
        className="w-full p-2 border rounded"
      />

      <input
        {...register("description")}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />

      {/* Status Dropdown */}
      <select {...register("status")} className="w-full p-2 border rounded">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button className="w-full bg-blue-600 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
}

