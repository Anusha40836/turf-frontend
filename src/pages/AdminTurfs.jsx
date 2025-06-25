import { useEffect, useState } from "react";
import API from "../services/api";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

import axios from "axios"; // 👈 Add this if not already imported

function AdminTurfs() {
  const bgImageUrl =
    "https://cdn.pixabay.com/photo/2016/11/21/17/50/lawn-1846813_1280.jpg";

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

  // 🔄 Handle image selection
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

      // 👇 Upload image to Cloudinary if it's a base64 string (new upload)
      if (image && image.startsWith("data:image")) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "my_unsigned_preset"); // change to your actual preset name

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dbzf9izfz/image/upload",
          formData
        );

        imageUrl = cloudRes.data.secure_url;
      }

      if (selectedTurf) {
        // Update turf
        await API.put(`/turfs/${selectedTurf._id}`, {
          name,
          location,
          pricePerHour,
          image: imageUrl,
        });
        setMessage("Turf updated successfully!");
      } else {
        // Add turf
        await API.post("/turfs", {
          name,
          location,
          pricePerHour,
          image: imageUrl,
        });
        setMessage("Turf added successfully!");
      }

      // Reset form
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
        padding: 60,
        color: "Black", // Optional for contrast
        backdropFilter: "brightness(0.7)", // Optional for readability
      }}
    >
      <h2>⚙️ Admin Turf Management</h2>

      <div style={{ marginBottom: 20 }}>
        <h3>{selectedTurf ? "Edit Turf" : "Add New Turf"}</h3>
        <input
          type="text"
          placeholder="Turf Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Price Per Hour"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
        />
        <br />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: 200, marginTop: 10 }}
          />
        )}
        <br />
        <button onClick={handleAddOrUpdateTurf} disabled={loading}>
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
            style={{ marginLeft: 10 }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {message && <p>{message}</p>}

      <h3>Existing Turfs</h3>
      <ol>
        {turfs.map((turf) => (
          <li key={turf._id}>
            <img
              src={turf.image || "https://via.placeholder.com/150"}
              alt={turf.name}
              style={{ width: 200, marginBottom: 8 }}
            />
            <br />
            <strong>{turf.name}</strong> - {turf.location} - ₹
            {turf.pricePerHour}/hr
            <button onClick={() => handleEdit(turf)} style={{ marginLeft: 12 }}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(turf._id)}
              style={{ marginLeft: 8 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default AdminTurfs;
