import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div>
      <footer className="foot">
        <div className="foot-search-container">
          <input type="text" className="foot-search-input" placeholder="Type your message here..." />
          <button className="foot-send-button">Send</button>
        </div>

        <div className="foot-content">
          <div className="foot-left">
            <p>
              <span className="orange-text">Eye</span> <span className="blue-text">Mate</span>
            </p>
            <p>
              Eyemate offers a premium eye care experience, focusing on personalized care and the latest in technology
            </p>
          </div>

          <div className="foot-middle">
            <p>Shop</p>
            <ul>
              <li><a href="/sunglasses">Sunglasses</a></li>
              <li><a href="/contactslens">Lens</a></li>
              <li><a href="/">Prescription Frames</a></li>
              <li><a href="/">Computer Lens</a></li>
            </ul>
          </div>

          <div className="foot-right">
            <p>About Us</p>
            <ul>
              <li><a href="/">Store Details</a></li>
              <li><a href="/book">Book Appointment</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/">Our Services</a></li>
            </ul>
          </div>
        </div>

        <div className="foot-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>

        <div className="foot-copy">
          <p>&copy; 2024 EYEMATE OPTICAL INC. & Exopy ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
