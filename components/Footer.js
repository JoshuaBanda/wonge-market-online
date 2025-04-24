import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>&copy; 2024 Wonge Enterprise. All rights reserved.</p>
          <p>Chipatala Avenue, Blantyre Town, Blantyre, Malawi</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>
            <a href="https://www.facebook.com/yourprofile" target="_self">
              <img src="facebook.png" alt="Facebook" style={iconStyle} />
            </a>
            <a href="https://www.twitter.com/yourprofile" target="_self">
              <img src="twitter-icon.png" alt="Twitter" style={iconStyle} />
            </a>
            <a href="https://www.instagram.com/yourprofile" target="_self">
              <img src="instagram-icon.jpeg" alt="Instagram" style={iconStyle} />
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p style={{ fontFamily: "Allura, cursive" }}>
          Contact us at <a href="https://wa.me/265885249030">WongeEnterprise.com</a>
        </p>
        <p>&copy; 2024 Wonge Enterprise. All rights reserved.</p>
      </div>
    </div>
  );
}

const iconStyle = {
  borderRadius: "4px",
  margin: "0 5px" // Add margin for better spacing between icons
};

export default Footer;
