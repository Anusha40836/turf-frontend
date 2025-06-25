import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    if (adminOnly && decoded.role !== "admin") {
      return <Navigate to="/" />; // not authorized
    }

    return children;
  } catch (error) {
    console.error("Invalid token");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
