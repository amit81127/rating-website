import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";


const About = () => {
  const cardVariant = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
    }),
  };

  const cards = [
    {
      title: "Axis Community",
      text: "A vibrant community fostering technical growth, collaboration, and innovation through workshops, sessions, and tech fests.",
      img: "/Gemini_Generated_Image_8hn4ah8hn4ah8hn4.png", // Replace with actual image
    },
    {
      title: "Sanganak Shila Society",
      text: "The driving force behind Gandhigiri — empowering students with opportunities to explore, learn, and build through technology.",
      img: "/generated-image.png",
    },
    {
      title: "Coding Contests",
      text: "Sharpen your problem-solving skills and compete in coding challenges designed for learners and developers alike.",
      img: "/Gemini_Generated_Image_kkyqrekkyqrekkyq.png",
    },
    {
      title: "Hackathons",
      text: "Collaborate, innovate, and build real-world solutions — turning creative ideas into impactful projects.",
      img: "/Gemini_Generated_Image_r0jeysr0jeysr0je.png",
    },
    {
      title: "Innovation & Projects",
      text: "Hands-on projects, IoT, AI, and Web Development experiences that bridge theory with real-world applications.",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.linkedin.com%2Fpulse%2Fdocumentation-project-innovation-uttam-kumar-tamboli&psig=AOvVaw287zrWA4DJpCTN81myMmM8&ust=1760503695971000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJigtL3xopADFQAAAAAdAAAAABAE",
    },
    {
      title: "Industry Exposure",
      text: "Workshops, guest lectures, and internship opportunities providing valuable insights into professional tech ecosystems.",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alamy.com%2Fthe-double-exposure-of-industry-40-with-oil-and-gas-refinery-background-icons-concept-technology-of-manufacturing-and-oil-refining-industry-image353545179.html&psig=AOvVaw3hxt8tsLhKBpFZ7HAHJyDl&ust=1760503728189000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOjDoc_xopADFQAAAAAdAAAAABAE",
    },
  ];

  return (
    <section className="about-section py-5 bg-light">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container text-center mb-5"
      >
        <h2 className="display-4 text-primary fw-bold mb-4">About Axis College</h2>
        <p className="lead text-secondary mx-auto w-75">
          Welcome to <span className="fw-semibold text-gradient">Gandhigiri Event</span> — a celebration of innovation, creativity, and collaboration.
          Hosted under the <span className="fw-semibold text-gradient">Sanganak Shila Society</span> and powered by the <span className="fw-semibold text-gradient">Axis Community</span>,
          this event unites tech enthusiasts to showcase talent through <span className="text-gradient fw-medium">coding contests</span> and <span className="text-gradient fw-medium">hackathons</span>.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="container">
        <div className="row g-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="col-md-6 col-lg-4"
            >
              <div className="card interactive-card h-100 border-0 shadow-lg rounded-4 overflow-hidden position-relative">
                <div
                  className="card-img-overlay"
                  style={{
                    backgroundImage: `url(${card.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.7)",
                  }}
                ></div>
                <div className="card-body position-relative text-white">
                  <h3 className="card-title mb-3">{card.title}</h3>
                  <p className="card-text">{card.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gandhigiri Info */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="container text-center mt-5"
      >
        <h3 className="display-6 text-primary fw-bold mb-3">Gandhigiri Event</h3>
        <p className="lead text-secondary mx-auto w-75">
          The Gandhigiri Event symbolizes creativity, teamwork, and innovation. It unites students to participate in coding contests, hackathons,
          and tech challenges — celebrating the true spirit of technology and community.
        </p>
      </motion.div>

      {/* Embedded Google Map */}
      <div className="d-flex justify-content-center mt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.432721220281!2d80.45014237487553!3d26.344862584263982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4278f92f3a69%3A0xb7805a7e15877959!2sAxis%20Colleges!5e0!3m2!1sen!2sin!4v1760377562006!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "12px", maxWidth: "900px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Axis College Location"
        ></iframe>
      </div>
    </section>
  );
};

export default About;
