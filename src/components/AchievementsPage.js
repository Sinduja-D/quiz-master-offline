// src/components/AchievementsPage.jsx
import React from 'react';

const AchievementsPage = ({ language }) => {
  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'Achievements' : 'சாதனைகள்'}</h2>
      <ul>
        <li>🏆 {language === 'English' ? 'First Quiz Completed' : 'முதல் வினா முடிக்கப்பட்டது'}</li>
        <li>🔥 {language === 'English' ? '3 Correct Answers in a Row' : 'மூன்று தொடர்ச்சியான சரியான பதில்கள்'}</li>
        <li>💯 {language === 'English' ? '100 Points Earned' : '100 புள்ளிகள் பெற்றது'}</li>
      </ul>
    </div>
  );
};

export default AchievementsPage;