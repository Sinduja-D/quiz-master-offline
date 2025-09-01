// src/components/AchievementsPage.jsx
import React from 'react';
import './AchievementsPage.css';

const AchievementsPage = ({ language, user }) => {
  // Define the order of achievements
  const achievementOrder = [
    "first_quiz", 
    "perfect_score", 
    "streak_3", 
    "streak_5", 
    "streak_10",
    "100_points",
    "500_points",
    "1000_points",
    "quiz_master",
    "subject_expert",
    "speed_demon",
    "no_hints",
    "early_bird",
    "night_owl",
    "weekly_warrior",
    "monthly_champion"
  ];

  const achievements = [
    // Quiz Completion Achievements
    { id: 'first_quiz', icon: '🏆', title: { en: 'First Quiz Completed', ta: 'முதல் வினா முடிக்கப்பட்டது' }, category: 'completion' },
    { id: 'perfect_score', icon: '💯', title: { en: 'Perfect Score', ta: 'முழு மதிப்பெண்' }, category: 'performance' },
    
    // Streak Achievements
    { id: 'streak_3', icon: '🔥', title: { en: '3 Correct in a Row', ta: 'மூன்று தொடர்ச்சியான சரியான பதில்கள்' }, category: 'streak' },
    { id: 'streak_5', icon: '🌟', title: { en: '5 Correct in a Row', ta: 'ஐந்து தொடர்ச்சியான சரியான பதில்கள்' }, category: 'streak' },
    { id: 'streak_10', icon: '💫', title: { en: '10 Correct in a Row', ta: 'பத்து தொடர்ச்சியான சரியான பதில்கள்' }, category: 'streak' },
    
    // Points Achievements
    { id: '100_points', icon: '⭐', title: { en: '100 Points Earned', ta: '100 புள்ளிகள் பெற்றது' }, category: 'points' },
    { id: '500_points', icon: '🌟', title: { en: '500 Points Earned', ta: '500 புள்ளிகள் பெற்றது' }, category: 'points' },
    { id: '1000_points', icon: '🌠', title: { en: '1000 Points Earned', ta: '1000 புள்ளிகள் பெற்றது' }, category: 'points' },
    
    // Mastery Achievements
    { id: 'quiz_master', icon: '👑', title: { en: 'Quiz Master', ta: 'வினா மாஸ்டர்' }, category: 'mastery' },
    { id: 'subject_expert', icon: '🎓', title: { en: 'Subject Expert', ta: 'பாடத்துறை நிபுணர்' }, category: 'mastery' },
    { id: 'speed_demon', icon: '⚡', title: { en: 'Speed Demon', ta: 'வேக சாதனை' }, category: 'mastery' },
    
    // Consistency Achievements
    { id: 'weekly_warrior', icon: '🗓️', title: { en: 'Weekly Warrior', ta: 'வாராந்திர வீரர்' }, category: 'consistency' },
    { id: 'monthly_champion', icon: '🏅', title: { en: 'Monthly Champion', ta: 'மாதாந்திர சாம்பியன்' }, category: 'consistency' },
    
    // Special Achievements
    { id: 'no_hints', icon: '🤫', title: { en: 'No Hints Used', ta: 'குறிப்பு இல்லாமல்' }, category: 'special' },
    { id: 'early_bird', icon: '🐦', title: { en: 'Early Bird', ta: 'காலை நேர வெற்றி' }, category: 'special' },
    { id: 'night_owl', icon: '🦉', title: { en: 'Night Owl', ta: 'இரவு நேர வெற்றி' }, category: 'special' },
  ];

  // Group achievements by category
  const achievementCategories = [
    { id: 'completion', title: { en: 'Completion', ta: 'முடித்தல்' } },
    { id: 'performance', title: { en: 'Performance', ta: 'செயல்திறன்' } },
    { id: 'streak', title: { en: 'Streaks', ta: 'தொடர்ச்சிகள்' } },
    { id: 'points', title: { en: 'Points', ta: 'புள்ளிகள்' } },
    { id: 'mastery', title: { en: 'Mastery', ta: 'தேர்ச்சி' } },
    { id: 'consistency', title: { en: 'Consistency', ta: 'ஒழுங்கு' } },
    { id: 'special', title: { en: 'Special', ta: 'சிறப்பு' } },
  ];

  return (
    <div className="page-content achievements-page">
      <h2>{language === 'English' ? 'Achievements' : 'சாதனைகள்'}</h2>
      
      <div className="achievements-intro">
        <p>{language === 'English' 
          ? 'Complete challenges to earn achievements and showcase your quiz mastery!' 
          : 'சாதனைகளைப் பெறுவதற்கும் உங்கள் வினா திறமையைக் காட்டுவதற்கும் சவால்களை முடிக்கவும்!'}</p>
      </div>
      
      {achievementCategories.map(category => {
        const categoryAchievements = achievements.filter(a => a.category === category.id);
        
        return (
          <div key={category.id} className="achievement-category">
            <h3>{language === 'English' ? category.title.en : category.title.ta}</h3>
            <div className="achievements-grid">
              {categoryAchievements.map(achievement => {
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
          </div>
        );
      })}
      
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