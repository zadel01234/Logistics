import React from 'react'
import { Link } from "react-router-dom";
import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h3>QuickShip</h3>
            <p>
              Reliable logistics solutions for businesses and individuals
              worldwide.
            </p>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/tracking">Tracking</Link></li>
              <li><Link to="/locations">Pickup</Link></li>
              <li><Link to="/shipping">Delivery Options</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/support">Contact Us</Link></li>
              <li><Link to="/support">Help Center</Link></li>
              <li><Link to="Shipping">Shipping Rates</Link></li>
              <li><Link to="/support">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <Link to="#"><FontAwesomeIcon icon={faFacebook} /></Link>
              <Link to="#"><FontAwesomeIcon icon={faTwitter} /></Link>
              <Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link>
              <Link to="#"><FontAwesomeIcon icon={faLinkedin} /></Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 QuickShip Logistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
