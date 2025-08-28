import React from 'react';

const LeaderboardPage = ({ language }) => {
  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'Leaderboard' : 'முன்னணி பட்டியல்'}</h2>
      <ol>
        <li>👑 User1 – 2500 pts</li>
        <li>🥈 User2 – 2000 pts</li>
        <li>🥉 User3 – 1800 pts</li>
      </ol>
    </div>
  );
};

export default LeaderboardPage;