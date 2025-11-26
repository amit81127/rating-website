import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-custom mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img 
                src="axislogo-removebg-preview.png" 
                alt="AITM Logo" 
                style={{ width: "40px", height: "40px", background: "white", borderRadius: "50%", padding: "2px" }} 
              />
              <h5 className="fw-bold mb-0 text-white">AITM Rating System</h5>
            </div>
            <p className="text-white-50 small">
              The official platform for rating and reviewing projects, events, and participants at Angadi Institute of Technology and Management. Fostering excellence through transparent evaluation.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white social-icon-hover"><FaFacebookF /></a>
              <a href="#" className="text-white social-icon-hover"><FaTwitter /></a>
              <a href="#" className="text-white social-icon-hover"><FaInstagram /></a>
              <a href="#" className="text-white social-icon-hover"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-gold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link className="text-white-50 text-decoration-none hover-white" to="/">Home</Link></li>
              <li className="mb-2"><Link className="text-white-50 text-decoration-none hover-white" to="/about">About Us</Link></li>
              <li className="mb-2"><Link className="text-white-50 text-decoration-none hover-white" to="/participants">Participants</Link></li>
              <li className="mb-2"><Link className="text-white-50 text-decoration-none hover-white" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-gold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link className="text-white-50 text-decoration-none hover-white" to="/login">Admin Login</Link></li>
              <li className="mb-2"><Link className="text-white-50 text-decoration-none hover-white" to="/register">Student Registration</Link></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-white">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold text-gold mb-3">Contact Us</h6>
            <ul className="list-unstyled text-white-50">
              <li className="mb-3 d-flex gap-2">
                <FaMapMarkerAlt className="mt-1 text-gold" />
                <span>Angadi Institute of Technology and Management,<br />Savagaon Road, Belagavi, Karnataka 590009</span>
              </li>
              <li className="mb-3 d-flex gap-2">
                <FaPhoneAlt className="mt-1 text-gold" />
                <a href="tel:+911234567890" className="text-white-50 text-decoration-none hover-white">+91 831 243 8100</a>
              </li>
              <li className="mb-3 d-flex gap-2">
                <FaEnvelope className="mt-1 text-gold" />
                <a href="mailto:info@aitm.edu.in" className="text-white-50 text-decoration-none hover-white">info@aitm.edu.in</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-white-50 small">&copy; {new Date().getFullYear()} AITM Rating System. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-white-50 small">Designed & Developed by RPWS Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
