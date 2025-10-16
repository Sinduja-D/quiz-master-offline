// src/components/Navbar.jsx
import React from "react";
import './Navbar.css';
import logo from "../assets/app-logo.png";

const Navbar = ({ language, activePage, setActivePage, toggleLanguage, user, onLogout }) => {
  const navItems = ["home", "about", "help", "leaderboard"];
  
  const getNavLabel = (page) => {
    if (language === "English")
      return page.charAt(0).toUpperCase() + page.slice(1);
    switch (page) {
      case "home":
        return "முகப்பு";
      case "about":
        return "பற்றி";
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
      {/* Brand (Logo + Text) */}
      <div className="nav-brand" onClick={() => setActivePage("home")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="App Logo" className="nav-logo" />
        <span className="brand-text">
          {language === "English" ? (<> VigyaanXpo </>): (
    <>
      VigyaanXpo
    </>
  )}
        </span>
      </div>
      
      {/* Navigation Links */}
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
      
      {/* Actions */}
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
        {user && (
          <div className="user-info">
            <span className="username">{user.username}</span>
            <button onClick={onLogout} className="logout-btn">
              {language === "English" ? (<>Logout <br></br> [Once You Completed]</>)  : (<>வெளியேறு <br></br> [நீங்கள் முடித்தவுடன்]</>)}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;