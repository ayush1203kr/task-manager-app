// src/pages/Register.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../services/api";
import { isAxiosError } from "axios";

type Form = { username: string; password: string };

export default function Register() {
  const { register, handleSubmit } = useForm<Form>();
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    try {
      await API.post("/auth/register", data);
      alert("Registered! Now login.");
      navigate("/login");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        alert(err.response?.data?.message || "Register failed");
      } else {
        console.error(err);
        alert("Register failed");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("username")} placeholder="Username" className="p-2 border rounded w-full" />
        <input {...register("password")} type="password" placeholder="Password" className="p-2 border rounded w-full" />
        <button className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
