import React from 'react';
import '../App.css'; // Ensure CSS is imported

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content-wrapper">

        {/* --- LEFT COLUMN: ABOUT --- */}
        <div className="about-section">
          <h3 className="about-heading">ABOUT TECHSTORE</h3>
          <p className="about-text">
            The mission of TechStore is to equip technology enthusiasts with the
            latest gadgets and innovations.
          </p>
          <p className="about-text">
            We strive to enable our customers to compete at an international level by providing
            world-class electronics, dependable support, and a seamless shopping experience.
          </p>
          <p className="about-text">
            We are dedicated to achieving excellence in quality and developing a center of trust
            in the digital marketplace.
          </p>
        </div>

        {/* --- RIGHT COLUMN: CONTACT --- */}
        <div className="contact-section">
          <h3 className="about-heading">CONTACT US</h3>

          <div className="contact-item">
            <p className="about-text">
              Sector C/261, Arfa Karim Block<br />
              Main G.T Road, Lahore, Pakistan.
            </p>
          </div>

          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span className="about-text">+92 (53) 2260000</span>
          </div>

          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <span className="about-text">info@techstore.pk</span>
          </div>

          <div className="contact-item">
            <span className="contact-icon">🕒</span>
            <span className="about-text">Monday - Friday 9:00 - 17:00</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;