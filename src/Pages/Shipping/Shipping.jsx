import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faPlane,
  faTruck,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import './Shipping.css';
import './Shipping.css';

const Shipping = () => {
    useEffect(() => {
    document.title = "Shipping | QuickShip Logistics "; // 👈 change tab title
  }, []);
  const [selectedService, setSelectedService] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    sender: {
      name: '',
      company: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    recipient: {
      name: '',
      company: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    package: {
      weight: '',
      length: '',
      width: '',
      height: '',
      value: '',
      content: ''
    }
  });
  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  // Service selection
  const selectService = (service) => {
    setSelectedService(service);
  };

  // Form navigation
  const nextStep = () => {
    const errors = validateStep(currentStep);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Form validation
  const validateStep = (step) => {
    const errors = {};
    
    switch(step) {
      case 1:
        // Validate sender information
        if (!formData.sender.name.trim()) errors.senderName = 'Name is required';
        if (!formData.sender.phone.trim()) errors.senderPhone = 'Phone is required';
        if (!formData.sender.email.trim()) {
          errors.senderEmail = 'Email is required';
        } else if (!isValidEmail(formData.sender.email)) {
          errors.senderEmail = 'Invalid email format';
        }
        if (!formData.sender.address.trim()) errors.senderAddress = 'Address is required';
        if (!formData.sender.city.trim()) errors.senderCity = 'City is required';
        if (!formData.sender.state) errors.senderState = 'State is required';
        if (!formData.sender.zip.trim()) {
          errors.senderZip = 'ZIP code is required';
        } else if (!isValidZip(formData.sender.zip)) {
          errors.senderZip = 'Invalid ZIP code format';
        }
        break;
        
      case 2:
        // Validate recipient information
        if (!formData.recipient.name.trim()) errors.recipientName = 'Name is required';
        if (!formData.recipient.phone.trim()) errors.recipientPhone = 'Phone is required';
        if (!formData.recipient.address.trim()) errors.recipientAddress = 'Address is required';
        if (!formData.recipient.city.trim()) errors.recipientCity = 'City is required';
        if (!formData.recipient.state) errors.recipientState = 'State is required';
        if (!formData.recipient.zip.trim()) {
          errors.recipientZip = 'ZIP code is required';
        } else if (!isValidZip(formData.recipient.zip)) {
          errors.recipientZip = 'Invalid ZIP code format';
        }
        break;
        
      case 3:
        // Validate package details
        if (!formData.package.weight || formData.package.weight <= 0) errors.packageWeight = 'Weight must be greater than 0';
        if (!formData.package.length || formData.package.length <= 0) errors.packageLength = 'Length must be greater than 0';
        if (!formData.package.width || formData.package.width <= 0) errors.packageWidth = 'Width must be greater than 0';
        if (!formData.package.height || formData.package.height <= 0) errors.packageHeight = 'Height must be greater than 0';
        if (!formData.package.value || formData.package.value < 0) errors.packageValue = 'Value must be 0 or greater';
        if (!formData.package.content.trim()) errors.packageContent = 'Content description is required';
        break;
        
      case 4:
        // Final validation - check if service is selected
        if (!selectedService) errors.service = 'Please select a shipping service';
        break;
    }
    
    return errors;
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidZip = (zip) => {
    const re = /^\d{5}$/;
    return re.test(zip);
  };

  // Handle form input changes
  const handleInputChange = (section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    const errorKey = `${section}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (formErrors[errorKey]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all steps and service selection
    const step1Errors = validateStep(1);
    const step2Errors = validateStep(2);
    const step3Errors = validateStep(3);
    const step4Errors = validateStep(4);
    
    const allErrors = {
      ...step1Errors,
      ...step2Errors,
      ...step3Errors,
      ...step4Errors
    };
    
    setFormErrors(allErrors);
    
    if (Object.keys(allErrors).length === 0) {
      // Generate random tracking number
      const newTrackingNumber = 'QS' + Math.floor(100000000 + Math.random() * 900000000);
      setTrackingNumber(newTrackingNumber);
      setShowModal(true);
    } else {
      // If there are errors, go to the first step with errors
      if (Object.keys(step1Errors).length > 0) {
        setCurrentStep(1);
      } else if (Object.keys(step2Errors).length > 0) {
        setCurrentStep(2);
      } else if (Object.keys(step3Errors).length > 0) {
        setCurrentStep(3);
      }
      // Scroll to top to see error messages
      window.scrollTo(0, 0);
    }
  };

  // Calculate shipping cost
  const calculateShippingCost = () => {
    if (!selectedService) return { baseRate: 0, additionalFees: 0, totalCost: 0 };
    
    // Base rates for each service
    const baseRates = {
      'overnight': 25.00,
      'express': 15.00,
      'standard': 8.00,
      'international': 35.00
    };
    
    // Get package details
    const weight = parseFloat(formData.package.weight) || 1;
    const length = parseFloat(formData.package.length) || 1;
    const width = parseFloat(formData.package.width) || 1;
    const height = parseFloat(formData.package.height) || 1;
    const value = parseFloat(formData.package.value) || 0;
    
    // Calculate dimensional weight
    const dimensionalWeight = (length * width * height) / 139;
    const billableWeight = Math.max(weight, dimensionalWeight);
    
    // Calculate cost based on weight and service
    let baseRate = baseRates[selectedService];
    let weightCharge = billableWeight * 2; // $2 per pound
    
    // Additional charges for international
    let additionalFees = 0;
    if (selectedService === 'international') {
      additionalFees = 15.00;
    }
    
    // Insurance based on declared value
    let insurance = value * 0.01; // 1% of declared value
    
    const totalCost = baseRate + weightCharge + additionalFees + insurance;
    
    return {
      baseRate: baseRate.toFixed(2),
      additionalFees: (weightCharge + additionalFees + insurance).toFixed(2),
      totalCost: totalCost.toFixed(2)
    };
  };

  const costDetails = calculateShippingCost();

  // Service names mapping
  const serviceNames = {
    'overnight': 'Overnight Delivery',
    'express': 'Express Delivery',
    'standard': 'Standard Ground',
    'international': 'International'
  };

  return (
    <div className="shipping-page">


      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Shipping Services</h1>
          <p>Choose the right shipping option for your needs</p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="shipping-options">
        <div className="container">
          <h2>Select a Shipping Service</h2>
          <div className="options-grid">
            <div 
              className={`option-card ${selectedService === 'overnight' ? 'selected' : ''}`} 
              onClick={() => selectService('overnight')}
            >
              <div className="option-icon">
                <FontAwesomeIcon icon={faRocket} style={{fontSize : "2.5rem"}} />
              </div>
              <h3>Overnight Delivery</h3>
              <p>Next business day delivery by 10:30 AM</p>
              <div className="option-details">
                <p><strong>Delivery:</strong> Next business day</p>
                <p><strong>Best for:</strong> Urgent documents and packages</p>
              </div>
              <button 
                className="select-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  selectService('overnight');
                }}
              >
                Select
              </button>
            </div>

            <div 
              className={`option-card ${selectedService === 'express' ? 'selected' : ''}`} 
              onClick={() => selectService('express')}
            >
              <div className="option-icon">
                <FontAwesomeIcon icon={faPlane} style={{fontSize : "2.5rem"}} />
              </div>
              <h3>Express Delivery</h3>
              <p>2-3 business days delivery</p>
              <div className="option-details">
                <p><strong>Delivery:</strong> 2-3 business days</p>
                <p><strong>Best for:</strong> Time-sensitive shipments</p>
              </div>
              <button 
                className="select-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  selectService('express');
                }}
              >
                Select
              </button>
            </div>

            <div 
              className={`option-card ${selectedService === 'standard' ? 'selected' : ''}`} 
              onClick={() => selectService('standard')}
            >
              <div className="option-icon">
                <FontAwesomeIcon icon={faTruck} style={{fontSize : "2.5rem"}} />
              </div>
              <h3>Standard Ground</h3>
              <p>3-5 business days delivery</p>
              <div className="option-details">
                <p><strong>Delivery:</strong> 3-5 business days</p>
                <p><strong>Best for:</strong> Less urgent packages</p>
              </div>
              <button 
                className="select-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  selectService('standard');
                }}
              >
                Select
              </button>
            </div>

            <div 
              className={`option-card ${selectedService === 'international' ? 'selected' : ''}`} 
              onClick={() => selectService('international')}
            >
              <div className="option-icon">
                <FontAwesomeIcon icon={faGlobe} style={{fontSize : "2.5rem"}} />              </div>
              <h3>International</h3>
              <p>Worldwide delivery options</p>
              <div className="option-details">
                <p><strong>Delivery:</strong> Varies by destination</p>
                <p><strong>Best for:</strong> International shipments</p>
              </div>
              <button 
                className="select-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  selectService('international');
                }}
              >
                Select
              </button>
            </div>
          </div>
          {formErrors.service && (
            <div className="service-error">
              <span className="error-message">{formErrors.service}</span>
            </div>
          )}
        </div>
      </section>

      {/* Shipping Form */}
      <section className="shipping-form-section">
        <div className="container">
          <h2>Create Your Shipment</h2>
          <div className="form-container">
            <div className="form-header">
              <div className="step-indicator">
                <div className={`step ${currentStep === 1 ? 'active' : ''}`}>Sender</div>
                <div className={`step ${currentStep === 2 ? 'active' : ''}`}>Recipient</div>
                <div className={`step ${currentStep === 3 ? 'active' : ''}`}>Package</div>
                <div className={`step ${currentStep === 4 ? 'active' : ''}`}>Review</div>
              </div>
            </div>

            <form id="shipping-form" onSubmit={handleSubmit}>
              {/* Step 1: Sender Information */}
              <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
                <h3>Sender Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="sender-name">Full Name </label>
                    <input 
                      type="text" 
                      id="sender-name" 
                      required 
                      value={formData.sender.name}
                      onChange={(e) => handleInputChange('sender', 'name', e.target.value)}
                      className={formErrors.senderName ? 'error' : ''}
                    />
                    {formErrors.senderName && <span className="error-message">{formErrors.senderName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="sender-company">Company (Optional)</label>
                    <input 
                      type="text" 
                      id="sender-company" 
                      value={formData.sender.company}
                      onChange={(e) => handleInputChange('sender', 'company', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sender-phone">Phone Number </label>
                    <input 
                      type="tel" 
                      id="sender-phone" 
                      required 
                      value={formData.sender.phone}
                      onChange={(e) => handleInputChange('sender', 'phone', e.target.value)}
                      className={formErrors.senderPhone ? 'error' : ''}
                    />
                    {formErrors.senderPhone && <span className="error-message">{formErrors.senderPhone}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="sender-email">Email Address </label>
                    <input 
                      type="email" 
                      id="sender-email" 
                      required 
                      value={formData.sender.email}
                      onChange={(e) => handleInputChange('sender', 'email', e.target.value)}
                      className={formErrors.senderEmail ? 'error' : ''}
                    />
                    {formErrors.senderEmail && <span className="error-message">{formErrors.senderEmail}</span>}
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="sender-address">Street Address </label>
                    <input 
                      type="text" 
                      id="sender-address" 
                      required 
                      value={formData.sender.address}
                      onChange={(e) => handleInputChange('sender', 'address', e.target.value)}
                      className={formErrors.senderAddress ? 'error' : ''}
                    />
                    {formErrors.senderAddress && <span className="error-message">{formErrors.senderAddress}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="sender-city">City </label>
                    <input 
                      type="text" 
                      id="sender-city" 
                      required 
                      value={formData.sender.city}
                      onChange={(e) => handleInputChange('sender', 'city', e.target.value)}
                      className={formErrors.senderCity ? 'error' : ''}
                    />
                    {formErrors.senderCity && <span className="error-message">{formErrors.senderCity}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="sender-state">State </label>
                    <select style={{color: "black"}}
                      id="sender-state" 
                      required 
                      value={formData.sender.state}
                      onChange={(e) => handleInputChange('sender', 'state', e.target.value)}
                      className={formErrors.senderState ? 'error' : ''}
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="NY">New York</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                    </select>
                    {formErrors.senderState && <span className="error-message">{formErrors.senderState}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="sender-zip">ZIP Code </label>
                    <input 
                      type="text" 
                      id="sender-zip" 
                      required 
                      pattern="[0-9]{5}"
                      value={formData.sender.zip}
                      onChange={(e) => handleInputChange('sender', 'zip', e.target.value)}
                      className={formErrors.senderZip ? 'error' : ''}
                    />
                    {formErrors.senderZip && <span className="error-message">{formErrors.senderZip}</span>}
                  </div>
                </div>
                <div className="form-navigation">
                  <button type="button" className="next-btn" onClick={nextStep}>Next →</button>
                </div>
              </div>

              {/* Step 2: Recipient Information */}
              <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
                <h3>Recipient Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="recipient-name">Full Name </label>
                    <input 
                      type="text" 
                      id="recipient-name" 
                      required 
                      value={formData.recipient.name}
                      onChange={(e) => handleInputChange('recipient', 'name', e.target.value)}
                      className={formErrors.recipientName ? 'error' : ''}
                    />
                    {formErrors.recipientName && <span className="error-message">{formErrors.recipientName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-company">Company (Optional)</label>
                    <input 
                      type="text" 
                      id="recipient-company" 
                      value={formData.recipient.company}
                      onChange={(e) => handleInputChange('recipient', 'company', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-phone">Phone Number </label>
                    <input 
                      type="tel" 
                      id="recipient-phone" 
                      required 
                      value={formData.recipient.phone}
                      onChange={(e) => handleInputChange('recipient', 'phone', e.target.value)}
                      className={formErrors.recipientPhone ? 'error' : ''}
                    />
                    {formErrors.recipientPhone && <span className="error-message">{formErrors.recipientPhone}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-email">Email Address</label>
                    <input 
                      type="email" 
                      id="recipient-email" 
                      value={formData.recipient.email}
                      onChange={(e) => handleInputChange('recipient', 'email', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="recipient-address">Street Address </label>
                    <input 
                      type="text" 
                      id="recipient-address" 
                      required 
                      value={formData.recipient.address}
                      onChange={(e) => handleInputChange('recipient', 'address', e.target.value)}
                      className={formErrors.recipientAddress ? 'error' : ''}
                    />
                    {formErrors.recipientAddress && <span className="error-message">{formErrors.recipientAddress}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-city">City </label>
                    <input 
                      type="text" 
                      id="recipient-city" 
                      required 
                      value={formData.recipient.city}
                      onChange={(e) => handleInputChange('recipient', 'city', e.target.value)}
                      className={formErrors.recipientCity ? 'error' : ''}
                    />
                    {formErrors.recipientCity && <span className="error-message">{formErrors.recipientCity}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-state">State </label>
                    <select 
                      id="recipient-state" 
                      required 
                      value={formData.recipient.state}
                      onChange={(e) => handleInputChange('recipient', 'state', e.target.value)}
                      className={formErrors.recipientState ? 'error' : ''}
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="NY">New York</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                    </select>
                    {formErrors.recipientState && <span className="error-message">{formErrors.recipientState}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-zip">ZIP Code </label>
                    <input 
                      type="text" 
                      id="recipient-zip" 
                      required 
                      pattern="[0-9]{5}"
                      value={formData.recipient.zip}
                      onChange={(e) => handleInputChange('recipient', 'zip', e.target.value)}
                      className={formErrors.recipientZip ? 'error' : ''}
                    />
                    {formErrors.recipientZip && <span className="error-message">{formErrors.recipientZip}</span>}
                  </div>
                </div>
                <div className="form-navigation">
                  <button type="button" className="prev-btn" onClick={prevStep}>← Previous</button>
                  <button type="button" className="next-btn" onClick={nextStep}>Next →</button>
                </div>
              </div>

              {/* Step 3: Package Details */}
              <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
                <h3>Package Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="package-weight">Weight (lbs) </label>
                    <input 
                      type="number" 
                      id="package-weight" 
                      min="0.1" 
                      step="0.1" 
                      required 
                      value={formData.package.weight}
                      onChange={(e) => handleInputChange('package', 'weight', e.target.value)}
                      className={formErrors.packageWeight ? 'error' : ''}
                    />
                    {formErrors.packageWeight && <span className="error-message">{formErrors.packageWeight}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="package-length">Length (in) </label>
                    <input 
                      type="number" 
                      id="package-length" 
                      min="1" 
                      required 
                      value={formData.package.length}
                      onChange={(e) => handleInputChange('package', 'length', e.target.value)}
                      className={formErrors.packageLength ? 'error' : ''}
                    />
                    {formErrors.packageLength && <span className="error-message">{formErrors.packageLength}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="package-width">Width (in) </label>
                    <input 
                      type="number" 
                      id="package-width" 
                      min="1" 
                      required 
                      value={formData.package.width}
                      onChange={(e) => handleInputChange('package', 'width', e.target.value)}
                      className={formErrors.packageWidth ? 'error' : ''}
                    />
                    {formErrors.packageWidth && <span className="error-message">{formErrors.packageWidth}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="package-height">Height (in) </label>
                    <input 
                      type="number" 
                      id="package-height" 
                      min="1" 
                      required 
                      value={formData.package.height}
                      onChange={(e) => handleInputChange('package', 'height', e.target.value)}
                      className={formErrors.packageHeight ? 'error' : ''}
                    />
                    {formErrors.packageHeight && <span className="error-message">{formErrors.packageHeight}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="package-value">Declared Value ($) </label>
                    <input 
                      type="number" 
                      id="package-value" 
                      min="0" 
                      required 
                      value={formData.package.value}
                      onChange={(e) => handleInputChange('package', 'value', e.target.value)}
                      className={formErrors.packageValue ? 'error' : ''}
                    />
                    {formErrors.packageValue && <span className="error-message">{formErrors.packageValue}</span>}
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="package-content">Content Description </label>
                    <textarea 
                      id="package-content" 
                      rows="3" 
                      required 
                      value={formData.package.content}
                      onChange={(e) => handleInputChange('package', 'content', e.target.value)}
                      className={formErrors.packageContent ? 'error' : ''}
                    ></textarea>
                    {formErrors.packageContent && <span className="error-message">{formErrors.packageContent}</span>}
                  </div>
                </div>
                <div className="form-navigation">
                  <button type="button" className="prev-btn" onClick={prevStep}>← Previous</button>
                  <button type="button" className="next-btn" onClick={nextStep}>Next →</button>
                </div>
              </div>

              {/* Step 4: Review & Submit */}
              <div className={`form-step ${currentStep === 4 ? 'active' : ''}`}>
                <h3>Review Your Shipment</h3>
                <div className="review-container">
                  <div className="review-section">
                    <h4>Service Selected</h4>
                    <p id="review-service">{selectedService ? serviceNames[selectedService] : 'No service selected'}</p>
                    {formErrors.service && <span className="error-message">{formErrors.service}</span>}
                  </div>
                  <div className="review-section">
                    <h4>Sender Information</h4>
                    <div id="review-sender">
                      <p>{formData.sender.name}</p>
                      {formData.sender.company && <p>{formData.sender.company}</p>}
                      <p>{formData.sender.phone}</p>
                      <p>{formData.sender.email}</p>
                      <p>{formData.sender.address}</p>
                      <p>{formData.sender.city}, {formData.sender.state} {formData.sender.zip}</p>
                    </div>
                  </div>
                  <div className="review-section">
                    <h4>Recipient Information</h4>
                    <div id="review-recipient">
                      <p>{formData.recipient.name}</p>
                      {formData.recipient.company && <p>{formData.recipient.company}</p>}
                      <p>{formData.recipient.phone}</p>
                      {formData.recipient.email && <p>{formData.recipient.email}</p>}
                      <p>{formData.recipient.address}</p>
                      <p>{formData.recipient.city}, {formData.recipient.state} {formData.recipient.zip}</p>
                    </div>
                  </div>
                  <div className="review-section">
                    <h4>Package Details</h4>
                    <div id="review-package">
                      <p><strong>Weight:</strong> {formData.package.weight} lbs</p>
                      <p><strong>Dimensions:</strong> {formData.package.length}" × {formData.package.width}" × {formData.package.height}"</p>
                      <p><strong>Declared Value:</strong> ${formData.package.value}</p>
                      <p><strong>Contents:</strong> {formData.package.content}</p>
                    </div>
                  </div>
                  <div className="review-section">
                    <h4>Shipping Cost</h4>
                    <div className="cost-summary">
                      <p>Base rate: <span id="base-rate">${costDetails.baseRate}</span></p>
                      <p>Additional fees: <span id="additional-fees">${costDetails.additionalFees}</span></p>
                      <p className="total-cost">Total: <span id="total-cost">${costDetails.totalCost}</span></p>
                    </div>
                  </div>
                </div>
                <div className="form-navigation">
                  <button type="button" className="prev-btn" onClick={prevStep}>← Previous</button>
                  <button type="submit" className="submit-btn">Create Shipment</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal" id="confirmation-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Shipment Created Successfully!</h2>
              <span className="close-modal" onClick={() => setShowModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="confirmation-details">
                <p>Your shipment has been processed successfully.</p>
                <p>Your tracking number is: <strong id="tracking-number">{trackingNumber}</strong></p>
                <p>You will receive a confirmation email shortly.</p>
              </div>
              <div className="modal-actions">
                <button className="btn-primary" onClick={() => alert('Label printing functionality would be implemented here.')}>
                  Print Label
                </button>
                <button className="btn-secondary" onClick={() => {
                  setShowModal(false);
                  // Reset form
                  setFormData({
                    sender: { name: '', company: '', phone: '', email: '', address: '', city: '', state: '', zip: '' },
                    recipient: { name: '', company: '', phone: '', email: '', address: '', city: '', state: '', zip: '' },
                    package: { weight: '', length: '', width: '', height: '', value: '', content: '' }
                  });
                  setSelectedService(null);
                  setCurrentStep(1);
                  setFormErrors({});
                  window.scrollTo(0, 0);
                }}>
                  Create New Shipment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Shipping;
