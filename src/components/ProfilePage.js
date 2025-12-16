// ProfilePage.js
import React from 'react';
import './ProfilePage.css';

const ProfilePage = ({ language, user,setActivePage }) => {
  // Function to determine emoji based on user's achievements
  const getProfileEmoji = (user) => {
    const achievementCount = user.achievements ? user.achievements.length : 0;
    
    // Emoji sets based on achievement levels
    const beginnerEmojis = ['🐣', '🌱', '🐢', '🦋', '🐙', '🍄', '🐶', '🐱'];
    const intermediateEmojis = ['🦸', '🧙', '👩‍🚀', '👨‍🔬', '🧑‍🎨', '🦄', '🐲', '🦜'];
    const advancedEmojis = ['🏆', '👑', '🌟', '💎', '🔥', '🚀', '🧠', '🏅'];
    
    let emojiArray;
    if (achievementCount <= 2) {
      emojiArray = beginnerEmojis;
    } else if (achievementCount <= 5) {
      emojiArray = intermediateEmojis;
    } else {
      emojiArray = advancedEmojis;
    }
    
    // Generate consistent index based on username
    let index = 0;
    if (user.username) {
      for (let i = 0; i < user.username.length; i++) {
        index = (index + user.username.charCodeAt(i)) % emojiArray.length;
      }
    }
    
    return emojiArray[index];
  };

  return (
    <div className="page-content profile-page">
      <h2>{language === 'English' ? 'User Profile' : 'பயனர் சுயவிவரம்'}</h2>

      <div className="profile-header">
        <div className="profile-avatar">
          {getProfileEmoji(user)}
          <div className="avatar-badge">
            {user.achievements && user.achievements.length > 0 && (
              <span className="badge-count">{user.achievements.length}</span>
            )}
          </div>
        </div>
        <div className="profile-details">
          <h3>{user.username}</h3>
          <p className="profile-school">
            <span className="profile-label">
              {language === 'English' ? 'School:' : 'பள்ளி:'}
            </span>
            {user.schoolName ||
              (language === 'English' ? 'Not specified' : 'குறிப்பிடப்படவில்லை')}
          </p>
          <p className="profile-place">
            <span className="profile-label">
              {language === 'English' ? 'Member Place:' : 'உறுப்பினர் இடம்:'}
            </span>
            {user.memberPlace}
          </p>
          <p className="profile-member-since">
            <span className="profile-label">
              {language === 'English' ? 'Member Since:' : 'உறுப்பினர் முதல்:'}
            </span>
            {user.memberSince}
          </p>

        </div>
      </div>
       {user.quizHistory.length > 0 && (
<div style={{ textAlign: 'center', marginTop: '20px' }}>
<button
  className="view-certificate-btn"
  onClick={() => setActivePage("certificate")}
>
  🎓 View Certificate
</button>
</div>
)}

      <div className="profile-stats">
        <h3>{language === 'English' ? 'Quiz Statistics' : 'வினா புள்ளிவிவரங்கள்'}</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{user.totalPoints}</div>
            <div className="stat-label">
              {language === 'English' ? 'Total Points' : 'மொத்த புள்ளிகள்'}
            </div>
          </div>
         
          <div className="stat-item">
            <div className="stat-value">{user.totalQuizzes}</div>
            <div className="stat-label">
              {language === 'English' ? 'Quizzes Taken' : 'எடுத்த வினாக்கள்'}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.averageScore}%</div>
            <div className="stat-label">
              {language === 'English' ? 'Average Score' : 'சராசரி மதிப்பெண்'}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.achievements.length}</div>
            <div className="stat-label">
              {language === 'English' ? 'Achievements' : 'சாதனைகள்'}
            </div>
          </div>
        </div>
      </div>

      {user.quizHistory.length > 0 && (
        <>
          <div className="profile-history">
            <h3>{language === 'English' ? 'Recent Quiz History' : 'சமீபத்திய வினா வரலாறு'}</h3>
            <div className="history-list">
              {user.quizHistory.slice(-3).map((quiz, index) => (
                <div key={index} className="history-item">
                  <div className="history-info">
                    <h4>
                      {quiz.subject} - {quiz.grade}
                    </h4>
                    <p>{quiz.date}</p>
                  </div>
                  <div className="history-score">
                    <span className="score-value">
                      {Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100)}%
                    </span>
                    <span className="score-details">
                      {quiz.correctAnswers}/{quiz.totalQuestions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {user.quizHistory.length === 0 && (
        <div className="profile-empty">
          <p>
            {language === 'English'
              ? "You haven't taken any quizzes yet. Start a quiz to see your progress here!"
              : 'நீங்கள் இதுவரை எந்த வினாவும் எடுத்துக்கொள்ளவில்லை. உங்கள் முன்னேற்றத்தை இங்கே பார்க்க ஒரு வினாவைத் தொடங்கவும்!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;