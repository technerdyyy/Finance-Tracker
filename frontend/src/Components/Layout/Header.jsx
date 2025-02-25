import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { message } from "antd";
import "../../index.css";

const Header = () => {
  const [loginUser, setLoginUser] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigate function

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setLoginUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("❌ Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Remove user from storage
    setLoginUser(null); // ✅ Clear state
    message.success("Logged out successfully");
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand financify" to="/">
            Finance Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {loginUser ? (
                <>
                  <li className="nav-item welcome-text">
                    Welcome, {loginUser.name}
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
