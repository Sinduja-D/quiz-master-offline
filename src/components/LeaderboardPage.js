// src/components/LeaderboardPage.jsx
import React, { useState, useEffect } from 'react';
import './LeaderboardPage.css';

const LeaderboardPage = ({ language, currentUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('quizAppUsers');
    if (savedUsers) {
      // Parse and sort users by total points (descending)
      const parsedUsers = JSON.parse(savedUsers);
      const sortedUsers = [...parsedUsers].sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sortedUsers);
    }
    setLoading(false);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'rank-1';
      case 2: return 'rank-2';
      case 3: return 'rank-3';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-loading">
        <div className="loading-spinner"></div>
        <p>{language === 'English' ? 'Loading leaderboard...' : 'தலைவர் பட்டியல் ஏற்றப்படுகிறது...'}</p>
      </div>
    );
  }

  return (
    <div className="page-content leaderboard-page">
      <h2>{language === 'English' ? 'Leaderboard' : 'தலைவர் பட்டியல்'}</h2>
      
      <div className="leaderboard-intro">
        <p>{language === 'English' 
          ? 'Compete with others and climb to the top of the leaderboard!' 
          : 'மற்றவர்களுடன் போட்டியிட்டு தலைவர் பட்டியலின் மேல் ஏறுங்கள்!'}</p>
      </div>
      
      {users.length === 0 ? (
        <div className="leaderboard-empty">
          <p>{language === 'English' 
            ? 'No users yet. Be the first to take a quiz!' 
            : 'இதுவரை பயனர்கள் இல்லை. முதல் வினாவை எடுப்பவராக இருங்கள்!'}</p>
        </div>
      ) : (
        <div className="leaderboard-container">
          <div className="leaderboard-header">
            <div className="header-rank">{language === 'English' ? 'Rank' : 'தரவரிசை'}</div>
            <div className="header-user">{language === 'English' ? 'User' : 'பயனர்'}</div>
            <div className="header-points">{language === 'English' ? 'Points' : 'புள்ளிகள்'}</div>
            <div className="header-quizzes">{language === 'English' ? 'Quizzes' : 'வினாக்கள்'}</div>
            <div className="header-score">{language === 'English' ? 'Avg Score' : 'சராசரி மதிப்பெண்'}</div>
          </div>
          
          <div className="leaderboard-list">
            {users.map((user, index) => {
              const rank = index + 1;
              const isCurrentUser = currentUser && user.id === currentUser.id;
              
              return (
                <div 
                  key={user.id} 
                  className={`leaderboard-item ${isCurrentUser ? 'current-user' : ''} ${getRankClass(rank)}`}
                >
                  <div className="user-rank">
                    {getRankIcon(rank)}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    {isCurrentUser && (
                      <div className="current-user-badge">
                        {language === 'English' ? 'You' : 'நீங்கள்'}
                      </div>
                    )}
                  </div>
                  <div className="user-points">{user.totalPoints}</div>
                  <div className="user-quizzes">{user.totalQuizzes}</div>
                  <div className="user-score">{user.averageScore}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="leaderboard-footer">
        <p>{language === 'English' 
          ? 'Earn more points by taking quizzes and achieving high scores!' 
          : 'வினாக்களை எடுத்தும் அதிக மதிப்பெண்களை பெற்று அதிக புள்ளிகளை சம்பாதியுங்கள்!'}</p>
      </div>
    </div>
  );
};

export default LeaderboardPage;