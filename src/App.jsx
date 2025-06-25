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
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/turfs"
          element={
            <ProtectedRoute>
              <Turfs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/turfs"
          element={
            <ProtectedRoute>
              <AdminTurfs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-bookings"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
