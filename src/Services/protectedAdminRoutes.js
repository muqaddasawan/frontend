import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const protectedAdminRoutes = () => {
  const auth = localStorage.getItem("token");
  const adminuser = localStorage.getItem("adminname");
  return adminuser ? <Outlet /> : <Navigate to="/admin-user/login" />;
};

export default protectedAdminRoutes;
