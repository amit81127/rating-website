import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-5 pb-3 mt-5">
  <div className="container">
    <div className="row">

      {/* About Section */}
      <div className="col-md-4 mb-4">
        <h5 className="fw-bold">RPWS</h5>
        <p>RPWS is a platform for rating and reviewing college events, participants, and winners. Engage, vote, and stay updated with all our activities.</p>
      </div>

      {/* Quick Links */}
      <div className="col-md-2 mb-4">
        <h5 className="fw-bold">Quick Links</h5>
        <ul className="list-unstyled">
          <li><Link className="text-white text-decoration-none" to="/">Home</Link></li>
          <li><Link className="text-white text-decoration-none" to="/participants">Participate</Link></li>
          <li><Link className="text-white text-decoration-none" to="/winner">Winner</Link></li>
          <li><Link className="text-white text-decoration-none" to="/register">Register</Link></li>
          <li><Link className="text-white text-decoration-none" to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Contact</h5>
        <p>Email: <a href="mailto:info@rpws.com" className="text-white text-decoration-none">info@rpws.com</a></p>
        <p>Phone: <a href="tel:+911234567890" className="text-white text-decoration-none">+91 12345 67890</a></p>
        <p>Address: Axis College, India</p>
      </div>

      {/* Social Links */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Follow Us</h5>
        <div className="d-flex gap-3">
          <a href="#" className="text-white fs-4"><i className="bi bi-twitter"></i></a>
          <a href="#" className="text-white fs-4"><i className="bi bi-instagram"></i></a>
          <a href="#" className="text-white fs-4"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-white fs-4"><i className="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div>

    {/* Divider */}
    <hr className="border-light" />

    {/* Footer Bottom */}
    <div className="text-center">
      <p className="mb-0">&copy; {new Date().getFullYear()} RPWS. All rights reserved.</p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
