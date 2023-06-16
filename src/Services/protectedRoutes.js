import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/user/login" />;
};

export default ProtectedRoutes;
