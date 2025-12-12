// src/pages/Login.tsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../services/api";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";
import { isAxiosError } from "axios";

type Form = { username: string; password: string };

export default function Login() {
  const { register, handleSubmit } = useForm<Form>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: Form) => {
    try {
      const res = await API.post("/auth/login", data);
      const token = res.data.token;
      dispatch(setAuth({ token, username: data.username }));
      navigate("/");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        alert(err.response?.data?.message || "Login failed");
      } else {
        console.error(err);
        alert("Login failed");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("username")} placeholder="Username" className="p-2 border rounded w-full" />
        <input {...register("password")} type="password" placeholder="Password" className="p-2 border rounded w-full" />
        <button className="w-full p-2 bg-green-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
