// src/components/PrivateRoute.tsx
import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  // Use redux state if available; fallback to localStorage for robustness
  const tokenFromStore = useSelector((s: RootState) => s?.auth?.token);
  const token = tokenFromStore ?? localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  return children;
}
