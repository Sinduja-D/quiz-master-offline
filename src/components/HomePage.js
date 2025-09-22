// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import rmkLogo from "../assets/rmk.gif";
import tamilNaduLogo from "../assets/tamil-nadu-logo.png";
import { levels } from "../levels.js";

const HomePage = ({ language, setActivePage, onLevelSelect, user }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    if (user?.username) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);
  
  return (
    <div className="home-container">
      {showWelcome && (
        <div className="welcome-popup">
          {language === "English"
            ? `Welcome to HomePage, ${user.username}!`
            : `முகப்புப்பக்கத்திற்கு வரவேற்கிறோம், ${user.username}!`}
        </div>
      )}
      
      <div className="hero-container">
        <div className="hero-column">
          <div className="logo-container">
            <img src={tamilNaduLogo} alt="Tamil Nadu Logo" className="hero-logo" />
          </div>
          <div className="text-container">
            <h3 className="hero-main-title">
              {language === "English"
                ? "Science Park-Tiruvallur District"
                : "அறிவியல் பூங்கா-திருவள்ளூர் மாவட்டம்"}
            </h3>
          </div>
        </div>
        
        <div className="hero-column">
          <div className="logo-container">
            <img src={rmkLogo} alt="R.M.K Logo" className="hero-logo" />
          </div>
          <div className="text-container">
            <p className="hero-developer-label">
              {language === "English"
                ? "Designed And Developed By"
                : "வடிவமைத்து உருவாக்கியவர்கள்"}
            </p>
            <h3 className="hero-main-title">
              {language === "English"
                ? "R.M.K. Engineering College"
                : "ஆர்.எம்.கே. பொறியியல் கல்லூரி"}
            </h3>
            <p className="hero-sub-title">
              {language === "English"
                ? "(An Autonomous Institution)"
                : "(ஒரு தன்னாட்சி நிறுவனம்)"}
            </p>
            
          </div>
        </div>
        
        <div className="hero-column">
          <div className="text-container full-width">
            <p className="hero-developers">
              {language === "English"
                ? "Developers: Sinduja D, Reethu P, Vijayalakshmi S R"
                : (<>உருவாக்கியவர்கள்: சிந்துஜா டி, ரீத்து பெ, விஜயலட்சுமி சி.ரா</>)}
            </p>
            <p className="hero-department">
              {language === "English"
                ? "Department of Information Technology Batch [2023-2027]"
                : "தகவல் தொழில்நுட்பத் துறை தொகுப்பு [2023-2027]"}
            </p>
            <p className="hero-mentor">
              {language === "English"
                ? "Mentor: Ms. M. Rekha, M.E.(Ph.D), Assistant Professor"
                : "வழிகாட்டி: திருமதி.ம.ரேகா, M.E.(Ph.D), உதவி பேராசிரியர்"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="content-wrapper">
        <div className="level-container">
          <div className="section-title">
            <h2>
              {language === "English"
                ? "Science Quiz for Young Achievers"
                : "இளைய சிந்தனையாளர்களுக்கான அறிவியல் வினாடி வினா"}
            </h2>
          </div>
          <div className="level-cards">
            {levels.map((level) => (
              <div
                key={level.id}
                className="level-card"
                style={{ backgroundColor: level.color }}
                onClick={() => {
                  onLevelSelect(level);
                  setActivePage("quizsetup");
                }}
              >
                <div className="level-icon">{level.icon}</div>
                <h3 className="level-name">{level.name[language]}</h3>
                <p className="level-grade">{level.grade[language]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="explore-section">
          <div className="explore-header">
            <h2>
              {language === "English"
                ? "Explore More Adventures"
                : "மேலும் சாகசங்களை ஆராயுங்கள்"}
            </h2>
          </div>
          <div className="adventure-grid">
            <button
              onClick={() => setActivePage("riddles")}
              className="adventure-card riddles"
            >
              <div className="card-icon">🤔</div>
              <span>{language === "English" ? "Riddles" : "புதிர்கள்"}</span>
            </button>
            <button
              onClick={() => setActivePage("dailyScience")}
              className="adventure-card daily-science"
            >
              <div className="card-icon">🎡</div>
              <span>{language === "English" ? "Spin Wheel" : "சுழலும் சக்கரம்"}</span>
            </button>
            <button
              onClick={() => setActivePage("funFacts")}
              className="adventure-card fun-facts"
            >
              <div className="card-icon">💡</div>
              <span>{language === "English" ? "Fun Facts" : "சுவாரஸ்யங்கள்"}</span>
            </button>
            <button
              onClick={() => setActivePage("storyMenu")}
              className="adventure-card story-menu"
            >
              <div className="card-icon">🔍</div>
              <span>{language === "English" ? "Escape Room" : "தப்பிப்பிழைத்தல் அறை"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;