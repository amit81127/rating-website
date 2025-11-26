import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "How do I register for an event?",
    answer:
      "You can register by clicking on the 'Register' button on the home page or navigating to the Registration page. Fill in your details and submit the form.",
  },
  {
    id: 2,
    question: "Can I participate in multiple events?",
    answer:
      "Yes, you can participate in as many events as you like, provided their schedules do not clash.",
  },
  {
    id: 3,
    question: "How is the rating calculated?",
    answer:
      "Ratings are calculated based on the average score given by judges and verified student votes. The process is completely transparent.",
  },
  {
    id: 4,
    question: "Is there a registration fee?",
    answer:
      "Most college events are free for students. However, some special workshops or flagship events may have a nominal fee.",
  },
  {
    id: 5,
    question: "Who can I contact for support?",
    answer:
      "You can reach out to the student coordinators or use the Contact form on our website for any queries.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase">Common Questions</h6>
          <h2 className="display-5 fw-bold">Frequently Asked Questions</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card border-0 shadow-sm overflow-hidden"
                >
                  <button
                    className="card-header bg-white border-0 p-4 d-flex align-items-center justify-content-between w-100 text-start"
                    onClick={() => toggleFAQ(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <h5 className={`mb-0 fw-bold ${activeIndex === index ? "text-primary" : "text-dark"}`}>
                      {faq.question}
                    </h5>
                    <span className="ms-3">
                      <i
                        className={`bi ${
                          activeIndex === index ? "bi-dash-circle-fill text-primary" : "bi-plus-circle text-muted"
                        } fs-4 transition-all`}
                      ></i>
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="card-body px-4 pb-4 pt-0 text-muted">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
