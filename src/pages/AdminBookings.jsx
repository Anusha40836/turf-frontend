import { useEffect, useState } from "react";
import API from "../services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllBookings = async () => {
    try {
      const res = await API.get("/bookings/admin");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load all bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  if (loading) return <p>Loading all bookings...</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>📋 All Bookings (Admin View)</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id} style={{ marginBottom: 16 }}>
            <strong>{booking.turf?.name}</strong> - {booking.turf?.location}
            <br />
            🗓 {booking.date} | 🕒 {booking.timeSlot}
            <br />
            👤 User: {booking.user?.name || "N/A"} | 📧 {booking.user?.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminBookings;
