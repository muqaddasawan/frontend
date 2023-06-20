import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = localStorage.getItem("clienttoken");
  return auth ? <Outlet /> : <Navigate to="/user/login" />;
};

export default ProtectedRoutes;
