import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  // const bgImageUrl =
  //   "https://images.pexels.com/photos/12343288/pexels-photo-12343288.jpeg"; // Turf

  const [theme, setTheme] = useState("light");
  // Set theme class to <body> on change
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme); // save user preference
  }, [theme]);

  // On app load, restore saved theme if available
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // const handleGoToTurfs = () => {
  //   navigate("/turfs");
  // };
  return (
    <div
    // style={{
    //   backgroundImage: `url(${bgImageUrl})`,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   minHeight: "100vh",
    //   padding: 24,
    //   color: "white", // Optional for contrast
    //   backdropFilter: "brightness(0.7)", // Optional for readability
    // }}
    >
      <button onClick={handleLogout}>Logout</button>
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "6px 12px",
          borderRadius: "5px",
          border: "none",
          background: theme === "light" ? "#222" : "#ddd",
          color: theme === "light" ? "#fff" : "#000",
          cursor: "pointer",
        }}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <div>
        <h1>Welcome to Turf Booking Website</h1>
        <h2>Welcome, {user?.name}!</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        {/* <button onClick={handleGoToTurfs}>Browse Turfs</button> */}
        <Link
          to="/turfs"
          style={{
            color: "#1E90FF",
            marginRight: "16px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Browse Turfs
        </Link>
        <Link
          to="/my-bookings"
          style={{
            color: "#1E90FF",
            textDecoration: "none",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          My Bookings
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/admin/turfs"
            style={{
              color: "#1E90FF",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Manage Turfs
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
