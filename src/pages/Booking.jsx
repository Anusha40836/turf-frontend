import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const turf = location.state?.turf;

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const backgroundImage =
    "https://images.pexels.com/photos/2021162/pexels-photo-2021162.jpeg"; // Turf background

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

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  useEffect(() => {
    if (date && turf?._id) fetchBookedSlots(date);
  }, [date]);

  const fetchBookedSlots = async (selectedDate) => {
    try {
      const res = await API.get(`/bookings/slots/${turf._id}/${selectedDate}`);
      setBookedSlots(res.data);
    } catch (err) {
      console.error("Failed to fetch booked slots:", err);
    }
  };

  const handleBooking = async () => {
    if (!date || !timeSlot) {
      toast.warning("Please select both date and time slot");
      return;
    }

    try {
      await API.post("/bookings", {
        turfId: turf._id,
        date,
        timeSlot,
      });

      toast.success("Booking successful!");
      navigate("/my-bookings");
    } catch (err) {
      const msg = err.response?.data?.message || "Booking failed";
      toast.error(msg);
    }
  };

  if (!turf) return <p>No turf data found</p>;

  return (
    <div
      className="vh-100 vw-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
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

      {/* Booking Card */}
      <div
        className={`card p-4 text-white shadow-lg ${
          fadeIn ? "fade-in-card" : ""
        }`}
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(14px)",
          borderRadius: "20px",
          zIndex: 2,
          opacity: 0,
          animation: fadeIn ? "fadeIn 1s ease forwards" : "none",
        }}
      >
        <h4 className="text-center mb-3">Book Turf</h4>
        <p>
          <strong>Name:</strong> {turf.name}
        </p>
        <p>
          <strong>Location:</strong> {turf.location}
        </p>
        <p>
          <strong>Price:</strong> ₹{turf.pricePerHour} /hr
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            className="form-control bg-light"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Time Slot</label>
          <select
            className="form-select bg-light"
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
        </div>

        <button
          className="btn btn-success w-100 fw-bold glow-button"
          onClick={handleBooking}
        >
          Confirm Booking
        </button>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in-card {
            animation: fadeIn 1s ease-out forwards;
          }

          .glow-button {
            box-shadow: 0 0 12px #28a745;
            transition: all 0.3s ease-in-out;
          }

          .glow-button:hover {
            background-color: #218838;
            box-shadow: 0 0 20px #28a745, 0 0 8px #28a745;
          }
        `}
      </style>
    </div>
  );
}

export default Booking;
