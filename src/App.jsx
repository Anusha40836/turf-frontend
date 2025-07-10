import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Turfs from "./pages/Turfs";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import AdminTurfs from "./pages/AdminTurfs";
import AdminBookings from "./pages/AdminBookings";
import Layout from "./components/Layout"; // ✅ Import layout

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes with Layout wrapper */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/turfs"
        element={
          <ProtectedRoute>
            <Layout>
              <Turfs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Layout>
              <Booking />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <Layout>
              <MyBookings />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/turfs"
        element={
          <ProtectedRoute>
            <Layout>
              <AdminTurfs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-bookings"
        element={
          <ProtectedRoute adminOnly={true}>
            <Layout>
              <AdminBookings />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
