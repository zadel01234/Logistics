// import React, { useState, useEffect, useRef } from 'react';
// import './Locations.css';
// import york from "../../assets/popular-image-1.avif";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBoxOpen,
//   faShippingFast,
//   faTruckLoading,
//   faPrint,
// } from "@fortawesome/free-solid-svg-icons";
// const Locations = () => {
//   const [isNavActive, setIsNavActive] = useState(false);
//   const [locations, setLocations] = useState([
//     {
//       id: 1,
//       name: "QuickShip Downtown",
//       address: "123 Main St, New York, NY 10001",
//       lat: 40.7128,
//       lng: -74.0060,
//       phone: "(212) 555-1234",
//       hours: "Mon-Fri: 8:00 AM - 8:00 PM, Sat: 9:00 AM - 6:00 PM, Sun: 10:00 AM - 4:00 PM",
//       services: ["Packaging", "Shipping", "Printing", "Notary"],
//       type: "store",
//       distance: 0.8
//     },
//     {
//       id: 2,
//       name: "QuickShip West Side",
//       address: "456 Broadway, New York, NY 10012",
//       lat: 40.7209,
//       lng: -74.0007,
//       phone: "(212) 555-5678",
//       hours: "Mon-Fri: 7:30 AM - 9:00 PM, Sat: 9:00 AM - 7:00 PM, Sun: Closed",
//       services: ["Packaging", "Shipping", "Pickup"],
//       type: "store",
//       distance: 1.2
//     },
//     {
//       id: 3,
//       name: "QuickShip Central Station",
//       address: "789 Park Ave, New York, NY 10021",
//       lat: 40.7690,
//       lng: -73.9665,
//       phone: "(212) 555-9012",
//       hours: "Mon-Sun: 6:00 AM - 10:00 PM",
//       services: ["Packaging", "Shipping", "Printing", "Pickup", "Notary"],
//       type: "store",
//       distance: 2.5
//     },
//     {
//       id: 4,
//       name: "QuickShip Dropbox - Midtown",
//       address: "321 5th Ave, New York, NY 10016",
//       lat: 40.7456,
//       lng: -73.9823,
//       phone: "N/A",
//       hours: "24/7 Access",
//       services: ["Drop-off"],
//       type: "dropoff",
//       distance: 0.5
//     },
//     {
//       id: 5,
//       name: "QuickShip Locker - Upper East",
//       address: "654 Lexington Ave, New York, NY 10022",
//       lat: 40.7634,
//       lng: -73.9662,
//       phone: "N/A",
//       hours: "24/7 Access",
//       services: ["Drop-off", "Pickup"],
//       type: "locker",
//       distance: 3.1
//     }
//   ]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [locationType, setLocationType] = useState('all');
//   const [services, setServices] = useState('all');
//   const [radius, setRadius] = useState(10);
//   const [sortBy, setSortBy] = useState('distance');
//   const mapRef = useRef(null);
//   const markersRef = useRef([]);

//   // Initialize filtered locations
//   useEffect(() => {
//     setFilteredLocations(locations);
//   }, []);

//   // Mobile Navigation Toggle
//   const toggleNav = () => {
//     setIsNavActive(!isNavActive);
//   };

//   const closeNav = () => {
//     setIsNavActive(false);
//   };

//   // Check if location is currently open
//   const checkIfOpen = (hours) => {
//     // This is a simplified check - in a real application, you would parse the hours string
//     const now = new Date();
//     const hour = now.getHours();
//     const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
//     // For demo purposes, assume locations are open between 8 AM and 8 PM on weekdays
//     // and 9 AM to 5 PM on weekends, unless specified as closed
//     if (hours.includes('Closed')) {
//       return false;
//     }
    
//     if (day === 0) { // Sunday
//       return hour >= 9 && hour < 17;
//     } else if (day === 6) { // Saturday
//       return hour >= 9 && hour < 17;
//     } else { // Weekdays
//       return hour >= 8 && hour < 20;
//     }
//   };

//   // Show location details in modal
//   const showLocationDetails = (locationId) => {
//     const location = locations.find(loc => loc.id === locationId);
//     if (!location) return;
    
//     setSelectedLocation(location);
//     setShowModal(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedLocation(null);
//   };

//   // Perform search
//   const performSearch = () => {
//     let results = locations.filter(location => {
//       // Filter by search text
//       const matchesSearch = searchText === '' || 
//           location.name.toLowerCase().includes(searchText.toLowerCase()) || 
//           location.address.toLowerCase().includes(searchText.toLowerCase());
      
//       // Filter by location type
//       const matchesType = locationType === 'all' || location.type === locationType;
      
//       // Filter by service
//       const matchesService = services === 'all' || location.services.includes(services);
      
//       // Filter by radius
//       const matchesRadius = location.distance <= radius;
      
//       return matchesSearch && matchesType && matchesService && matchesRadius;
//     });
    
//     // Sort results
//     if (sortBy === 'distance') {
//       results.sort((a, b) => a.distance - b.distance);
//     } else if (sortBy === 'name') {
//       results.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortBy === 'hours') {
//       // Sort by open status first, then by distance
//       results.sort((a, b) => {
//         const aOpen = checkIfOpen(a.hours);
//         const bOpen = checkIfOpen(b.hours);
        
//         if (aOpen && !bOpen) return -1;
//         if (!aOpen && bOpen) return 1;
//         return a.distance - b.distance;
//       });
//     }
    
//     setFilteredLocations(results);
//   };

//   // Handle search form submission
//   const handleSearch = (e) => {
//     e.preventDefault();
//     performSearch();
//   };

//   // Handle input changes
//   const handleInputChange = (setter) => (e) => {
//     setter(e.target.value);
//   };

//   // Handle filter changes
//   const handleFilterChange = (setter) => (e) => {
//     setter(e.target.value);
//     performSearch();
//   };

//   // Initialize map (this would be implemented with a proper map library)
//   useEffect(() => {
//     // In a real implementation, you would initialize your map here
//     // For this example, we'll just simulate the map functionality
//     console.log("Map would be initialized here");
    
//     // Perform initial search
//     performSearch();
//   }, []);

//   return (
//     <div className="locations-page">

//       {/* Page Header */}
//       <section className="page-header">
//         <div className="container">
//           <h1>Find a QuickShip Location</h1>
//           <p>With thousands of locations nationwide, we're always nearby</p>
//         </div>
//       </section>

//       {/* Search Section */}
//       <section className="search-section">
//         <div className="container">
//           <div className="search-container">
//             <form className="search-box" onSubmit={handleSearch}>
//               <i className="fas fa-search"></i>
//               <input 
//                 type="text" 
//                 id="location-search" 
//                 placeholder="Enter ZIP code, city, or address"
//                 value={searchText}
//                 onChange={handleInputChange(setSearchText)}
//               />
//               <button type="submit" id="search-btn">Find Locations</button>
//             </form>
//             <div className="search-options">
//               <div className="filter-group">
//                 <label htmlFor="location-type">Location Type:</label>
//                 <select 
//                   id="location-type" 
//                   value={locationType}
//                   onChange={handleFilterChange(setLocationType)}
//                 >
//                   <option value="all">All Locations</option>
//                   <option value="store">Retail Stores</option>
//                   <option value="dropoff">Drop-off Points</option>
//                   <option value="locker">Smart Lockers</option>
//                 </select>
//               </div>
//               <div className="filter-group">
//                 <label htmlFor="services">Services:</label>
//                 <select 
//                   id="services" 
//                   value={services}
//                   onChange={handleFilterChange(setServices)}
//                 >
//                   <option value="all">All Services</option>
//                   <option value="packaging">Packaging</option>
//                   <option value="shipping">Shipping</option>
//                   <option value="pickup">Package Pickup</option>
//                 </select>
//               </div>
//               <div className="filter-group">
//                 <label htmlFor="radius">Search Radius:</label>
//                 <select 
//                   id="radius" 
//                   value={radius}
//                   onChange={handleFilterChange(setRadius)}
//                 >
//                   <option value="5">5 miles</option>
//                   <option value="10">10 miles</option>
//                   <option value="25">25 miles</option>
//                   <option value="50">50 miles</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Map and Results Section */}
//       <section className="map-results-section">
//         <div className="container">
//           <div className="map-results-container">
//             {/* Map Container */}
//             <div className="map-container">
//               <div id="map">
//                 <div className="map-placeholder">
//                   <i className="fas fa-map-marked-alt"></i>
//                   <p>Interactive Map</p>
//                   <p>In a real implementation, this would show a map with location markers</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Results List */}
//             <div className="results-container">
//               <div className="results-header">
//                 <h3>Nearby Locations</h3>
//                 <div className="results-sort">
//                   <label htmlFor="sort-results">Sort by:</label>
//                   <select 
//                     id="sort-results" 
//                     value={sortBy}
//                     onChange={handleFilterChange(setSortBy)}
//                   >
//                     <option value="distance">Distance</option>
//                     <option value="name">Name</option>
//                     <option value="hours">Open Now</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="results-list" id="results-list">
//                 {filteredLocations.length === 0 ? (
//                   <div className="location-item">
//                     <p>No locations found. Try expanding your search radius.</p>
//                   </div>
//                 ) : (
//                   filteredLocations.map(location => {
//                     const isOpen = checkIfOpen(location.hours);
//                     return (
//                       <div 
//                         key={location.id} 
//                         className="location-item"
//                         onClick={() => showLocationDetails(location.id)}
//                       >
//                         <h4 className="location-name">{location.name}</h4>
//                         <p className="location-address">{location.address}</p>
//                         <div className="location-details">
//                           <span className="location-distance">{location.distance} miles away</span>
//                           <span className={`location-status ${isOpen ? 'status-open' : 'status-closed'}`}>
//                             {isOpen ? 'Open Now' : 'Closed'}
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Location Details Modal */}
//       {showModal && selectedLocation && (
//         <div className="modal" id="location-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2 id="modal-location-name">{selectedLocation.name}</h2>
//               <span className="close-modal" onClick={closeModal}>&times;</span>
//             </div>
//             <div className="modal-body">
//               <div className="location-details">
//                 <div className="detail-row">
//                   <i className="fas fa-map-marker-alt"></i>
//                   <div>
//                     <p id="modal-location-address">{selectedLocation.address}</p>
//                     <p className="distance" id="modal-location-distance">{selectedLocation.distance} miles away</p>
//                   </div>
//                 </div>
//                 <div className="detail-row">
//                   <i className="fas fa-clock"></i>
//                   <div>
//                     <p id="modal-location-hours">{selectedLocation.hours}</p>
//                     <p className="status" id="modal-location-status">
//                       <span className={checkIfOpen(selectedLocation.hours) ? 'status-open' : 'status-closed'}>
//                         {checkIfOpen(selectedLocation.hours) ? 'Open Now' : 'Closed'}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="detail-row">
//                   <i className="fas fa-phone"></i>
//                   <p id="modal-location-phone">{selectedLocation.phone}</p>
//                 </div>
//                 <div className="detail-row">
//                   <i className="fas fa-list"></i>
//                   <p id="modal-location-services">{selectedLocation.services.join(', ')}</p>
//                 </div>
//               </div>
//               <div className="location-actions">
//                 <button className="btn-primary"><i className="fas fa-directions"></i> Get Directions</button>
//                 <button className="btn-secondary"><i className="fas fa-print"></i> Print Label</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Popular Locations Section */}
//       <section className="popular-locations">
//         <div className="container">
//           <h2>Popular QuickShip Locations</h2>
//           <div className="popular-grid">
//             <div className="popular-card">
//               <div className="popular-image">
//                 <img src={york} alt="New York Location" />
//               </div>
//               <div className="popular-content">
//                 <h3>New York City</h3>
//                 <p>123 Broadway, New York, NY 10001</p>
//                 <div className="popular-hours">
//                   <p>Open today: 8:00 AM - 8:00 PM</p>
//                 </div>
//                 <button className="view-details" onClick={() => showLocationDetails(1)}>View Details</button>
//               </div>
//             </div>
//             <div className="popular-card">
//               <div className="popular-image">
//                 <img src={york} alt="Los Angeles Location" />
//               </div>
//               <div className="popular-content">
//                 <h3>Los Angeles</h3>
//                 <p>456 Sunset Blvd, Los Angeles, CA 90001</p>
//                 <div className="popular-hours">
//                   <p>Open today: 7:00 AM - 9:00 PM</p>
//                 </div>
//                 <button className="view-details" onClick={() => showLocationDetails(2)}>View Details</button>
//               </div>
//             </div>
//             <div className="popular-card">
//               <div className="popular-image">
//                 <img src={york} alt="Chicago Location" />
//               </div>
//               <div className="popular-content">
//                 <h3>Chicago</h3>
//                 <p>789 Michigan Ave, Chicago, IL 60601</p>
//                 <div className="popular-hours">
//                   <p>Open today: 8:30 AM - 7:30 PM</p>
//                 </div>
//                 <button className="view-details" onClick={() => showLocationDetails(3)}>View Details</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="services-section">
//         <div className="container">
//           <h2>Services at Our Locations</h2>
//           <div className="services-grid">
//             <div className="service-item">
//               <div className="service-icon">
//                 <FontAwesomeIcon icon={faBoxOpen} size="2x" />
//               </div>
//               <h3>Packaging</h3>
//               <p>Get professional packaging for your items with various box sizes and materials available.</p>
//             </div>
//             <div className="service-item">
//               <div className="service-icon">
//                 <FontAwesomeIcon icon={faShippingFast} size="2x" />
//               </div>
//               <h3>Shipping</h3>
//               <p>Ship domestically or internationally with multiple delivery options to meet your needs.</p>
//             </div>
//             <div className="service-item">
//               <div className="service-icon">
//                 <FontAwesomeIcon icon={faTruckLoading} size="2x" />
//               </div>
//               <h3>Package Pickup</h3>
//               <p>Schedule a pickup from your home or office for added convenience.</p>
//             </div>
//             <div className="service-item">
//               <div className="service-icon">
//                 <FontAwesomeIcon icon={faPrint} size="2x" />
//               </div>
//               <h3>Printing</h3>
//               <p>Print shipping labels, documents, and photos at our self-service stations.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Locations;

import React, { useEffect, useRef, useState } from "react";
import york from "../../assets/popular-image-1.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faShippingFast,
  faTruckLoading,
  faPrint,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { 
  faMapMarkerAlt, 
  faClock, 
  faPhone, 
  faList, 
  faDirections 
} from '@fortawesome/free-solid-svg-icons';

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./locations.css";

// Note: Keep your original CSS file (locations.css) in the same folder
// and make sure font-awesome is included in your public/index.html or index.html.

const sampleLocations = [
  {
    id: 1,
    name: "QuickShip Downtown",
    address: "123 Main St, New York, NY 10001",
    lat: 40.7128,
    lng: -74.006,
    phone: "(212) 555-1234",
    hours: "Mon-Fri: 8:00 AM - 8:00 PM, Sat: 9:00 AM - 6:00 PM, Sun: 10:00 AM - 4:00 PM",
    services: ["Packaging", "Shipping", "Printing", "Notary"],
    type: "store",
    distance: 0.8,
  },
  {
    id: 2,
    name: "QuickShip West Side",
    address: "456 Broadway, New York, NY 10012",
    lat: 40.7209,
    lng: -74.0007,
    phone: "(212) 555-5678",
    hours: "Mon-Fri: 7:30 AM - 9:00 PM, Sat: 9:00 AM - 7:00 PM, Sun: Closed",
    services: ["Packaging", "Shipping", "Pickup"],
    type: "store",
    distance: 1.2,
  },
  {
    id: 3,
    name: "QuickShip Central Station",
    address: "789 Park Ave, New York, NY 10021",
    lat: 40.769,
    lng: -73.9665,
    phone: "(212) 555-9012",
    hours: "Mon-Sun: 6:00 AM - 10:00 PM",
    services: ["Packaging", "Shipping", "Printing", "Pickup", "Notary"],
    type: "store",
    distance: 2.5,
  },
  {
    id: 4,
    name: "QuickShip Dropbox - Midtown",
    address: "321 5th Ave, New York, NY 10016",
    lat: 40.7456,
    lng: -73.9823,
    phone: "N/A",
    hours: "24/7 Access",
    services: ["Drop-off"],
    type: "dropoff",
    distance: 0.5,
  },
  {
    id: 5,
    name: "QuickShip Locker - Upper East",
    address: "654 Lexington Ave, New York, NY 10022",
    lat: 40.7634,
    lng: -73.9662,
    phone: "N/A",
    hours: "24/7 Access",
    services: ["Drop-off", "Pickup"],
    type: "locker",
    distance: 3.1,
  },
];


export default function Locations() {
  const [locations] = useState(sampleLocations);
  const [filtered, setFiltered] = useState(sampleLocations);

  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [radius, setRadius] = useState(10);
  const [sortBy, setSortBy] = useState("distance");

  const [modalOpen, setModalOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);

  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const mapContainerRef = useRef(null);

  // Initialize map once
  useEffect(() => {
    mapRef.current = L.map("map", { zoomControl: true }).setView([40.7128, -74.006], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // initial markers
    updateMapMarkers(filtered);

    // cleanup on unmount
    return () => {
      mapRef.current && mapRef.current.remove();
      markersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers whenever filtered changes
  useEffect(() => {
    updateMapMarkers(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered]);

  function updateMapMarkers(locationsToShow) {
    if (!mapRef.current) return;

    // remove existing markers
    markersRef.current.forEach((m) => {
      mapRef.current.removeLayer(m);
    });
    markersRef.current = [];

    // add new markers
    locationsToShow.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng])
        .addTo(mapRef.current)
        .bindPopup(`<strong>${loc.name}</strong><br>${loc.address}<br>${loc.distance} miles away`);

      marker.locationId = loc.id;
      marker.on("click", () => showLocationDetails(loc.id));
      markersRef.current.push(marker);
    });

    if (locationsToShow.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }

  function checkIfOpen(hours) {
    if (!hours) return false;
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    if (hours.includes("Closed")) return false;
    if (day === 0) return hour >= 9 && hour < 17;
    if (day === 6) return hour >= 9 && hour < 17;
    return hour >= 8 && hour < 20;
  }

  function showLocationDetails(locationId) {
    const loc = locations.find((l) => l.id === locationId);
    if (!loc) return;

    setActiveLocation({ ...loc, isOpen: checkIfOpen(loc.hours) });
    setModalOpen(true);

    if (mapRef.current) {
      mapRef.current.setView([loc.lat, loc.lng], 15);
      markersRef.current.forEach((m) => {
        if (m.locationId === locationId) m.openPopup();
      });
    }
  }

  function closeModal() {
    setModalOpen(false);
    setActiveLocation(null);
  }

  function performSearch() {
    const search = searchText.trim().toLowerCase();

    let filteredLocations = locations.filter((location) => {
      const matchesSearch =
        search === "" ||
        location.name.toLowerCase().includes(search) ||
        location.address.toLowerCase().includes(search);

      const matchesType = selectedType === "all" || location.type === selectedType;

      const matchesService =
        selectedService === "all" || location.services.map((s) => s.toLowerCase()).includes(selectedService);

      const matchesRadius = location.distance <= radius;

      return matchesSearch && matchesType && matchesService && matchesRadius;
    });

    // sorting
    if (sortBy === "distance") {
      filteredLocations.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "name") {
      filteredLocations.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "hours") {
      filteredLocations.sort((a, b) => {
        const aOpen = checkIfOpen(a.hours);
        const bOpen = checkIfOpen(b.hours);
        if (aOpen && !bOpen) return -1;
        if (!aOpen && bOpen) return 1;
        return a.distance - b.distance;
      });
    }

    setFiltered(filteredLocations);
  }

  useEffect(() => {
    // run search when controls change
    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, selectedType, selectedService, radius, sortBy]);

  function handleViewDetailsClick(e, id) {
    e.preventDefault();
    showLocationDetails(id);
  }

  function handleGetCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser. Please enter your ZIP code or address manually.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        if (mapRef.current) mapRef.current.setView([userLat, userLng], 13);
        L.marker([userLat, userLng]).addTo(mapRef.current).bindPopup("Your Location").openPopup();
      },
      (err) => {
        console.error("Error getting location:", err);
        alert("Unable to get your location. Please enter your ZIP code or address manually.");
      }
    );
  }
  useEffect(() => {
      document.title = "Locations | QuickShip Logistics "; // 👈 change tab title
    }, []);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Find a QuickShip Location</h1>
          <p>With thousands of locations nationwide, we're always nearby</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              {/* <FontAwesomeIcon icon={faSearch} style={{position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#6c757d"}} /> */}
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                id="location-search"
                placeholder="Enter ZIP code, city, or address"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") performSearch();
                }}
              />
              <button id="search-btn" onClick={performSearch}>
                Find Locations 
                {/* <FontAwesomeIcon icon={faSearch} /> */}
              </button>
            </div>

            <div className="search-options">
              <div className="filter-group">
                <label htmlFor="location-type">Location Type:</label>
                <select id="location-type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                  <option value="all">All Locations</option>
                  <option value="store">Retail Stores</option>
                  <option value="dropoff">Drop-off Points</option>
                  <option value="locker">Smart Lockers</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="services">Services:</label>
                <select id="services" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                  <option value="all">All Services</option>
                  <option value="packaging">Packaging</option>
                  <option value="shipping">Shipping</option>
                  <option value="pickup">Package Pickup</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="radius">Search Radius:</label>
                <select id="radius" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))}>
                  <option value={5}>5 miles</option>
                  <option value={10}>10 miles</option>
                  <option value={25}>25 miles</option>
                  <option value={50}>50 miles</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Results Section */}
      <section className="map-results-section">
        <div className="container">
          <div className="map-results-container">
            <div className="map-container" ref={mapContainerRef}>
              <div id="map" style={{ height: "100%", width: "100%" }} />
            </div>

            <div className="results-container">
              <div className="results-header">
                <h3>Nearby Locations</h3>
                <div className="results-sort">
                  <label htmlFor="sort-results">Sort by:</label>
                  <select id="sort-results" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="distance">Distance</option>
                    <option value="name">Name</option>
                    <option value="hours">Open Now</option>
                  </select>
                </div>
              </div>

              <div className="results-list" id="results-list">
                {filtered.length === 0 ? (
                  <div className="location-item">
                    <p>No locations found. Try expanding your search radius.</p>
                  </div>
                ) : (
                  filtered.map((loc) => (
                    <div className="location-item" key={loc.id} onClick={() => showLocationDetails(loc.id)}>
                      <h4 className="location-name">{loc.name}</h4>
                      <p className="location-address">{loc.address}</p>
                      <div className="location-details">
                        <span className="location-distance">{loc.distance} miles away</span>
                        <span className={`location-status ${checkIfOpen(loc.hours) ? "status-open" : "status-closed"}`}>
                          {checkIfOpen(loc.hours) ? "Open Now" : "Closed"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && activeLocation && (
        <div className="modal" id="location-modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 id="modal-location-name">{activeLocation.name}</h2>
              <span className="close-modal" onClick={closeModal}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="location-details">
                <div className="detail-row">
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{marginRight: "1rem",color: "#4d148c",fontSize: "1.2rem",marginTop: "0.2rem"}} />
                  <div>
                    <p id="modal-location-address">{activeLocation.address}</p>
                    <p className="distance" id="modal-location-distance">{activeLocation.distance} miles away</p>
                  </div>
                </div>

                <div className="detail-row">
                  <FontAwesomeIcon icon={faClock} style={{marginRight: "1rem",color: "#4d148c",fontSize: "1.2rem",marginTop: "0.2rem"}} />
                  <div>
                    <p id="modal-location-hours">{activeLocation.hours}</p>
                    <p className={`status ${activeLocation.isOpen ? "status-open" : "status-closed"}`} id="modal-location-status">
                      {activeLocation.isOpen ? "Open Now" : "Closed"}
                    </p>
                  </div>
                </div>

                <div className="detail-row">
                  <FontAwesomeIcon icon={faPhone} style={{marginRight: "1rem",color: "#4d148c",fontSize: "1.2rem",marginTop: "0.2rem"}} />
                  <p id="modal-location-phone">{activeLocation.phone}</p>
                </div>

                <div className="detail-row">
                  <FontAwesomeIcon icon={faList} style={{marginRight: "1rem",color: "#4d148c",fontSize: "1.2rem",marginTop: "0.2rem"}} />
                  <p id="modal-location-services">{activeLocation.services.join(", ")}</p>
                </div>
              </div>

              <div className="location-actions">
                <button className="btn-primary" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeLocation.address)}`, "_blank")}>
                  <FontAwesomeIcon icon={faDirections} style={{marginRight: "1rem",color: "#fff",fontSize: "1.2rem",marginTop: "0.2rem"}} /> Get Directions
                </button>
                <button className="btn-secondary" onClick={() => window.print()}>
                  <FontAwesomeIcon icon={faPrint} style={{marginRight: "1rem",color: "#fff",fontSize: "1.2rem",marginTop: "0.2rem"}} /> Print Label
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Locations */}
      <section className="popular-locations">
        <div className="container">
          <h2>Popular QuickShip Locations</h2>
          <div className="popular-grid">
            <div className="popular-card">
              <div className="popular-image">
                <img src={york} alt="New York Location" />
              </div>
              <div className="popular-content">
                <h3>New York City</h3>
                <p>123 Broadway, New York, NY 10001</p>
                <div className="popular-hours">
                  <p>Open today: 8:00 AM - 8:00 PM</p>
                </div>
                <button className="view-details" onClick={(e) => handleViewDetailsClick(e, 1)} data-id={1}>
                  View Details
                </button>
              </div>
            </div>

            <div className="popular-card">
              <div className="popular-image">
                <img src={york} alt="Los Angeles Location" />
              </div>
              <div className="popular-content">
                <h3>Los Angeles</h3>
                <p>456 Sunset Blvd, Los Angeles, CA 90001</p>
                <div className="popular-hours">
                  <p>Open today: 7:00 AM - 9:00 PM</p>
                </div>
                <button className="view-details" onClick={(e) => handleViewDetailsClick(e, 2)} data-id={2}>
                  View Details
                </button>
              </div>
            </div>

            <div className="popular-card">
              <div className="popular-image">
                <img src={york} alt="Chicago Location" />
              </div>
              <div className="popular-content">
                <h3>Chicago</h3>
                <p>789 Michigan Ave, Chicago, IL 60601</p>
                <div className="popular-hours">
                  <p>Open today: 8:30 AM - 7:30 PM</p>
                </div>
                <button className="view-details" onClick={(e) => handleViewDetailsClick(e, 3)} data-id={3}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2>Services at Our Locations</h2>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <FontAwesomeIcon icon={faBoxOpen} style={{fontSize: "3rem"}} />
              </div>
              <h3>Packaging</h3>
              <p>Get professional packaging for your items with various box sizes and materials available.</p>
            </div>
            <div className="service-item">
              <div className="service-icon">
                {/* <FontAwesomeIcon icon={faShippingFast} size="2x" /> */}
                <FontAwesomeIcon icon={faShippingFast} style={{fontSize: "3rem"}} />
              </div>
              <h3>Shipping</h3>
              <p>Ship domestically or internationally with multiple delivery options to meet your needs.</p>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <FontAwesomeIcon icon={faTruckLoading} style={{fontSize: "3rem"}} />
              </div>
              <h3>Package Pickup</h3>
              <p>Schedule a pickup from your home or office for added convenience.</p>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <FontAwesomeIcon icon={faPrint} style={{fontSize: "3rem"}} />
              </div>
              <h3>Printing</h3>
              <p>Print shipping labels, documents, and photos at our self-service stations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
