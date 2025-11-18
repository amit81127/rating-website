import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        {/* ✅ Brand Section */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-3"
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src="axislogo-removebg-preview.png"
            alt="AITM Logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              background: "linear-gradient(135deg, #ffffff, #dfe9f3)",
              boxShadow:
                "0 4px 10px rgba(0, 0, 0, 0.25), 0 0 15px rgba(37, 117, 252, 0.3)",
              transition:
                "transform 0.4s ease, box-shadow 0.4s ease, filter 0.4s ease",
              border: "3px solid rgba(255, 255, 255, 0.7)",
              padding: "3px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
            }}
          />
          <span className="fw-bold fs-4 text-white">RPWS</span>
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Common Pages */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            {/* Shown only after Clerk login */}
            <SignedIn>
              <li className="nav-item">
                <Link className="nav-link" to="/participants">
                  Participants
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </SignedIn>

            {/* ✅ Clerk Login/Signup Buttons (redirect to Home after login/signup) */}
            <SignedOut>
              <li className="nav-item ms-2">
                <SignInButton mode="modal" redirectUrl="/">
                  <button className="btn btn-outline-light">Login</button>
                </SignInButton>
              </li>
              <li className="nav-item ms-2">
                <SignUpButton mode="modal" redirectUrl="/">
                  <button className="btn btn-light text-primary">Sign Up</button>
                </SignUpButton>
              </li>
            </SignedOut>

            {/* ✅ Clerk Logged-In User */}
            <SignedIn>
              <li className="nav-item ms-3">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: {
                        width: "40px",
                        height: "40px",
                      },
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </li>
            </SignedIn>

            {/* ✅ Admin Login (only visible if Clerk user NOT signed in) */}
            {!isSignedIn && !token && (
              <li className="nav-item ms-3">
                <Link className="btn btn-outline-light" to="/login">
                  Admin Login
                </Link>
              </li>
            )}

            {/* ✅ Admin Dropdown (if admin is logged in) */}
            {token && !isSignedIn && (
              <li className="nav-item dropdown ms-3" ref={dropdownRef}>
                <button
                  className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    fontWeight: "bold",
                    transition: "0.3s",
                  }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  A
                </button>

                {dropdownOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show mt-2 shadow"
                    style={{
                      borderRadius: "8px",
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          navigate("/admin");
                          setDropdownOpen(false);
                        }}
                      >
                        Admin Panel
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
