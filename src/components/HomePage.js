// src/components/HomePage.jsx
import React from 'react';
import './HomePage.css';
import { levels } from '../levels.js';

const HomePage = ({ language, setActivePage, onLevelSelect }) => {
  return (
    <div className="home-container">
      <div className="hero-box">
        <h1 className="hero-title">
          {language === "English" 
            ? "Unlock Your Potential Through Knowledge" 
            : "அறிவு மூலம் உங்கள் திறனை திறக்கவும்"}
        </h1>
        <p className="hero-subtitle">
          {language === "English"
            ? "Embark on a journey of discovery and challenge your mind!"
            : "கண்டுபிடிப்பின் பயணத்தை மேற்கொண்டு உங்கள் மனத்தை சவால் செய்யுங்கள்!"}
        </p>
      </div>
      
      <div className="content-wrapper">
        <div className="level-container">
          <div className="section-title">
            <h2>
              {language === "English" ? "Select Difficulty Level" : "சிரம நிலையைத் தேர்ந்தெடுக்கவும்"}
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
              {language === "English" ? "Explore More Adventures" : "மேலும் சாகசங்களை ஆராயுங்கள்"}
            </h2>
          </div>
          <div className="adventure-grid">
            <button onClick={() => setActivePage("riddles")} className="adventure-card riddles">
              <div className="card-icon">🤔</div>
              <span>{language === "English" ? "Riddles" : "புதிர்கள்"}</span>
            </button>
            <button onClick={() => setActivePage("dailyScience")} className="adventure-card daily-science">
              <div className="card-icon">🎡</div>
              <span>{language === "English" ? "Spin Wheel" : "சுழலும் சக்கரம்"}</span>
            </button>
            <button onClick={() => setActivePage("funFacts")} className="adventure-card fun-facts">
              <div className="card-icon">💡</div>
              <span>{language === "English" ? "Fun Facts" : "சுவாரஸ்யங்கள்"}</span>
            </button>
            <button onClick={() => setActivePage("storyMenu")} className="adventure-card story-menu">
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