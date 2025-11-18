import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="bg-primary text-white py-5 d-flex align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0" data-bs-toggle="fade">
              <p className="text-uppercase mb-3 opacity-75">
                Welcome to <strong>RPWS</strong>
              </p>
              <h1 className="display-3 fw-bold mb-4 lh-sm">
                Rate and Review College Events Instantly
              </h1>
              <p className="lead fs-5 mb-5">
                Participate, vote, and celebrate with real-time results — all in
                one smart, secure platform built for colleges.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link
                  to="/winner"
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill shadow-lg"
                >
                  View Winners
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill shadow-lg"
                >
                  Register
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="position-relative">
                {/* Interactive Logo Card */}
                <div 
                  className="card border-0 shadow-lg interactive-logo-card"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    transition: "all 0.4s ease",
                    transform: "translateY(0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div className="card-body p-4">
                    {/* Logo Container with Rotation Effect */}
                    <div 
                      className="text-center mb-4 position-relative"
                      style={{
                        transition: "transform 0.6s ease",
                      }}
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector('.logo-image');
                        if (img) img.style.transform = "rotate(360deg) scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector('.logo-image');
                        if (img) img.style.transform = "rotate(0deg) scale(1)";
                      }}
                    >
                      <div 
                        className="d-inline-block p-4 rounded-circle position-relative"
                        style={{
                          background: "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                        }}
                      >
                        <img
                          src="axislogo-removebg-preview.png"
                          alt="AITM Logo"
                          className="logo-image"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                            transition: "transform 0.6s ease",
                            filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.1))",
                          }}
                        />
                        {/* Animated Ring */}
                        <div
                          className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                          style={{
                            border: "3px solid rgba(255,255,255,0.3)",
                            animation: "pulse 2s infinite",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="card-content text-center text-white">
                      <h5 className="card-title fw-bold fs-4 mb-3">Gandhigiri Event</h5>
                      <p className="card-text mb-0 text-dark">
                        Participate in coding contests and hackathons, showcase your
                        talent, and see live results instantly!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Floating Elements */}
                <div
                  className="position-absolute rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "rgba(255,255,255,0.1)",
                    top: "-20px",
                    right: "-20px",
                    filter: "blur(40px)",
                    animation: "float 3s ease-in-out infinite",
                  }}
                ></div>
                <div
                  className="position-absolute rounded-circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "rgba(255,255,255,0.1)",
                    bottom: "-20px",
                    left: "-20px",
                    filter: "blur(40px)",
                    animation: "float 3s ease-in-out infinite 1s",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.5;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-5 bg-white">
        <div className="container text-center py-5">
          <h2
            className="display-4 fw-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About RPWS
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "800px" }}>
            RPWS (Rate Page Web System) is your one-stop platform to rate,
            review, and celebrate college talent. Built with modern technology,
            it ensures transparency, engagement, and fairness in every event.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        }}
      >
        <div className="container text-center">
          <div className="row g-4">
            {[
              {
                icon: "bi-hand-thumbs-up",
                value: "5000+",
                label: "Total Votes",
              },
              { icon: "bi-people", value: "250+", label: "Participants" },
              { icon: "bi-calendar-event", value: "50+", label: "Events" },
              { icon: "bi-shield-check", value: "100%", label: "Secure" },
            ].map((stat, idx) => (
              <div className="col-md-3 col-6" key={idx}>
                <div className="stat-card">
                  <i className={`bi ${stat.icon} display-3 mb-3`}></i>
                  <h2 className="fw-bold">{stat.value}</h2>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-5 bg-light">
        <div className="container text-center py-5">
          <h2 className="display-5 fw-bold mb-3 text-gradient">
            Why Choose RPWS?
          </h2>
          <p className="lead text-muted mb-5">
            Everything you need for a seamless event experience
          </p>
          <div className="row g-4">
            {[
              {
                icon: "bi-lightning-charge text-primary",
                title: "Instant Voting",
                desc: "Vote quickly and easily with our clean interface.",
              },
              {
                icon: "bi-shield-lock text-success",
                title: "Secure & Verified",
                desc: "Every vote is verified — ensuring fairness for all.",
              },
              {
                icon: "bi-bar-chart text-warning",
                title: "Live Analytics",
                desc: "See who's leading with real-time vote data.",
              },
              {
                icon: "bi-download text-danger",
                title: "Export Reports",
                desc: "Download event results as PDFs instantly.",
              },
            ].map((feature, idx) => (
              <div className="col-md-3" key={idx}>
                <div className="feature-card h-100">
                  <i className={`bi ${feature.icon} display-4 mb-3`}></i>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        className="py-5 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        }}
      >
        <div className="container py-5">
          <h2 className="display-4 fw-bold mb-4">Ready to Join the Fun?</h2>
          <p className="lead mb-5">
            Be part of your college's most engaging and transparent rating
            system.
          </p>
          <Link
            to="/register"
            className="btn btn-light btn-lg rounded-pill px-5 py-3 shadow-lg me-3"
          >
            <i className="bi bi-person-plus me-2"></i> Register Now
          </Link>
          <Link
            to="/participants"
            className="btn btn-outline-light btn-lg rounded-pill px-5 py-3"
          >
            <i className="bi bi-hand-thumbs-up me-2"></i> Vote Now
          </Link>
        </div>
      </section>

      {/* SUBSCRIBE SECTION */}
      <section className="py-5 bg-light text-center">
        <div className="container py-5">
          <i className="bi bi-envelope-paper-heart display-1 text-primary mb-4"></i>
          <h3 className="fw-bold mb-3">Stay Updated with RPWS</h3>
          <p className="lead text-muted mb-4">
            Subscribe to get event notifications and winner announcements!
          </p>
          <div
            className="input-group input-group-lg shadow-lg mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <input
              type="email"
              className="form-control py-3"
              placeholder="Enter your email"
            />
            <button className="btn btn-primary px-5" type="button">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* SCROLL TO TOP */}
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg"
        style={{ width: "60px", height: "60px" }}
      >
        <i className="bi bi-arrow-up text-white fs-3"></i>
      </button>
    </div>
  );
};

export default HomePage;