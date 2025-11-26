import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    title: "Project Submission Deadline",
    date: "Nov 30, 2025",
    description: "Last day to submit your final year projects for evaluation.",
    icon: "bi-file-earmark-code",
    color: "bg-danger",
  },
  {
    id: 2,
    title: "Internal Review 1",
    date: "Dec 10, 2025",
    description: "First round of internal reviews by department HODs.",
    icon: "bi-people",
    color: "bg-warning",
  },
  {
    id: 3,
    title: "Tech Fest 'Innovate 2025'",
    date: "Jan 15, 2026",
    description: "Annual technical festival showcasing student innovations.",
    icon: "bi-trophy",
    color: "bg-success",
  },
  {
    id: 4,
    title: "Final Exhibition",
    date: "Feb 20, 2026",
    description: "Grand exhibition of all top-rated projects.",
    icon: "bi-star",
    color: "bg-primary",
  },
];

const EventTimeline = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase">Schedule</h6>
          <h2 className="display-5 fw-bold">Upcoming Events</h2>
        </div>

        <div className="position-relative" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Vertical Line */}
          <div
            className="position-absolute top-0 bottom-0 start-50 bg-light"
            style={{ width: "4px", transform: "translateX(-50%)" }}
          ></div>

          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`row align-items-center mb-5 ${
                index % 2 === 0 ? "" : "flex-row-reverse"
              }`}
            >
              {/* Date/Time Side */}
              <div className={`col-md-5 text-center ${index % 2 === 0 ? "text-md-end" : "text-md-start"}`}>
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-bold">
                  {event.date}
                </span>
              </div>

              {/* Icon Center */}
              <div className="col-md-2 text-center position-relative">
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center text-white shadow-lg mx-auto ${event.color}`}
                  style={{ width: "60px", height: "60px", zIndex: 2, position: "relative" }}
                >
                  <i className={`bi ${event.icon} fs-4`}></i>
                </div>
              </div>

              {/* Content Side */}
              <div className="col-md-5">
                <div className="card border-0 shadow-sm hover-animate">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-2">{event.title}</h5>
                    <p className="text-muted mb-0 small">{event.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventTimeline;
