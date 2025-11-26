import React from "react";
import { motion } from "framer-motion";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Annual Tech Fest 2024",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Hackathon Winners",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Guest Lecture Series",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Project Exhibition",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Campus Life",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Graduation Day",
  },
];

const Gallery = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase">Memories</h6>
          <h2 className="display-5 fw-bold">Event Gallery</h2>
        </div>

        <div className="row g-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="col-lg-4 col-md-6"
            >
              <div className="position-relative overflow-hidden rounded-4 shadow-sm group">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="img-fluid w-100"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-3 text-white"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  }}
                >
                  <h5 className="fw-bold mb-0">{photo.caption}</h5>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
