// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ language, activePage, setActivePage, toggleLanguage, user, onLogout }) => {
  const navItems = ["home", "about", "contact", "help", "leaderboard"];
  
  const getNavLabel = (page) => {
    if (language === "English")
      return page.charAt(0).toUpperCase() + page.slice(1);
    switch (page) {
      case "home":
        return "முகப்பு";
      case "about":
        return "எங்களைப் பற்றி";
      case "contact":
        return "தொடர்பு";
      case "help":
        return "உதவி";
      case "leaderboard":
        return "தலைவர் பட்டியல்";
      default:
        return page;
    }
  };
  
  return (
    <nav className="navbar">
      <div className="nav-brand">
        🧠 {language === "English" ? "Quiz Master" : "வினா மாஸ்டர்"}
      </div>
      <div className="nav-links">
        {navItems.map((page) => (
          <button
            key={page}
            className={`nav-link ${activePage === page ? "active" : ""}`}
            onClick={() => setActivePage(page)}
          >
            {getNavLabel(page)}
          </button>
        ))}
      </div>
      <div className="nav-actions">
        <button
          className={`nav-link ${activePage === "profile" ? "active" : ""}`}
          onClick={() => setActivePage("profile")}
        >
          👤 {language === "English" ? "Profile" : "சுயவிவரம்"}
        </button>
        <button
          className={`nav-link ${activePage === "achievements" ? "active" : ""}`}
          onClick={() => setActivePage("achievements")}
        >
          🏆 {language === "English" ? "Achievements" : "சாதனைகள்"}
        </button>
        <button onClick={toggleLanguage} className="lang-btn">
          {language === "English" ? "தமிழ்" : "English"}
        </button>
        <div className="user-info">
          <span className="username">{user.username}</span>
          <button onClick={onLogout} className="logout-btn">
            {language === "English" ? "Logout" : "வெளியேறு"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;