import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Turfs() {
  const bgImageUrl =
    "https://images.pexels.com/photos/18404684/pexels-photo-18404684.jpeg";

  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [reviewInputs, setReviewInputs] = useState({});

  const navigate = useNavigate();

  const fetchTurfs = async () => {
    try {
      const res = await API.get(`/turfs?search=${search}`);
      setTurfs(res.data);
    } catch (err) {
      console.error("Failed to load turfs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, [search]);

  const handleReviewSubmit = async (turfId) => {
    const { rating, comment } = reviewInputs[turfId] || {};
    if (!rating || !comment) {
      alert("Please provide both rating and comment");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Optional auth
      await API.post(
        `/turfs/${turfId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Review submitted!");
      fetchTurfs();
      setReviewInputs((prev) => ({
        ...prev,
        [turfId]: { rating: "", comment: "" },
      }));
    } catch (err) {
      console.error("Review submission failed:", err);
      alert("Failed to submit review");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: 24,
        color: "black",
        backdropFilter: "brightness(0.7)",
      }}
    >
      <h2>Available Turfs</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: 400,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      {loading ? (
        <p>Loading turfs...</p>
      ) : turfs.length === 0 ? (
        <p>No turfs found.</p>
      ) : (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {turfs.map((turf) => (
            <div
              key={turf._id}
              style={{
                border: "1px solid #ccc",
                padding: 12,
                width: 300,
                borderRadius: 8,
                backgroundColor: "#ffffffcc",
              }}
            >
              <img
                src={
                  turf.image || "https://via.placeholder.com/300x150?text=Turf"
                }
                alt={turf.name}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
              <h3>{turf.name}</h3>
              <p>📍 Location: {turf.location}</p>
              <p>💰 Price: ₹{turf.pricePerHour}/hr</p>
              <p>⭐ Avg Rating: {turf.averageRating?.toFixed(1) || "N/A"}</p>

              <button
                onClick={() => navigate("/booking", { state: { turf } })}
                style={{ marginBottom: 10 }}
              >
                Book Now
              </button>

              <div>
                <h4>Leave a Review</h4>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <input
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Rating (1-5)"
                    value={reviewInputs[turf._id]?.rating || ""}
                    onChange={(e) =>
                      setReviewInputs((prev) => ({
                        ...prev,
                        [turf._id]: {
                          ...prev[turf._id],
                          rating: e.target.value,
                        },
                      }))
                    }
                  />
                  <textarea
                    rows={2}
                    placeholder="Your comment"
                    value={reviewInputs[turf._id]?.comment || ""}
                    onChange={(e) =>
                      setReviewInputs((prev) => ({
                        ...prev,
                        [turf._id]: {
                          ...prev[turf._id],
                          comment: e.target.value,
                        },
                      }))
                    }
                  />
                  <button onClick={() => handleReviewSubmit(turf._id)}>
                    Submit Review
                  </button>
                </div>
              </div>

              {turf.reviews?.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <h4>Latest Reviews:</h4>
                  {turf.reviews
                    .slice(-3) // get last 3 reviews
                    .reverse() // show newest first
                    .map((r, idx) => (
                      <div
                        key={idx}
                        style={{
                          borderTop: "1px solid #eee",
                          paddingTop: 5,
                          fontSize: 14,
                        }}
                      >
                        <p>
                          <strong>{r.name}</strong> - ⭐ {r.rating}
                        </p>
                        <p>{r.comment}</p>
                      </div>
                    ))}
                  {turf.reviews.length > 3 && (
                    <p style={{ fontSize: 12, marginTop: 5 }}>
                      ...and {turf.reviews.length - 3} more
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Turfs;
