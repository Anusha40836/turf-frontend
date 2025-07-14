import { useApp } from "../context/AppContext";

function Footer() {
  const { theme } = useApp();

  return (
    <footer
      className={`text-center py-3 ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
      }`}
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: theme === "dark" ? "#343a40" : "#f8f9fa",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="container">
        <p className="mb-1">
          🏟️ Turf Booking Website – Book your game anytime!
        </p>
        <small>
          &copy; {new Date().getFullYear()} @Anusha – All rights reserved.
        </small>
        <br />
        <small>Made with ❤️ by Anusha</small>
      </div>
    </footer>
  );
}

export default Footer;
