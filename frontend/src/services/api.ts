// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    // ensure headers exists and set Authorization
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default API;
