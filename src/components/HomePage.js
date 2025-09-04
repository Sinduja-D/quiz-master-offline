// src/components/HomePage.jsx
import React from 'react';
import './HomePage.css';
import { levels } from '../levels.js';
import logo from '../assets/logo.png'; // 👈 Import your logo

const HomePage = ({ language, setActivePage, onLevelSelect }) => {
  const t = (eng, tam) => (language === "English" ? eng : tam);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">
          <img src={logo} alt="Quiz Master Logo" className="home-logo" />
          {language === "English" ? "Quiz Master" : "வினா மாஸ்டர்"}
        </h1>

        <p className="home-subtitle">
          {language === "English"
            ? "Test your knowledge with our interactive quizzes!"
            : "எங்களின் ஊடாடும் வினாத்திட்டங்களுடன் உங்கள் அறிவை சோதிக்கவும்!"}
        </p>
        
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
      </div>

      <div className="extra-features">
        <h2>
          {language === "English" ? "More Features" : "கூடுதல் அம்சங்கள்"}
        </h2>

        <div className="feature-buttons">
          <button onClick={() => setActivePage("riddles")} className="feature-btn">
            🤔 {language === "English" ? "Riddles" : "புதிர்கள்"}
          </button>

          <button onClick={() => setActivePage("funFacts")} className="feature-btn">
            💡 {language === "English" ? "Fun Facts" : "சுவாரஸ்யங்கள்"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
