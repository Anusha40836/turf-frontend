import { useState } from "react";
import API from "../services/api";
import { saveToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const bgImageUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/049/108/547/small_2x/close-up-of-green-turf-field-with-blurred-background-photo.jpeg";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", form);
      // Optional: auto-login after register
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      saveToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
        color: "white", // Optional for contrast
        backdropFilter: "brightness(0.7)", // Optional for readability
      }}
    >
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
}

export default Register;
