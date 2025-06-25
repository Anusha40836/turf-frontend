import { useNavigate } from "react-router-dom";

function TurfCard({ turf }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/booking", { state: { turf } });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 12,
        borderRadius: 8,
        width: 300,
      }}
    >
      <img
        src={turf.image}
        alt={turf.name}
        style={{ width: "100%", height: 150, objectFit: "cover" }}
      />
      <h3>{turf.name}</h3>
      <p>Location: {turf.location}</p>
      <p>Price: ₹{turf.price} /hr</p>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}

export default TurfCard;
