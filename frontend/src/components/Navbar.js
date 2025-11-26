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
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        {/* ✅ Brand Section */}
        <Link
          className="navbar-brand d-flex align-items-center gap-3"
          to="/"
          style={{ textDecoration: "none" }}
        >
          <img
            src="axislogo-removebg-preview.png"
            alt="AITM Logo"
            className="aitm-logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "contain",
              background: "white",
              padding: "2px",
              border: "2px solid var(--accent-gold)"
            }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold fs-5 text-white" style={{ letterSpacing: "1px" }}>AITM</span>
            <span className="fs-6 text-gold" style={{ fontSize: "0.8rem", fontWeight: "500" }}>Rating System</span>
          </div>
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
          <ul className="navbar-nav ms-auto align-items-center gap-3">
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
              <li className="nav-item">
                <SignInButton mode="modal" redirectUrl="/">
                  <button className="btn btn-outline-light btn-sm px-3">Login</button>
                </SignInButton>
              </li>
              <li className="nav-item">
                <SignUpButton mode="modal" redirectUrl="/">
                  <button className="btn btn-gold-custom btn-sm px-3">Sign Up</button>
                </SignUpButton>
              </li>
            </SignedOut>

            {/* ✅ Clerk Logged-In User */}
            <SignedIn>
              <li className="nav-item">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: {
                        width: "35px",
                        height: "35px",
                        border: "2px solid var(--accent-gold)"
                      },
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </li>
            </SignedIn>

            {/* ✅ Admin Login (only visible if Clerk user NOT signed in) */}
            {!isSignedIn && !token && (
              <li className="nav-item">
                <Link className="btn btn-outline-light btn-sm px-3" to="/login">
                  Admin
                </Link>
              </li>
            )}

            {/* ✅ Admin Dropdown (if admin is logged in) */}
            {token && !isSignedIn && (
              <li className="nav-item dropdown" ref={dropdownRef}>
                <button
                  className="btn btn-gold-custom btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "35px",
                    height: "35px",
                    fontWeight: "bold",
                  }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  A
                </button>

                {dropdownOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show mt-2 shadow border-0"
                    style={{
                      borderRadius: "8px",
                      position: "absolute",
                      right: 0,
                      minWidth: "150px"
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
                      <hr className="dropdown-divider" />
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
