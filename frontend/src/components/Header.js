import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if click outside
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
    <header style={styles.header}>
      <div style={styles.logoContainer} onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span style={styles.logoText}>MyLogo</span>
      </div>

      {!token && (
        <nav>
          <Link to="/signup" style={styles.link}>Signup</Link>
          <Link to="/login" style={styles.link}>Login</Link>
        </nav>
      )}

      {token && dropdownOpen && (
        <div ref={dropdownRef} style={styles.dropdown}>
          <button style={styles.dropdownItem} onClick={() => navigate("/admin")}>Admin Panel</button>
          <button style={styles.dropdownItem} onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#222",
    color: "#fff",
    alignItems: "center",
    position: "relative",
  },
  logoContainer: {
    cursor: "pointer",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  link: {
    color: "#fff",
    marginLeft: "15px",
    textDecoration: "none",
  },
  dropdown: {
    position: "absolute",
    top: "50px",
    right: "20px",
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    borderRadius: "5px",
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    padding: "10px 20px",
    border: "none",
    background: "none",
    textAlign: "left",
    cursor: "pointer",
  },
};

export default Header;
