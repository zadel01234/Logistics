import React, { useState } from "react";
import "./Index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faTruck,
  faGlobe,
  faBox,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  // --- State for Calculator ---
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [packageType, setPackageType] = useState("envelope");
  const [rate, setRate] = useState(null);

  // --- State for Tracking ---
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);

  // --- Shipping Calculator Logic ---
  const calculateRate = () => {
    if (!origin || !destination || !weight) {
      setRate("Please fill in all fields.");
      return;
    }

    let baseRate = 5;
    let weightCost = parseFloat(weight) * 2;
    let typeMultiplier =
      packageType === "envelope"
        ? 1
        : packageType === "small"
        ? 1.3
        : packageType === "medium"
        ? 1.5
        : 2;

    let total = baseRate + weightCost * typeMultiplier;
    setRate(`$${total.toFixed(2)}`);
  };

  // --- Tracking Simulation ---
  const handleTracking = () => {
    if (!trackingNumber) {
      alert("Enter a tracking number");
      return;
    }

    // Fake tracking data
    const statuses = [
      "Label Created",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    setTrackingData({
      number: trackingNumber,
      status: randomStatus,
      location: "Lagos, NG",
      delivery: "Sep 12, 2025",
    });
  };

  return (
    <>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Worldwide Shipping Made Simple</h1>
          <p>Fast, reliable delivery to over 220 countries and territories</p>

          <div className="tracking-box">
            <h3>Track Your Package</h3>
            <div className="tracking-input">
              <input
                type="text"
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button onClick={handleTracking}>
                Track <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <p className="tracking-help">
              Multiple tracking numbers? Separate them with commas.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <h2>Our Shipping Services</h2>
        <div className="services-container">
          <div className="service-card">
            <FontAwesomeIcon icon={faPlane} style={{fontSize : "2.5rem", color: "#4d148c", marginBottom: "1rem"}} />
            <h3>Express Shipping</h3>
            <p>Next day delivery for urgent packages</p>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faTruck} style={{fontSize : "2.5rem", color: "#4d148c", marginBottom: "1rem"}} />
            <h3>Ground Shipping</h3>
            <p>Economical solutions for less urgent deliveries</p>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faGlobe} style={{fontSize : "2.5rem", color: "#4d148c", marginBottom: "1rem"}} />
            <h3>International</h3>
            <p>Seamless shipping across borders</p>
          </div>
          <div className="service-card">
            <FontAwesomeIcon icon={faBox} style={{fontSize : "2.5rem", color: "#4d148c", marginBottom: "1rem"}} />
            <h3>Freight Services</h3>
            <p>Heavy and bulk shipments handled with care</p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="calculator">
        <h2>Shipping Rate Calculator</h2>
        <div className="calc-container">
          <div className="calc-form">
            <div className="form-group">
              <label htmlFor="origin">Origin</label>
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Zip Code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Zip Code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (lbs)</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="package-type">Package Type</label>
              <select
                id="package-type"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
              >
                <option value="envelope">Envelope</option>
                <option value="small">Small Box</option>
                <option value="medium">Medium Box</option>
                <option value="large">Large Box</option>
              </select>
            </div>
            <button onClick={calculateRate}>Calculate Rate</button>
          </div>
          <div className="calc-result">
            <h3>Estimated Cost</h3>
            <div className="result-box">
              <p className="result-amount">{rate ? rate : "$ -"}</p>
              <p className="result-details">
                {rate ? "Cheap right ?" : "Enter details to calculate shipping cost"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingData && (
        <section className="tracking-results">
          <h2>Tracking Results</h2>
          <div className="tracking-details">
            <div className="tracking-status">
              <div className="status-bar">
                <div className={`status-point ${trackingData.status === "Label Created" ? "active" : ""}`}></div>
                <div className={`status-point ${trackingData.status === "In Transit" ? "active" : ""}`}></div>
                <div className={`status-point ${trackingData.status === "Out for Delivery" ? "active" : ""}`}></div>
                <div className={`status-point ${trackingData.status === "Delivered" ? "active" : ""}`}></div>
              </div>
              <div className="status-labels">
                <span>Label Created</span>
                <span>In Transit</span>
                <span>Out for Delivery</span>
                <span>Delivered</span>
              </div>
            </div>
            <div className="tracking-info">
              <h3>Package Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Tracking Number:</strong> {trackingData.number}
                </div>
                <div className="info-item">
                  <strong>Status:</strong> {trackingData.status}
                </div>
                <div className="info-item">
                  <strong>Last Location:</strong> {trackingData.location}
                </div>
                <div className="info-item">
                  <strong>Estimated Delivery:</strong> {trackingData.delivery}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </>
  );
};

export default Index;
