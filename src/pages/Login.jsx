import { useState } from "react";
import API from "../services/api";
import { saveToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const bgImageUrl =
    "https://images.pexels.com/photos/6572984/pexels-photo-6572984.jpeg";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      saveToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅
      navigate("/");
      saveToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Dont't have an account <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
