import React from "react";
import { motion } from "framer-motion";

const announcements = [
  {
    id: 1,
    title: "Annual Tech Fest 2025 Registration Open",
    date: "Nov 25, 2025",
    link: "/register",
  },
  {
    id: 2,
    title: "Hackathon Winners Announced - Check Results",
    date: "Nov 20, 2025",
    link: "/winner",
  },
  {
    id: 3,
    title: "Guest Lecture on AI by Dr. Smith",
    date: "Dec 05, 2025",
    link: "#",
  },
];

const Announcements = () => {
  return (
    <div className="bg-white rounded-3 shadow-sm p-4 h-100 border border-light">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="fw-bold text-primary mb-0">
          <i className="bi bi-megaphone-fill me-2 text-gold"></i>
          Announcements
        </h5>
        <span className="badge bg-primary rounded-pill">New</span>
      </div>
      <div className="announcement-list" style={{ maxHeight: "300px", overflowY: "auto" }}>
        {announcements.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-3 mb-3 rounded bg-light border-start border-4 border-primary position-relative announcement-item"
          >
            <small className="text-muted d-block mb-1">{item.date}</small>
            <h6 className="mb-1 fw-bold text-dark">{item.title}</h6>
            <a href={item.link} className="stretched-link text-decoration-none text-primary small fw-bold">
              Read More &rarr;
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
