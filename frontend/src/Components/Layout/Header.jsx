import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import "../../index.css";

const Header = () => {
  const [loginUser, setLoginUser] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for menu toggle
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setLoginUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from storage
    setLoginUser(null); // Clear state
    message.success("Logged out successfully");
    navigate("/login"); // Redirect to login page
    setIsNavbarOpen(false); // Close navbar after logout
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand financify" to="/">
          Finance Tracker
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)} // Toggle state
          aria-controls="navbarTogglerDemo02"
          aria-expanded={isNavbarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Menu */}
        <div
          className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
          id="navbarTogglerDemo02"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {loginUser ? (
              <>
                {/* Welcome Text (Only Visible on Large Screens) */}
                <li className="nav-item welcome-text d-none d-lg-block">
                  Welcome, {loginUser.name}
                </li>

                {/* Logout Button for Large Screens */}
                <li className="nav-item d-none d-lg-block">
                  <button
                    className="btn btn-outline-danger logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

                {/* Logout Button for Small Screens (Inside Menu) */}
                <li className="nav-item d-lg-none">
                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={() => setIsNavbarOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
