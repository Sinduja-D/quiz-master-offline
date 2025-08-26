// src/components/HomePage.jsx
import React from 'react';

const HomePage = ({ language, levels, handleLevelSelect, setActivePage }) => {
  return (
    <>
      <div className="quiz-header">
        <h1>{language === 'English' ? 'Quiz Master' : 'வினா மாஸ்டர்'}</h1>
        <p>{language === 'English' ? 'Test your knowledge!' : 'உங்கள் அறிவை சோதிக்கவும்!'}</p>
      </div>
      
      <div className="level-selection">
        <h2>{language === 'English' ? 'Select Difficulty Level' : 'சிரம நிலையைத் தேர்ந்தெடுக்கவும்'}</h2>
        <div className="level-buttons">
          {levels.map((level) => (
            <button
              key={level.id}
              className="level-btn"
              style={{ backgroundColor: level.color }}
              onClick={() => handleLevelSelect(level)}
            >
              <span className="level-icon">{level.icon}</span>
              <span className="level-name">{level.name[language]}</span>
              <span className="level-grade">{level.grade[language]}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="extra-features">
        <h2>{language === 'English' ? 'More Features' : 'கூடுதல் அம்சங்கள்'}</h2>
        <div className="feature-buttons">
          <button onClick={() => setActivePage('achievements')} className="feature-btn">
            🏅 {language === 'English' ? 'Achievements' : 'சாதனைகள்'}
          </button>
          <button onClick={() => setActivePage('leaderboard')} className="feature-btn">
            📊 {language === 'English' ? 'Leaderboard' : 'முன்னணி பட்டியல்'}
          </button>
          <button onClick={() => setActivePage('funFacts')} className="feature-btn">
            💡 {language === 'English' ? 'Fun Facts' : 'சுவாரஸ்யங்கள்'}
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;