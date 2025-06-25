import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const turf = location.state?.turf;

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState("");

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  if (!turf) return <p>No turf data found</p>;

  // Fetch booked slots
  const fetchBookedSlots = async (selectedDate) => {
    try {
      const res = await API.get(`/bookings/slots/${turf._id}/${selectedDate}`);
      setBookedSlots(res.data); // list of timeSlot strings
    } catch (err) {
      console.error("Failed to fetch booked slots:", err);
    }
  };

  useEffect(() => {
    if (date) fetchBookedSlots(date);
  }, [date]);

  const handleBooking = async () => {
    if (!date || !timeSlot) {
      alert("Please select date and time");
      return;
    }

    try {
      await API.post("/bookings", {
        turfId: turf._id,
        date,
        timeSlot,
      });

      alert("Booking successful!");
      navigate("/my-bookings");
    } catch (err) {
      const msg = err.response?.data?.message || "Booking failed";
      setError(msg);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Book Turf: {turf.name}</h2>
      <p>Location: {turf.location}</p>
      <p>Price: ₹{turf.pricePerHour} /hr</p>

      <div style={{ marginTop: 20 }}>
        <label>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time Slot:
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            disabled={!date}
          >
            <option value="">-- Select Time --</option>
            {timeSlots.map((slot) => (
              <option
                key={slot}
                value={slot}
                disabled={bookedSlots.includes(slot)}
              >
                {slot} {bookedSlots.includes(slot) ? "(Booked)" : ""}
              </option>
            ))}
          </select>
        </label>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleBooking} style={{ marginTop: 12 }}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default Booking;
