import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  if (token && isAdmin) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
