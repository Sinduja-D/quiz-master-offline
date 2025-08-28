// src/components/ProfilePage.jsx
import React from 'react';
import './ProfilePage.css';

const ProfilePage = ({ language, user }) => {
  // Calculate weak and strong fields based on quiz history
  const calculateFields = () => {
    const subjectScores = {};
    const subjectCounts = {};
    
    user.quizHistory.forEach(quiz => {
      if (!subjectScores[quiz.subject]) {
        subjectScores[quiz.subject] = 0;
        subjectCounts[quiz.subject] = 0;
      }
      
      subjectScores[quiz.subject] += (quiz.correctAnswers / quiz.totalQuestions) * 100;
      subjectCounts[quiz.subject] += 1;
    });
    
    const subjectAverages = {};
    Object.keys(subjectScores).forEach(subject => {
      subjectAverages[subject] = subjectScores[subject] / subjectCounts[subject];
    });
    
    const sortedSubjects = Object.keys(subjectAverages).sort((a, b) => 
      subjectAverages[b] - subjectAverages[a]
    );
    
    return {
      strongFields: sortedSubjects.slice(0, 2),
      weakFields: sortedSubjects.slice(-2).reverse()
    };
  };
  
  const { strongFields, weakFields } = user.quizHistory.length > 0 ? calculateFields() : { strongFields: [], weakFields: [] };
  
  return (
    <div className="page-content profile-page">
      <h2>{language === 'English' ? 'User Profile' : 'பயனர் சுயவிவரம்'}</h2>
      
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-details">
          <h3>{user.username}</h3>
          <p>{language === 'English' ? 'Member Since:' : 'உறுப்பினர் முதல்:'} {user.memberSince}</p>
        </div>
      </div>
      
      <div className="profile-stats">
        <h3>{language === 'English' ? 'Quiz Statistics' : 'வினா புள்ளிவிவரங்கள்'}</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{user.totalPoints}</div>
            <div className="stat-label">{language === 'English' ? 'Total Points' : 'மொத்த புள்ளிகள்'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.totalQuizzes}</div>
            <div className="stat-label">{language === 'English' ? 'Quizzes Taken' : 'எடுத்த வினாக்கள்'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.averageScore}%</div>
            <div className="stat-label">{language === 'English' ? 'Average Score' : 'சராசரி மதிப்பெண்'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.achievements.length}</div>
            <div className="stat-label">{language === 'English' ? 'Achievements' : 'சாதனைகள்'}</div>
          </div>
        </div>
      </div>
      
      {user.quizHistory.length > 0 && (
        <>
          <div className="profile-fields">
            <div className="field-section">
              <h3>{language === 'English' ? 'Strong Fields' : 'வலுவான துறைகள்'}</h3>
              <div className="field-tags">
                {strongFields.length > 0 ? (
                  strongFields.map((field, index) => (
                    <span key={index} className="field-tag strong">{field}</span>
                  ))
                ) : (
                  <p>{language === 'English' ? 'Take more quizzes to see your strong fields' : 'உங்கள் வலுவான துறைகளைக் காண மேலும் வினாக்கள் எடுக்கவும்'}</p>
                )}
              </div>
            </div>
            
            <div className="field-section">
              <h3>{language === 'English' ? 'Fields to Improve' : 'மேம்படுத்த வேண்டிய துறைகள்'}</h3>
              <div className="field-tags">
                {weakFields.length > 0 ? (
                  weakFields.map((field, index) => (
                    <span key={index} className="field-tag weak">{field}</span>
                  ))
                ) : (
                  <p>{language === 'English' ? 'Take more quizzes to see areas for improvement' : 'மேம்பாட்டுக்கான பகுதிகளைக் காண மேலும் வினாக்கள் எடுக்கவும்'}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="profile-history">
            <h3>{language === 'English' ? 'Recent Quiz History' : 'சமீபத்திய வினா வரலாறு'}</h3>
            <div className="history-list">
              {user.quizHistory.slice(-3).map((quiz, index) => (
                <div key={index} className="history-item">
                  <div className="history-info">
                    <h4>{quiz.subject} - {quiz.grade}</h4>
                    <p>{quiz.date}</p>
                  </div>
                  <div className="history-score">
                    <span className="score-value">{Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100)}%</span>
                    <span className="score-details">{quiz.correctAnswers}/{quiz.totalQuestions}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      {user.quizHistory.length === 0 && (
        <div className="profile-empty">
          <p>{language === 'English' 
            ? 'You haven\'t taken any quizzes yet. Start a quiz to see your progress here!' 
            : 'நீங்கள் இதுவரை எந்த வினாவும் எடுத்துக்கொள்ளவில்லை. உங்கள் முன்னேற்றத்தை இங்கே பார்க்க ஒரு வினாவைத் தொடங்கவும்!'}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;