import { Outlet, Navigate } from "react-router-dom";
export const AuthPrivate = () => {
  const username = localStorage.getItem("username");
  return !username ? <Outlet /> : <Navigate to="/dashboard" />;
};
export const HomePrivate = () => {
  const username = localStorage.getItem("username");
  return username ? <Outlet /> : <Navigate to="/login" />;
};
