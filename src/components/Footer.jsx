import { useApp } from "../context/AppContext";

function Footer() {
  const { theme } = useApp();

  return (
    <footer
      className={`text-center py-3 mt-auto ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      <div className="container">
        <p className="mb-1">
          🏟️ Turf Booking Website – Book your game anytime!
        </p>
        <small>
          &copy; {new Date().getFullYear()} @Anusha - All rights reserved.
        </small>
        <br />
        <small>Made with ❤️ by Anusha</small>
      </div>
    </footer>
  );
}

export default Footer;
