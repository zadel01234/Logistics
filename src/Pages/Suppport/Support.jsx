import React, { useState, useEffect } from "react";
import "./support.css";
import {
  FaSearch,
  FaBox,
  FaCreditCard,
  FaTruck,
  FaUndo,
  FaUserCircle,
  FaQuestionCircle,
  FaChevronDown,
  FaPhone,
  FaComments,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

const Support = () => {
  // --- STATE ---
  const [faqActive, setFaqActive] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [faqSearch, setFaqSearch] = useState("");
  const [supportSearch, setSupportSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    tracking: "",
    message: "",
  });

  // --- FAQ DATA ---
  const faqs = [
    {
      category: "tracking",
      q: "How do I track my package?",
      a: "You can track your package by entering your tracking number on our tracking page. You'll receive a tracking number when your shipment is processed. You can also track packages through your QuickShip account if you're logged in.",
    },
    {
      category: "tracking",
      q: "Why hasn't my tracking information updated?",
      a: "Tracking information may not update immediately after drop-off or pickup. It can take up to 24 hours for the tracking information to appear in our system. If it's been longer than 24 hours, please contact customer support for assistance.",
    },
    {
      category: "shipping",
      q: "What are your shipping options and deadlines?",
      a: "We offer several shipping options including Next Day Air, 2-Day Air, 3-Day Ground, and International services. Shipping deadlines vary by service and destination. Use our shipping calculator to see available options for your specific shipment.",
    },
    {
      category: "shipping",
      q: "How do I schedule a pickup?",
      a: "You can schedule a pickup through your QuickShip account or by calling customer service. There may be a fee for pickup services depending on your account type and location. Pickups must be scheduled by 2:00 PM local time for same-day service.",
    },
    {
      category: "billing",
      q: "How can I view my shipping invoices?",
      a: "You can view and download your shipping invoices by logging into your QuickShip account and navigating to the Billing section. Invoices are typically available within 24 hours of shipment processing. If you need assistance, contact our billing department.",
    },
    {
      category: "billing",
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and QuickShip account payments. Business accounts may also be eligible for invoice billing with net-30 terms based on credit approval.",
    },
    {
      category: "account",
      q: "How do I reset my password?",
      a: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address associated with your account, and we\'ll send you instructions to reset your password. If you continue to have issues, contact our support team.',
    },
    {
      category: "international",
      q: "What documents are needed for international shipping?",
      a: "International shipments typically require a commercial invoice, which we can help you generate. Depending on the destination country and contents, you may also need certificates of origin, import licenses, or other documentation. Check our international shipping guide for specific requirements.",
    },
  ];

  // --- HELP TOPICS SEARCH DEMO ---
  const helpTopics = [
    "track package",
    "shipping rates",
    "billing questions",
    "account support",
    "international shipping",
    "package pickup",
    "damaged shipment",
    "delivery delays",
  ];

  // --- HANDLERS ---
  const toggleFaq = (i) => {
    setFaqActive(faqActive === i ? null : i);
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = activeCategory === "all" || f.category === activeCategory;
    const search = faqSearch.toLowerCase();
    const matchesSearch =
      search === "" ||
      f.q.toLowerCase().includes(search) ||
      f.a.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  const handleSupportSearch = () => {
    if (!supportSearch.trim()) {
      alert("Please enter a search term");
      return;
    }
    const results = helpTopics.filter((topic) =>
      topic.includes(supportSearch.toLowerCase())
    );
    if (results.length > 0) {
      alert(
        `Found ${results.length} help topics related to "${supportSearch}":\n\n- ${results.join(
          "\n- "
        )}`
      );
    } else {
      alert(`No results found for "${supportSearch}". Try different keywords.`);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id.replace("contact-", "")]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.topic || !formData.message) {
      alert("Please fill out all required fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    alert(
      `Thank you for your message, ${formData.name}! We'll respond to your ${formData.topic} inquiry at ${formData.email} within 24 hours.`
    );
    setFormData({ name: "", email: "", phone: "", topic: "", tracking: "", message: "" });
  };

  useEffect(() => {
    document.title = "Support | QuickShip Logistics";
  }, []);

  // --- RENDER ---
  return (
    <div className="support-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>How Can We Help You?</h1>
          <p>Find answers, get support, and manage your shipments</p>
        </div>
      </section>

      {/* Search */}
      <section className="search-support">
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for help articles, tracking help, or account support..."
              value={supportSearch}
              onChange={(e) => setSupportSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSupportSearch()}
            />
            <button onClick={handleSupportSearch}>Search</button>
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="quick-help">
        <div className="container">
          <h2>Quick Help Topics</h2>
          <div className="help-grid">
            {[
              { icon: <FaBox />, title: "Track a Package", desc: "Find tracking information and delivery status" },
              { icon: <FaCreditCard />, title: "Billing & Payments", desc: "Questions about charges, invoices, or payment methods" },
              { icon: <FaTruck />, title: "Shipping Rates", desc: "Calculate shipping costs and view rate information" },
              { icon: <FaUndo />, title: "Returns & Refunds", desc: "Process returns and inquire about refunds" },
              { icon: <FaUserCircle />, title: "Account Support", desc: "Manage your account, password, and preferences" },
              { icon: <FaQuestionCircle />, title: "Other Questions", desc: "Get help with other shipping-related questions" },
            ].map((h, i) => (
              <div className="help-card" key={i}>
                <div className="help-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
                <a href="#" className="help-link">
                  Get Help <FaArrowRight />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-categories">
              <h3>Browse by Category</h3>
              <ul className="category-list">
                {["all", "tracking", "shipping", "billing", "account", "international"].map((cat) => (
                  <li
                    key={cat}
                    className={`category-item ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat === "all" ? "All FAQs" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="faq-questions">
              <div className="faq-search">
                <input
                  type="text"
                  placeholder="Search within FAQs..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                />
              </div>
              <div className="faq-list">
                {filteredFaqs.map((f, i) => (
                  <div key={i} className={`faq-item ${faqActive === i ? "active" : ""}`}>
                    <div className="faq-question" onClick={() => toggleFaq(i)}>
                      <h4>{f.q}</h4>
                      <FaChevronDown />
                    </div>
                    <div className="faq-answer">
                      <p>{f.a}</p>
                    </div>
                  </div>
                ))}
                {filteredFaqs.length === 0 && <p>No FAQs match your search.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <div className="container">
          <h2>Contact Support</h2>
          <div className="contact-container">
            <div className="contact-methods">
              <div className="contact-card">
                <div className="contact-icon"><FaPhone /></div>
                <h3>Call Us</h3>
                <p>Speak directly with a support representative</p>
                <div className="contact-info">
                  <p className="contact-detail">1-800-QUICKSHIP (1-800-784-2557)</p>
                  <p className="contact-hours">Mon-Fri: 8:00 AM - 10:00 PM ET</p>
                  <p className="contact-hours">Sat-Sun: 9:00 AM - 6:00 PM ET</p>
                </div>
                <button className="contact-btn" onClick={() => alert("Would initiate a phone call in real app")}>Call Now</button>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><FaComments /></div>
                <h3>Live Chat</h3>
                <p>Chat with a support agent in real-time</p>
                <div className="contact-info">
                  <p className="contact-detail">Available 24/7</p>
                  <p className="contact-note">Average wait time: less than 2 minutes</p>
                </div>
                <button className="contact-btn" onClick={() => alert("Live chat would open")}>Start Chat</button>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><FaEnvelope /></div>
                <h3>Email Us</h3>
                <p>Send us a message and we'll respond within 24 hours</p>
                <div className="contact-info">
                  <p className="contact-detail">support@quickship.com</p>
                  <p className="contact-note">Include your tracking number for faster service</p>
                </div>
                <button className="contact-btn" onClick={() => alert("Would open email client")}>Send Email</button>
              </div>
            </div>

            <div className="contact-form-container">
              <h3>Send us a Message</h3>
              <form id="support-form" onSubmit={handleSubmit}>
                <div className="form-groups">
                  <label htmlFor="contact-name">Full Name</label>
                  <input id="contact-name" value={formData.name} onChange={handleFormChange} required />
                </div>
                <div className="form-groups">
                  <label htmlFor="contact-email">Email Address</label>
                  <input type="email" id="contact-email" value={formData.email} onChange={handleFormChange} required />
                </div>
                <div className="form-groups">
                  <label htmlFor="contact-phone">Phone Number (Optional)</label>
                  <input type="tel" id="contact-phone" value={formData.phone} onChange={handleFormChange} />
                </div>
                <div className="form-groups">
                  <label htmlFor="contact-topic">Topic</label>
                  <select id="contact-topic" value={formData.topic} onChange={handleFormChange} required>
                    <option value="">Select a topic</option>
                    <option value="tracking">Tracking Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="account">Account Issue</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-groups">
                  <label htmlFor="contact-tracking">Tracking Number (If applicable)</label>
                  <input id="contact-tracking" value={formData.tracking} onChange={handleFormChange} />
                </div>
                <div className="form-groups full-width">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" rows="5" value={formData.message} onChange={handleFormChange} required />
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="status-section">
        <div className="container">
          <h2>Service Status</h2>
          <div className="status-container">
            <div className="status-card">
              <div className="status-header">
                <h3>Network Status</h3>
                <span className="status-indicator active" title="All systems operating normally">All Systems Operational</span>
              </div>
              <p>Check the status of our shipping network and services</p>
              <a href="#" className="status-link">View Detailed Status <FaArrowRight /></a>
            </div>
            <div className="status-card">
              <div className="status-header">
                <h3>Weather Alerts</h3>
                <span className="status-indicator warning" title="Minor delays due to weather">Minor Delays in Some Areas</span>
              </div>
              <p>View current weather-related service disruptions</p>
              <a href="#" className="status-link">View Weather Alerts <FaArrowRight /></a>
            </div>
            <div className="status-card">
              <div className="status-header">
                <h3>Holiday Schedule</h3>
                <span className="status-indicator">Upcoming Holiday Changes</span>
              </div>
              <p>See how holidays may affect pickup and delivery services</p>
              <a href="#" className="status-link">View Holiday Schedule <FaArrowRight /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
