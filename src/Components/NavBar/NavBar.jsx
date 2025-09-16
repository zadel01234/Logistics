// import React from 'react'
// import { Link } from 'react-router';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faShippingFast} from "@fortawesome/free-solid-svg-icons";
// import "./NavBar.css"

// const NavBar = () => {
//   return (
//     <div>
//         {/* Header/Navigation */}
//         <header>
//             <nav className="navbar">
//                 <div className="nav-container">
//                 <div className="nav-logo">
//                     <h2>
//                     <FontAwesomeIcon icon={faShippingFast} style={{marginRight: "0.5rem", color: "#ff6600"}} /> QuickShip
//                     </h2>
//                 </div>
//                 <ul className="nav-menu">
//                     <li className="nav-item">
//                     <Link to="/tracking" className="nav-link">Tracking</Link>
//                     </li>
//                     <li className="nav-item">
//                     <Link to="/shipping" className="nav-link">Shipping</Link>
//                     </li>
//                     <li className="nav-item">
//                     <Link to="/locations" className="nav-link">Locations</Link>
//                     </li>
//                     <li className="nav-item">
//                     <Link to="/support" className="nav-link">Support</Link>
//                     </li>
//                     <li className="nav-item">
//                     <Link to="/login" className="nav-link">Sign In</Link>
//                     </li>
//                 </ul>
//                 <div className="hamburger">
//                     <span className="bar"></span>
//                     <span className="bar"></span>
//                     <span className="bar"></span>
//                 </div>
//                 </div>
//             </nav>
//         </header>
//     </div>
//   )
// }

// export default NavBar


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  // Update active link when route changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <h2>
            <FontAwesomeIcon
              icon={faShippingFast}
              style={{ marginRight: "0.5rem", color: "#ff6600" }}
            />{" "}
            QuickShip
          </h2>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link
              to="/tracking"
              className={`nav-link ${activeLink === "/tracking" ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              Tracking
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/shipping"
              className={`nav-link ${activeLink === "/shipping" ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              Shipping
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/locations"
              className={`nav-link ${activeLink === "/locations" ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              Locations
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/support"
              className={`nav-link ${activeLink === "/support" ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              Support
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className={`nav-link ${activeLink === "/login" ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              Sign In
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          aria-label="Toggle navigation"
          onClick={toggleMobileMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      ></div>
    </header>
  );
};

export default NavBar;
