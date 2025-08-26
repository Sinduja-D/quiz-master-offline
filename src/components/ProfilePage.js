// src/components/ProfilePage.jsx
import React from 'react';

const ProfilePage = ({ language, userProfile }) => {
  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'User Profile' : 'பயனர் சுயவிவரம்'}</h2>
      <div className="profile-info">
        <div className="profile-avatar">👤</div>
        <div className="profile-details">
          <p><strong>{language === 'English' ? 'Username:' : 'பயனர்பெயர்:'}</strong> {userProfile.username}</p>
          <p><strong>{language === 'English' ? 'Member Since:' : 'உறுப்பினர் முதல்:'}</strong> {userProfile.memberSince}</p>
          <p><strong>{language === 'English' ? 'Total Points:' : 'மொத்த புள்ளிகள்:'}</strong> {userProfile.totalPoints}</p>
        </div>
      </div>
      <div className="profile-stats">
        <h3>{language === 'English' ? 'Quiz Statistics' : 'வினா புள்ளிவிவரங்கள்'}</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{userProfile.totalQuizzes}</div>
            <div className="stat-label">{language === 'English' ? 'Quizzes Taken' : 'எடுத்த வினாக்கள்'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{userProfile.averageScore}%</div>
            <div className="stat-label">{language === 'English' ? 'Average Score' : 'சராசரி மதிப்பெண்'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{userProfile.achievements}</div>
            <div className="stat-label">{language === 'English' ? 'Achievements' : 'சாதனைகள்'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;