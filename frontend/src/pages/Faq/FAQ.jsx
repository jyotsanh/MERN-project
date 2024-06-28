import React, { useState } from 'react';
import './faq.css';

const faqData = [
  {
    question: "What is Eyemate?",
    answer: "Eyemate is an innovative eyewear solution providing a range of glasses and lenses."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment through our website by navigating to the Book Appointment page."
  },
  {
    question: "What types of eyewear do you offer?",
    answer: "We offer a variety of eyewear including sunglasses, eyeglasses, and contact lenses."
  },
  {
    question: "How can I contact customer service?",
    answer: "You can contact our customer service through the Contact Us page on our website."
  },
  {
    question: "Do you offer prescription lenses?",
    answer: "Yes, we offer prescription lenses for both eyeglasses and contact lenses."
  },
  {
    question: "What are your operating hours?",
    answer: "Our operating hours are Monday to Friday from 9 AM to 6 PM."
  }
];

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <ul className="faq-list">
        {faqData.map((item, index) => (
          <li key={index} className="faq-item">
            <button className="faq-question" onClick={() => handleClick(index)}>
              {item.question}
            </button>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Faq;
