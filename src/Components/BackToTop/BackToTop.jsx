import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          padding: "12px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: isHovered ? "#4d148c" : "#4d148c",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "all 0.3s ease",
        }
      }
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    )
  );
}
