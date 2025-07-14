import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { saveToken } from "../utils/auth";
import { toast } from "react-toastify";

function Register() {
  const bgImageUrl =
    "https://images.pexels.com/photos/1657334/pexels-photo-1657334.jpeg";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", form);
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      saveToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Registered and Logged in successfully!");
      navigate("/");
      // await API.post("/auth/register", form);
      // navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div
      className="vh-100 vw-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay for contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      ></div>

      {/* Register Card */}
      <div
        className={`card p-4 shadow-lg text-white ${
          fadeIn ? "fade-in-card" : ""
        }`}
        style={{
          maxWidth: "420px",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          zIndex: 2,
          opacity: 0,
          animation: fadeIn ? "fadeIn 1s ease forwards" : "none",
        }}
      >
        {/* Logo & Title */}
        <div className="text-center mb-3">
          <img
            src="/logo.png"
            alt="Turf Logo"
            style={{ width: "80px", height: "80px", objectFit: "contain" }}
          />
          <h5 className="mt-2">Create Your Account</h5>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input
              name="name"
              className="form-control bg-light"
              placeholder="Enter name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              name="email"
              type="email"
              className="form-control bg-light"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              name="password"
              type="password"
              className="form-control bg-light"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold glow-button"
          >
            Register
          </button>
        </form>

        <p className="mt-3 text-center text-light">
          Already have an account?{" "}
          <Link to="/login" className="text-info fw-semibold">
            Login here
          </Link>
        </p>
      </div>

      {/* CSS Animations */}
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

export default Register;
