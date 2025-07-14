import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Import toast

function Home() {
  const bgImageUrl =
    "https://images.pexels.com/photos/139762/pexels-photo-139762.jpeg";

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Show welcome toast only once per session
  useEffect(() => {
    if (user && !sessionStorage.getItem("welcomeShown")) {
      toast.success(`Welcome, ${user.name}! 👋`, {
        position: "top-right",
        autoClose: 3000,
      });
      sessionStorage.setItem("welcomeShown", "true");
    }
  }, [user]);

  return (
    <div
      className="position-relative w-100"
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for darkness */}
      <div
        className="position-absolute top-0 bottom-0 start-0 end-0"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}
      ></div>

      {/* Welcome Message */}
      <div
        className="position-absolute top-0 start-0 p-4 text-white"
        style={{ zIndex: 2 }}
      >
        <h4>Welcome, {user?.name}!</h4>
        <p className="mb-0">📧 {user?.email}</p>
        <p>👤 Role: {user?.role}</p>
      </div>

      {/* Center Action Card */}
      <div
        className="position-absolute top-50 start-50 translate-middle text-center"
        style={{ zIndex: 2 }}
      >
        <div
          className="card bg-dark bg-opacity-50 p-4 rounded"
          style={{ minWidth: "320px", backdropFilter: "blur(6px)" }}
        >
          <h5 className="mb-4 text-white">What would you like to do?</h5>

          <div className="d-flex flex-column gap-2">
            <Link className="btn btn-outline-danger" to="/turfs">
              Browse Turfs
            </Link>
            <Link className="btn btn-outline-info" to="/my-bookings">
              My Bookings
            </Link>
            {user?.role === "admin" && (
              <Link className="btn btn-outline-warning" to="/admin/turfs">
                Manage Turfs
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
