import React from "react";
import "animate.css";
import { motion } from "framer-motion";
 // ✅ Make sure logo is in src/assets

const Contact = () => {
  return (
    <div
      className="contact-page"
      style={{
        background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
        minHeight: "100vh",
        padding: "60px 20px",
      }}
    >
      {/* Logo Section */}
      <motion.div
        className="logo-container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <img
          src="axislogo-removebg-preview.png"
          alt="Axis College Logo"
          className="animate__animated animate__fadeInDown axis-logo"
          style={{
            width: "180px",
            height: "auto",
            borderRadius: "50%",
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.5s ease, box-shadow 0.5s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0px 15px 30px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0px 10px 25px rgba(0, 0, 0, 0.2)";
          }}
        />
        <h2
          className="animate__animated animate__fadeInUp"
          style={{
            marginTop: "20px",
            color: "#0c2461",
            fontWeight: "700",
          }}
        >
          AITM Support Team
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#2d3436",
            marginTop: "10px",
          }}
        >
          This Support Page is exclusively for <strong>Axis Institute of Technology & Management</strong>.
        </p>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "40px 30px",
        }}
      >
        <h3 style={{ color: "#192a56", marginBottom: "20px" }}>
          Contact Us
        </h3>
        <form>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label>Message</label>
            <textarea
              rows="4"
              className="form-control"
              placeholder="Write your message"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(45deg, #273c75, #40739e)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
