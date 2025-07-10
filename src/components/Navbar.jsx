import { useNavigate, NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Navbar() {
  const { logout, user, toggleTheme, theme } = useApp();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid" style={{ overflowX: "hidden" }}>
        <NavLink className="navbar-brand fw-bold" to="/">
          Turf Booking Website
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/turfs">
                Turfs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/my-bookings">
                My Bookings
              </NavLink>
            </li>
            {user?.role === "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/turfs">
                  Manage Turfs
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`btn btn-sm ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
            >
              {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>

            {user && (
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
