import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Turfs() {
  const bgImageUrl =
    "https://images.pexels.com/photos/32896990/pexels-photo-32896990.jpeg";

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
      toast.warning("Please provide both rating and comment");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API.post(
        `/turfs/${turfId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review submitted!");
      fetchTurfs();
      setReviewInputs((prev) => ({
        ...prev,
        [turfId]: { rating: "", comment: "" },
      }));
    } catch (err) {
      console.error("Review submission failed:", err);
      toast.error("Failed to submit review");
    }
  };

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
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          🏟️ Available Turfs
        </h2>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 16px",
              borderRadius: "30px",
              width: "100%",
              maxWidth: "500px",
              border: "none",
              outline: "none",
              boxShadow: "0 0 10px rgba(255,255,255,0.2)",
            }}
          />
        </div>

        {/* Turf Cards */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading turfs...</p>
        ) : turfs.length === 0 ? (
          <p style={{ textAlign: "center" }}>No turfs found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {turfs.map((turf) => (
              <div
                key={turf._id}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  borderRadius: "15px",
                  backdropFilter: "blur(12px)",
                  padding: "20px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  animation: "fadeIn 0.7s ease forwards",
                }}
              >
                <img
                  src={
                    turf.image ||
                    "https://via.placeholder.com/300x150?text=Turf"
                  }
                  alt={turf.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "10px",
                  }}
                />
                <h4>{turf.name}</h4>
                <p>📍 {turf.location}</p>
                <p>💰 ₹{turf.pricePerHour}/hr</p>
                <p>⭐ {turf.averageRating?.toFixed(1) || "N/A"}</p>

                <button
                  onClick={() => navigate("/booking", { state: { turf } })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    border: "none",
                    background: "#1E90FF",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Book Now
                </button>

                {/* Review Form */}
                <div>
                  <h5 style={{ marginTop: "10px" }}>Leave a Review</h5>
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
                    style={{
                      width: "100%",
                      padding: "6px",
                      marginBottom: "6px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
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
                    style={{
                      width: "100%",
                      padding: "6px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      resize: "none",
                    }}
                  />
                  <button
                    onClick={() => handleReviewSubmit(turf._id)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginTop: "6px",
                      borderRadius: "5px",
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Submit Review
                  </button>
                </div>

                {/* Reviews */}
                {turf.reviews?.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <h5>Latest Reviews:</h5>
                    {turf.reviews
                      .slice(-3)
                      .reverse()
                      .map((r, idx) => (
                        <div
                          key={idx}
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.2)",
                            paddingTop: "6px",
                            fontSize: "14px",
                          }}
                        >
                          <p>
                            <strong>{r.name}</strong> - ⭐ {r.rating}
                          </p>
                          <p>{r.comment}</p>
                        </div>
                      ))}
                    {turf.reviews.length > 3 && (
                      <p style={{ fontSize: 12, opacity: 0.8 }}>
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

      {/* Animations */}
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

export default Turfs;
