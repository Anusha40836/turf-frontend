import Navbar from "./Navbar";
import Footer from "./Footer";
import { useApp } from "../context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  const { theme } = useApp();

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${
        theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
      }`}
    >
      <Navbar />
      <main className="flex-grow-1 container py-4">{children}</main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default Layout;
