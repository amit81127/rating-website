import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h6 className="text-primary fw-bold text-uppercase">Get in Touch</h6>
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Have questions or feedback? We'd love to hear from you. Reach out to the AITM Rating System team.
          </p>
        </motion.div>

        <div className="row g-5">
          {/* Contact Info Cards */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              {[
                {
                  icon: "bi-geo-alt-fill",
                  title: "Visit Us",
                  text: "Angadi Institute of Technology and Management, Savagaon Road, Belagavi, Karnataka 590009",
                  color: "bg-primary",
                },
                {
                  icon: "bi-envelope-fill",
                  title: "Email Us",
                  text: "info@aitm.edu.in",
                  color: "bg-success",
                },
                {
                  icon: "bi-telephone-fill",
                  title: "Call Us",
                  text: "+91 831 243 8100",
                  color: "bg-warning",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card border-0 shadow-sm hover-animate"
                >
                  <div className="card-body p-4 d-flex align-items-start gap-3">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 ${item.color}`}
                      style={{ width: "50px", height: "50px" }}
                    >
                      <i className={`bi ${item.icon} fs-4`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{item.title}</h5>
                      <p className="text-muted mb-0 small">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card border-0 shadow-lg"
            >
              <div className="card-body p-5">
                <h3 className="fw-bold mb-4">Send us a Message</h3>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="name@example.com"
                        />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <select className="form-select" id="subject">
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="feedback">Feedback</option>
                        </select>
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="message"
                          style={{ height: "150px" }}
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary btn-lg w-100 py-3 fw-bold shadow-sm"
                        type="submit"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <div className="mt-5 rounded-4 overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.196325867623!2d74.49658731485574!3d15.84634998901867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf66a066666667%3A0x6666666666666666!2sAngadi%20Institute%20of%20Technology%20and%20Management!5e0!3m2!1sen!2sin!4v1625636666666!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="AITM Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
