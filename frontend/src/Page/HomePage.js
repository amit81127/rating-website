import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Announcements from "../components/Announcements";
import EventTimeline from "../components/EventTimeline";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";

const HomePage = () => {
  return (
    <div className="bg-light">
      {/* HERO SECTION */}
      <section
        className="position-relative d-flex align-items-center"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-dark) 100%)",
          overflow: "hidden"
        }}
      >
        {/* Abstract Background Shapes */}
        <div className="position-absolute top-0 end-0 opacity-10">
          <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFD700" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.3,35.2C60.4,47.5,49.9,58.5,37.6,66.3C25.3,74.1,11.2,78.7,-2.3,82.7C-15.8,86.7,-30.3,90.1,-43.3,84.7C-56.3,79.3,-67.8,65.1,-76.3,49.8C-84.8,34.5,-90.3,18.1,-88.9,2.4C-87.5,-13.3,-79.2,-28.3,-68.8,-41.2C-58.4,-54.1,-45.9,-64.9,-32.6,-72.6C-19.3,-80.3,-5.2,-84.9,5.6,-94.6L16.4,-104.3" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="container position-relative z-1 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="d-inline-block px-3 py-1 mb-3 rounded-pill border border-light bg-white bg-opacity-10 backdrop-blur">
                  <span className="text-gold fw-bold small">OFFICIAL AITM PORTAL</span>
                </div>
                <h1 className="display-3 fw-bold mb-4 lh-sm">
                  Excellence in <span className="text-gold">Evaluation</span> & <span className="text-gold">Recognition</span>
                </h1>
                <p className="lead mb-5 opacity-90" style={{ maxWidth: "600px" }}>
                  The centralized platform for managing events, rating projects, and celebrating student achievements at Angadi Institute of Technology and Management.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link
                    to="/participants"
                    className="btn btn-gold-custom btn-lg shadow-lg"
                  >
                    Start Rating
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-outline-light btn-lg"
                  >
                    Student Registration
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Announcements />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-5 bg-white position-relative" style={{ marginTop: "-50px", zIndex: 10 }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              { value: "50+", label: "Active Events", icon: "bi-calendar-check" },
              { value: "1200+", label: "Student Participants", icon: "bi-people" },
              { value: "5000+", label: "Total Ratings", icon: "bi-star" },
              { value: "100%", label: "Transparent", icon: "bi-shield-check" },
            ].map((stat, idx) => (
              <div className="col-md-3 col-6" key={idx}>
                <div className="card h-100 border-0 shadow-sm text-center py-4 hover-animate">
                  <div className="mb-3 text-primary">
                    <i className={`bi ${stat.icon} fs-1`}></i>
                  </div>
                  <h3 className="fw-bold text-dark mb-1">{stat.value}</h3>
                  <p className="text-muted mb-0 small text-uppercase fw-bold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Students" 
                  className="img-fluid rounded-4 shadow-lg"
                />
                <div className="position-absolute bottom-0 end-0 bg-white p-4 rounded-4 shadow-lg m-4 d-none d-md-block" style={{ maxWidth: "200px" }}>
                  <h6 className="fw-bold text-primary mb-2">Trusted by</h6>
                  <div className="d-flex align-items-center gap-2">
                    <span className="display-6 fw-bold text-dark">20+</span>
                    <span className="small text-muted lh-1">Departments & Clubs</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h6 className="text-primary fw-bold text-uppercase mb-3">About The Platform</h6>
              <h2 className="display-5 fw-bold mb-4 text-dark">Empowering Student Talent Through Technology</h2>
              <p className="lead text-muted mb-4">
                RPWS (Rate Page Web System) is designed to streamline the evaluation process for college events. It replaces manual scoring with a secure, digital voting system.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success mt-1 me-3"></i>
                  <span><strong>Real-time Results:</strong> View live leaderboards and instant winner declarations.</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success mt-1 me-3"></i>
                  <span><strong>Secure Authentication:</strong> Only verified students and staff can participate.</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success mt-1 me-3"></i>
                  <span><strong>Comprehensive Analytics:</strong> Detailed reports for event organizers.</span>
                </li>
              </ul>
              <Link to="/about" className="btn btn-outline-primary btn-lg">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT TIMELINE */}
      <EventTimeline />

      {/* GALLERY SECTION */}
      <Gallery />

      {/* FAQ SECTION */}
      <FAQ />

      {/* CALL TO ACTION */}
      <section className="py-5 bg-primary text-white text-center position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient opacity-50"></div>
        <div className="container position-relative z-1 py-5">
          <h2 className="display-4 fw-bold mb-4">Ready to Host an Event?</h2>
          <p className="lead mb-5 opacity-90">
            Join the digital revolution at AITM. Register your event or participate in ongoing activities today.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/contact" className="btn btn-light btn-lg px-5 fw-bold text-primary shadow-lg">
              Contact Admin
            </Link>
            <Link to="/winner" className="btn btn-outline-light btn-lg px-5 fw-bold">
              View Winners
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;