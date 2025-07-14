import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const backgroundImage =
    "https://images.pexels.com/photos/2029733/pexels-photo-2029733.jpeg";

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const res = await API.get("/bookings/admin");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load all bookings:", err);
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="vh-100 vw-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      {/* Content Card */}
      <div
        className={`card text-white p-4 shadow-lg overflow-auto ${
          fadeIn ? "fade-in-card" : ""
        }`}
        style={{
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(14px)",
          borderRadius: "20px",
          zIndex: 2,
          opacity: 0,
          animation: fadeIn ? "fadeIn 1s ease-out forwards" : "none",
        }}
      >
        <h4 className="text-center mb-4">📋 All Bookings (Admin View)</h4>

        {loading ? (
          <p>Loading all bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="list-group-item text-white"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  marginBottom: "12px",
                }}
              >
                <strong>🏟 {booking.turf?.name}</strong> -{" "}
                {booking.turf?.location}
                <br />
                🗓 <strong>Date:</strong> {booking.date} | 🕒{" "}
                <strong>Time:</strong> {booking.timeSlot}
                <br />
                👤 <strong>User:</strong> {booking.user?.name || "N/A"} | 📧{" "}
                {booking.user?.email || "N/A"}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in-card {
            animation: fadeIn 1s ease-out forwards;
          }

          /* Scrollbar styling for long list */
          .card::-webkit-scrollbar {
            width: 6px;
          }

          .card::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
          }
        `}
      </style>
    </div>
  );
}

export default AdminBookings;
