import { useEffect, useState } from "react";
import API from "../services/api";
import axios from "axios";

function AdminTurfs() {
  const bgImageUrl =
    "https://images.pexels.com/photos/1378425/pexels-photo-1378425.jpeg";

  const [turfs, setTurfs] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedTurf, setSelectedTurf] = useState(null);

  const fetchTurfs = async () => {
    try {
      const res = await API.get("/turfs");
      setTurfs(res.data);
    } catch (err) {
      console.error("Error fetching turfs:", err);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddOrUpdateTurf = async () => {
    if (!name || !location || !pricePerHour) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      let imageUrl = image;

      if (image && image.startsWith("data:image")) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "my_unsigned_preset");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dbzf9izfz/image/upload",
          formData
        );
        imageUrl = cloudRes.data.secure_url;
      }

      if (selectedTurf) {
        await API.put(`/turfs/${selectedTurf._id}`, {
          name,
          location,
          pricePerHour,
          image: imageUrl,
        });
        setMessage("Turf updated successfully!");
      } else {
        await API.post("/turfs", {
          name,
          location,
          pricePerHour,
          image: imageUrl,
        });
        setMessage("Turf added successfully!");
      }

      // Reset
      setName("");
      setLocation("");
      setPricePerHour("");
      setImage("");
      setPreview("");
      setSelectedTurf(null);
      fetchTurfs();
    } catch (err) {
      setMessage("Error while saving turf");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (turf) => {
    setSelectedTurf(turf);
    setName(turf.name);
    setLocation(turf.location);
    setPricePerHour(turf.pricePerHour);
    setImage(turf.image);
    setPreview(turf.image);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this turf?");
    if (!confirm) return;

    try {
      await API.delete(`/turfs/${id}`);
      setMessage("Turf deleted");
      fetchTurfs();
    } catch (err) {
      setMessage("Error deleting turf");
      console.error(err);
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
          maxWidth: 1000,
          margin: "auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>⚙️ Admin Turf Management</h2>

        {/* Form */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "20px",
            marginTop: "20px",
            marginBottom: "30px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <h3>{selectedTurf ? "✏️ Edit Turf" : "➕ Add New Turf"}</h3>
          <input
            type="text"
            placeholder="Turf Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Price Per Hour"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            style={inputStyle}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={inputStyle}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: 200, marginTop: 10, borderRadius: 10 }}
            />
          )}
          <br />
          <button
            onClick={handleAddOrUpdateTurf}
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? "Saving..." : selectedTurf ? "Update Turf" : "Add Turf"}
          </button>
          {selectedTurf && (
            <button
              onClick={() => {
                setSelectedTurf(null);
                setName("");
                setLocation("");
                setPricePerHour("");
                setImage("");
                setPreview("");
              }}
              style={{ ...buttonStyle, background: "#888", marginLeft: 10 }}
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Message */}
        {message && (
          <p
            style={{
              backgroundColor: "#222",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            {message}
          </p>
        )}

        {/* Turf List */}
        <h3 style={{ marginBottom: 16 }}>📦 Existing Turfs</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {turfs.map((turf) => (
            <div
              key={turf._id}
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "16px",
                borderRadius: "12px",
                width: 250,
                backdropFilter: "blur(8px)",
                color: "#fff",
              }}
            >
              <img
                src={turf.image || "https://via.placeholder.com/150"}
                alt={turf.name}
                style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
              />
              <strong>{turf.name}</strong>
              <p>📍 {turf.location}</p>
              <p>💸 ₹{turf.pricePerHour}/hr</p>
              <div style={{ marginTop: 10 }}>
                <button onClick={() => handleEdit(turf)} style={buttonStyle}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(turf._id)}
                  style={{
                    ...buttonStyle,
                    background: "#e63946",
                    marginLeft: 8,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable input + button styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#1abc9c",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

export default AdminTurfs;
