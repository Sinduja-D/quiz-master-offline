// src/components/AchievementsPage.jsx
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './AchievementsPage.css';

const AchievementsPage = ({ language, user }) => {
  const achievements = [
    { id: 'first_quiz', icon: '🏆', title: { en: 'First Quiz Completed', ta: 'முதல் வினா முடிக்கப்பட்டது' } },
    { id: 'perfect_score', icon: '💯', title: { en: 'Perfect Score', ta: 'முழு மதிப்பெண்' } },
    { id: 'streak_3', icon: '🔥', title: { en: '3 Correct in a Row', ta: 'மூன்று தொடர்ச்சியான சரியான பதில்கள்' } },
    { id: '100_points', icon: '⭐', title: { en: '100 Points Earned', ta: '100 புள்ளிகள் பெற்றது' } },
    { id: '500_points', icon: '🌟', title: { en: '500 Points Earned', ta: '500 புள்ளிகள் பெற்றது' } },
    { id: 'quiz_master', icon: '👑', title: { en: 'Quiz Master', ta: 'வினா மாஸ்டர்' } },
  ];

  // Check for newly unlocked achievements and trigger confetti
  useEffect(() => {
    // This would normally come from props or state tracking new achievements
    // For now, we'll just check if the user has any achievements
    if (user.achievements.length > 0) {
      // Check if the perfect_score achievement was recently unlocked
      if (user.achievements.includes('perfect_score')) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347'],
          shapes: ['star'],
          gravity: 0.8,
          drift: 1,
        });
      }
    }
  }, [user.achievements]);

  return (
    <div className="page-content achievements-page">
      <h2>{language === 'English' ? 'Achievements' : 'சாதனைகள்'}</h2>
      
      <div className="achievements-intro">
        <p>{language === 'English' 
          ? 'Complete challenges to earn achievements and showcase your quiz mastery!' 
          : 'சாதனைகளைப் பெறுவதற்கும் உங்கள் வினா திறமையைக் காட்டுவதற்கும் சவால்களை முடிக்கவும்!'}</p>
      </div>
      
      <div className="achievements-grid">
        {achievements.map(achievement => {
          const isUnlocked = user.achievements.includes(achievement.id);
          
          return (
            <div 
              key={achievement.id} 
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-title">
                {language === 'English' 
                  ? achievement.title.en 
                  : achievement.title.ta}
              </div>
              <div className="achievement-status">
                {isUnlocked 
                  ? (language === 'English' ? 'Unlocked' : 'திறக்கப்பட்டது') 
                  : (language === 'English' ? 'Locked' : 'பூட்டப்பட்டுள்ளது')}
              </div>
            </div>
          );
        })}
      </div>
      
      {user.achievements.length === 0 && (
        <div className="achievements-empty">
          <p>{language === 'English' 
            ? 'You haven\'t unlocked any achievements yet. Start taking quizzes to earn them!' 
            : 'நீங்கள் இதுவரை எந்தச் சாதனையையும் திறக்கவில்லை. அவற்றைப் பெற வினாக்களை எடுக்கத் தொடங்கவும்!'}</p>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;