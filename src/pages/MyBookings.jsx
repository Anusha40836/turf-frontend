import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const bgImageUrl =
    "https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg";

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
      alert("Booking deleted!");
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading your bookings...</p>;
  if (bookings.length === 0) return <p>No bookings yet.</p>;

  return (
    <div
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: 24,
        color: "black", // Optional for contrast
        backdropFilter: "brightness(0.7)", // Optional for readability
      }}
    >
      <h2>📋 My Bookings</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ccc",
              padding: 16,
              width: 300,
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{booking.turf?.name}</h3>
            <p>📍 {booking.turf?.location}</p>
            <p>🗓️ {booking.date}</p>
            <p>🕒 {booking.timeSlot}</p>
            <button
              onClick={() => handleDelete(booking._id)}
              style={{
                backgroundColor: "#e63946",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
