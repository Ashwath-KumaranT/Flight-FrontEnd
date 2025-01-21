import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
import React from "react";

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;