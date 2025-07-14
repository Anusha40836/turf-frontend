import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function MyBookings() {
  const bgImageUrl =
    "https://images.pexels.com/photos/1657334/pexels-photo-1657334.jpeg";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/bookings/${id}`);
      toast.success("Booking cancelled!");
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
      toast.error("Failed to cancel booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* 🔲 Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          📋 My Bookings
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <p style={{ textAlign: "center" }}>No bookings yet.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "center",
            }}
          >
            {bookings.map((booking) => (
              <div
                key={booking._id}
                style={{
                  width: "300px",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  borderRadius: "15px",
                  backdropFilter: "blur(12px)",
                  padding: "20px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  animation: "fadeIn 0.7s ease forwards",
                }}
              >
                <h3>{booking.turf?.name}</h3>
                <p>📍 {booking.turf?.location}</p>
                <p>🗓️ {booking.date}</p>
                <p>🕒 {booking.timeSlot}</p>

                <button
                  onClick={() => handleDelete(booking._id)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#e63946",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default MyBookings;
