import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './AchievementsPage.css';

const AchievementsPage = ({ language, user, newlyUnlockedAchievements = [] }) => {
  // Define the order of achievements
  const achievementOrder = [
    "first_quiz", 
    "perfect_score", 
    "streak_3", 
    "streak_5", 
    "streak_10",
    "streak_15",
    "streak_25",
    "streak_50",
    "5_quizzes",
    "10_quizzes",
    "25_quizzes",
    "50_quizzes",
    "100_points",
    "500_points",
    "1000_points",
    "quiz_master",
    "subject_expert",
    "speed_demon",
    "no_hints",
    "early_bird"
  ];
  
  const achievements = [
    // Quiz Completion Achievements
    { 
      id: 'first_quiz', 
      icon: '🏆', 
      title: { en: 'First Quiz Completed', ta: 'முதல் வினா முடிக்கப்பட்டது' }, 
      description: { 
        en: 'Complete your first quiz', 
        ta: 'உங்களின் முதல் வினாவை முடிக்கவும்' 
      }
    },
    { 
      id: '5_quizzes', 
      icon: '📚', 
      title: { en: '5 Quizzes Completed', ta: '5 வினாக்கள் முடிந்தன' }, 
      description: { 
        en: 'Complete 5 quizzes', 
        ta: '5 வினாக்களை முடிக்கவும்' 
      }
    },
    { 
      id: '10_quizzes', 
      icon: '📖', 
      title: { en: '10 Quizzes Completed', ta: '10 வினாக்கள் முடிந்தன' }, 
      description: { 
        en: 'Complete 10 quizzes', 
        ta: '10 வினாக்களை முடிக்கவும்' 
      }
    },
    { 
      id: '25_quizzes', 
      icon: '📓', 
      title: { en: '25 Quizzes Completed', ta: '25 வினாக்கள் முடிந்தன' }, 
      description: { 
        en: 'Complete 25 quizzes', 
        ta: '25 வினாக்களை முடிக்கவும்' 
      }
    },
    { 
      id: '50_quizzes', 
      icon: '📔', 
      title: { en: '50 Quizzes Completed', ta: '50 வினாக்கள் முடிந்தன' }, 
      description: { 
        en: 'Complete 50 quizzes', 
        ta: '50 வினாக்களை முடிக்கவும்' 
      }
    },
    { 
      id: 'perfect_score', 
      icon: '💯', 
      title: { en: 'Perfect Score', ta: 'முழு மதிப்பெண்' }, 
      description: { 
        en: 'Get 100% on any quiz', 
        ta: 'எந்த வினாவிலும் 100% மதிப்பெண் பெறவும்' 
      }
    },
    
    // Streak Achievements
    { 
      id: 'streak_3', 
      icon: '🔥', 
      title: { en: '3 Correct in a Row', ta: 'மூன்று தொடர்ச்சியான சரியான பதில்கள்' }, 
      description: { 
        en: 'Answer 3 questions correctly in a row', 
        ta: 'தொடர்ச்சியாக 3 கேள்விகளுக்கு சரியான பதில் அளிக்கவும்' 
      }
    },
    { 
      id: 'streak_5', 
      icon: '🌟', 
      title: { en: '5 Correct in a Row', ta: 'ஐந்து தொடர்ச்சியான சரியான பதில்கள்' }, 
      description: { 
        en: 'Answer 5 questions correctly in a row', 
        ta: 'தொடர்ச்சியாக 5 கேள்விகளுக்கு சரியான பதில் அளிக்கவும்' 
      }
    },
    { 
      id: 'streak_10', 
      icon: '💫', 
      title: { en: '10 Correct in a Row', ta: 'பத்து தொடர்ச்சியான சரியான பதில்கள்' }, 
      description: { 
        en: 'Answer 10 questions correctly in a row', 
        ta: 'தொடர்ச்சியாக 10 கேள்விகளுக்கு சரியான பதில் அளிக்கவும்' 
      }
    },
    { 
      id: 'streak_15', 
      icon: '🌠', 
      title: { en: '15 Correct in a Row', ta: 'பதினைந்து தொடர்ச்சியான சரியான பதில்கள்' }, 
      description: { 
        en: 'Answer 15 questions correctly in a row', 
        ta: 'தொடர்ச்சியாக 15 கேள்விகளுக்கு சரியான பதில் அளிக்கவும்' 
      }
    },
    { 
      id: 'streak_25', 
      icon: '🌌', 
      title: { en: '25 Correct in a Row', ta: 'இருபத்தைந்து தொடர்ச்சியான சரியான பதில்கள்' }, 
      description: { 
        en: 'Answer 25 questions correctly in a row', 
        ta: 'தொடர்ச்சியாக 25 கேள்விகளுக்கு சரியான பதில் அளிக்கவும்' 
      }
    },
    { 
      id: 'streak_50', 
      icon: '🌌', 
      title: { en: '50 Correct in a Row', ta: 'ஐம்பது தொடர்ச்சியான சரியான பதில்கள்' }, 
      description: { 
        en: 'Answer 50 questions correctly in a row', 
        ta: 'தொடர்ச்சியாக 50 கேள்விகளுக்கு சரியான பதில் அளிக்கவும்' 
      }
    },
    
    // Points Achievements
    { 
      id: '100_points', 
      icon: '⭐', 
      title: { en: '100 Points Earned', ta: '100 புள்ளிகள் பெற்றது' }, 
      description: { 
        en: 'Accumulate 100 points in total', 
        ta: 'மொத்தமாக 100 புள்ளிகளைச் சேர்க்கவும்' 
      }
    },
    { 
      id: '500_points', 
      icon: '🌟', 
      title: { en: '500 Points Earned', ta: '500 புள்ளிகள் பெற்றது' }, 
      description: { 
        en: 'Accumulate 500 points in total', 
        ta: 'மொத்தமாக 500 புள்ளிகளைச் சேர்க்கவும்' 
      }
    },
    { 
      id: '1000_points', 
      icon: '🌠', 
      title: { en: '1000 Points Earned', ta: '1000 புள்ளிகள் பெற்றது' }, 
      description: { 
        en: 'Accumulate 1000 points in total', 
        ta: 'மொத்தமாக 1000 புள்ளிகளைச் சேர்க்கவும்' 
      }
    },
    
    // Mastery Achievements
    { 
      id: 'quiz_master', 
      icon: '👑', 
      title: { en: 'Quiz Master', ta: 'வினா மாஸ்டர்' }, 
      description: { 
        en: 'Complete 10 quizzes with an average score of 80% or higher', 
        ta: '80% அல்லது அதற்கு மேற்பட்ட சராசரி மதிப்பெண்ணுடன் 10 வினாக்களை முடிக்கவும்' 
      }
    },
    { 
      id: 'subject_expert', 
      icon: '🎓', 
      title: { en: 'Subject Expert', ta: 'பாடத்துறை நிபுணர்' }, 
      description: { 
        en: 'Complete 5 quizzes in the same subject with an average score of 90% or higher', 
        ta: '90% அல்லது அதற்கு மேற்பட்ட சராசரி மதிப்பெண்ணுடன் ஒரே பாடத்தில் 5 வினாக்களை முடிக்கவும்' 
      }
    },
    { 
      id: 'speed_demon', 
      icon: '⚡', 
      title: { en: 'Speed Demon', ta: 'வேக சாதனை' }, 
      description: { 
        en: 'Complete any quiz in less than half the allotted time', 
        ta: 'ஒதுக்கப்பட்ட நேரத்தில் பாதியில் எந்த வினாவையும் முடிக்கவும்' 
      }
    },
    
    // Special Achievements
    { 
      id: 'no_hints', 
      icon: '🤫', 
      title: { en: 'No Hints Used', ta: 'குறிப்பு இல்லாமல்' }, 
      description: { 
        en: 'Complete any quiz without using hints', 
        ta: 'குறிப்புகளைப் பயன்படுத்தாமல் எந்த வினாவையும் முடிக்கவும்' 
      }
    },
    { 
      id: 'early_bird', 
      icon: '🐦', 
      title: { en: 'Early Bird', ta: 'காலை நேர வெற்றி' }, 
      description: { 
        en: 'Complete a quiz between 5 AM and 9 AM', 
        ta: 'காலை 5 மணி முதல் 9 மணி வரை ஒரு வினாவை முடிக்கவும்' 
      }
    }
  ];
  
  // Create refs for each achievement card
  const achievementRefs = useRef({});
  
  // State to track if confetti has been triggered for newly unlocked achievements
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  
  // Function to trigger confetti for a specific achievement card
  const triggerConfettiForAchievement = (achievementId) => {
    const achievementCard = achievementRefs.current[achievementId];
    if (achievementCard) {
      // Get the position of the achievement card
      const rect = achievementCard.getBoundingClientRect();
      
      // Calculate origin position (center of the card)
      const origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      };
      
      // Different confetti styles for different achievements
      let confettiConfig = {
        particleCount: 150,
        spread: 70,
        origin: origin,
        colors: ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347'],
        shapes: ['star'],
        gravity: 0.8,
        drift: 1,
      };
      
      // Special effects for specific achievements
      if (achievementId === 'perfect_score') {
        confettiConfig = {
          ...confettiConfig,
          particleCount: 200,
          spread: 90,
          colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
          shapes: ['circle', 'star'],
        };
      } else if (achievementId.startsWith('streak_')) {
        const streakCount = parseInt(achievementId.split('_')[1]);
        confettiConfig = {
          ...confettiConfig,
          particleCount: streakCount * 50,
          spread: 70 + streakCount * 5,
          colors: ['#FF4500', '#FF8C00', '#FFA500'],
          shapes: ['star'],
        };
      } else if (achievementId === 'quiz_master') {
        confettiConfig = {
          ...confettiConfig,
          particleCount: 300,
          spread: 100,
          colors: ['#9370DB', '#4B0082', '#8A2BE2', '#9932CC', '#BA55D3'],
          shapes: ['circle', 'star', 'square'],
        };
      } else if (achievementId === 'subject_expert') {
        confettiConfig = {
          ...confettiConfig,
          particleCount: 250,
          spread: 90,
          colors: ['#1E90FF', '#00BFFF', '#87CEFA', '#4682B4', '#5F9EA0'],
          shapes: ['circle', 'star'],
        };
      } else if (achievementId === 'speed_demon') {
        confettiConfig = {
          ...confettiConfig,
          particleCount: 200,
          spread: 80,
          colors: ['#FF4500', '#FF6347', '#FF7F50', '#FFA500', '#FFD700'],
          shapes: ['star'],
          gravity: 1.2,
        };
      } else if (achievementId.includes('points')) {
        const points = achievementId.split('_')[0];
        confettiConfig = {
          ...confettiConfig,
          particleCount: points === '100' ? 150 : points === '500' ? 200 : 300,
          spread: points === '100' ? 70 : points === '500' ? 90 : 100,
          colors: ['#FFD700', '#FFA500', '#FF8C00'],
          shapes: ['star'],
        };
      } else if (achievementId === 'no_hints') {
        confettiConfig = {
          ...confettiConfig,
          particleCount: 180,
          spread: 75,
          colors: ['#4169E1', '#1E90FF', '#00BFFF', '#87CEFA', '#4682B4'],
          shapes: ['circle', 'star'],
        };
      } else if (achievementId === 'early_bird') {
        confettiConfig = {
          ...confettiConfig,
          particleCount: 200,
          spread: 85,
          colors: ['#FFD700', '#FFA500', '#FF8C00', '#FFFF00', '#F0E68C'],
          shapes: ['circle', 'star'],
        };
      }
      
      confetti(confettiConfig);
    }
  };
  
  // Trigger confetti for newly unlocked achievements when component mounts
  useEffect(() => {
    // Only trigger confetti if there are newly unlocked achievements and confetti hasn't been triggered yet
    if (newlyUnlockedAchievements.length > 0 && !confettiTriggered) {
      // Sort achievements in the predefined order
      const sortedAchievements = [...newlyUnlockedAchievements].sort((a, b) => {
        return achievementOrder.indexOf(a) - achievementOrder.indexOf(b);
      });
      
      // Trigger confetti for each newly unlocked achievement
      sortedAchievements.forEach((achievementId, index) => {
        setTimeout(() => {
          triggerConfettiForAchievement(achievementId);
        }, index * 800); // 800ms delay between each achievement
      });
      
      // Mark confetti as triggered so it doesn't happen again
      setConfettiTriggered(true);
      
      // Store in localStorage that confetti has been triggered for these achievements
      const triggeredAchievements = JSON.parse(localStorage.getItem('triggeredAchievements') || '[]');
      const updatedTriggeredAchievements = [...new Set([...triggeredAchievements, ...newlyUnlockedAchievements])];
      localStorage.setItem('triggeredAchievements', JSON.stringify(updatedTriggeredAchievements));
    }
  }, [newlyUnlockedAchievements, confettiTriggered]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      language === 'English' ? 'en-US' : 'ta-IN',
      { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }
    );
  };
  
  // Check if achievement is newly unlocked
  const isNewlyUnlocked = (achievementId) => {
    return newlyUnlockedAchievements.includes(achievementId);
  };
  
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
          const isNew = isNewlyUnlocked(achievement.id);
          
          return (
            <div 
              key={achievement.id}
              id={`achievement-${achievement.id}`}
              ref={el => achievementRefs.current[achievement.id] = el}
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'} ${isNew ? 'newly-unlocked' : ''}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-title">
                {language === 'English' 
                  ? achievement.title.en 
                  : achievement.title.ta}
              </div>
              <div className="achievement-description">
                {language === 'English' 
                  ? achievement.description.en 
                  : achievement.description.ta}
              </div>
              <div className="achievement-status">
                {isUnlocked ? (
                  <>
                    <span className="unlocked-text">
                      {language === 'English' ? 'Unlocked' : 'திறக்கப்பட்டது'}
                    </span>
                    {user.achievementDates && user.achievementDates[achievement.id] && (
                      <span className="unlock-date">
                        {formatDate(user.achievementDates[achievement.id])}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="locked-text">
                    {language === 'English' ? 'Locked' : 'பூட்டப்பட்டுள்ளது'}
                  </span>
                )}
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