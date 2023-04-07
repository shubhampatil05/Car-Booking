import React from "react";
import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const auth = localStorage.getItem("auth");

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
