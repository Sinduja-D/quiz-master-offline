import { useState, useEffect } from "react";
import { levels } from "../levels.js";
import { fetchLocalQuestions } from '../data/localDataService';

// Updated achievements array with your requirements
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
    id: '15_quizzes', 
    icon: '📓', 
    title: { en: '15 Quizzes Completed', ta: '15 வினாக்கள் முடிந்தன' }, 
    description: { 
      en: 'Complete 15 quizzes', 
      ta: '15 வினாக்களை முடிக்கவும்' 
    }
  },
  { 
    id: '20_quizzes', 
    icon: '📔', 
    title: { en: '20 Quizzes Completed', ta: '20 வினாக்கள் முடிந்தன' }, 
    description: { 
      en: 'Complete 20 quizzes', 
      ta: '20 வினாக்களை முடிக்கவும்' 
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
    id: 'streak_20', 
    icon: '🌌', 
    title: { en: '20 Correct in a Row', ta: 'இருபது தொடர்ச்சியான சரியான பதில்கள்' }, 
    description: { 
      en: 'Answer 20 questions correctly in a row', 
      ta: 'தொடர்ச்சியாக 20 கேள்விகளுக்கு சரியான பதில் அளிக்கவும்' 
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
    id: 'streak_30', 
    icon: '🌌', 
    title: { en: '30 Correct in a Row', ta: 'முப்பது தொடர்ச்சியான சரியான பதில்கள்' }, 
    description: { 
      en: 'Answer 30 questions correctly in a row', 
      ta: 'தொடர்ச்சியாக 30 கேள்விகளுக்கு சரியான பதில் அளிக்கவும்' 
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
    id: '200_points', 
    icon: '🌟', 
    title: { en: '200 Points Earned', ta: '200 புள்ளிகள் பெற்றது' }, 
    description: { 
      en: 'Accumulate 200 points in total', 
      ta: 'மொத்தமாக 200 புள்ளிகளைச் சேர்க்கவும்' 
    }
  },
  { 
    id: '500_points', 
    icon: '🌠', 
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
 
  
  // Special Achievements
  { 
    id: 'no_hints', 
    icon: '🤫', 
    title: { en: 'No Hints Used', ta: 'குறிப்பு இல்லாமல்' }, 
    description: { 
      en: 'Complete any quiz without using hints', 
      ta: 'குறிப்புகளைப் பயன்படுத்தாமல் எந்த வினாவையும் முடிக்கவும்' 
    }
  }
];

export const useQuizApp = (setActivePage, user, updateUser, setIsQuizInProgress) => {
  // 🌍 UI + State
  const [language, setLanguage] = useState("English");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState([]);
  const [isQuizInProgress, setIsQuizInProgressLocal] = useState(false);
  const [achievementNotification, setAchievementNotification] = useState(null);
  
  // 📊 Backend state
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 🌐 Fetch questions from local JSON
  const fetchQuestions = async ({ difficulty, grade, subject, language, limit }) => {
    console.log("fetchQuestions called with:", { difficulty, grade, subject, language, limit });
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLocalQuestions({ difficulty, grade, subject, language, limit });
      
      if (data.length === 0) {
        setError(`No questions found for ${subject} Grade ${grade} (${difficulty} level)`);
        setQuestions([]);
      } else {
        setQuestions(data);
        console.log("Questions loaded:", data.length);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // 🌍 Handlers
  const toggleLanguage = () => {
    setLanguage(language === "English" ? "Tamil" : "English");
  };
    
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setQuizSettings({
      language,
      level,
      numberOfQuestions: 10,
    });
    sessionStorage.setItem("selectedDifficulty", level.id);
  };
  
  const handleStartQuiz = async (numberOfQuestions, subject, grade, difficulty) => {
    console.log("handleStartQuiz called with:", {
      numberOfQuestions,
      subject,
      grade,
      difficulty,
    });
    
    const settings = { ...quizSettings, numberOfQuestions, subject, grade, difficulty };
    setQuizSettings(settings);
    
    const fetchParams = {
      difficulty,
      grade,
      subject,
      language,
      limit: numberOfQuestions,
    };
    
    console.log("Fetching questions with params:", fetchParams);
    
    try {
      await fetchQuestions(fetchParams);
      setIsQuizInProgressLocal(true);
      setIsQuizInProgress(true);
      setActivePage("quiz");
    } catch (err) {
      console.error("Error in handleStartQuiz:", err);
    }
  };
  
  // Function to show achievement notification
  const showAchievementNotification = (achievementId, achievementTitle) => {
    setAchievementNotification({
      id: achievementId,
      title: achievementTitle
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setAchievementNotification(null);
    }, 5000);
  };
  
  const handleQuizComplete = (results) => {
    setIsQuizInProgressLocal(false);
    setIsQuizInProgress(false);
    setQuizResults(results);
    
    // Calculate points earned
    const pointsEarned = results.correctAnswers * 10;
    
    // Calculate time taken in seconds
    const timeTaken = Math.floor((new Date(results.endTime) - new Date(results.startTime)) / 1000);
    
    // Create a new quiz history entry
    const newQuizHistory = {
      date: new Date().toLocaleDateString(),
      subject: quizSettings.subject,
      grade: quizSettings.grade,
      difficulty: quizSettings.level.id,
      correctAnswers: results.correctAnswers,
      totalQuestions: results.totalQuestions,
      score: Math.round((results.correctAnswers / results.totalQuestions) * 100),
      incorrectConcepts: results.incorrectConcepts || [],
      hintsUsed: results.hintsUsed || 0,
      timeTaken: timeTaken,
      startTime: results.startTime,
      endTime: results.endTime
    };
    
    // Update user data
    const updatedUser = {
      ...user,
      schoolName: user.schoolName || '',
      totalPoints: user.totalPoints + pointsEarned,
      totalQuizzes: user.totalQuizzes + 1,
      averageScore: Math.round(
        (user.averageScore * user.totalQuizzes +
          (results.correctAnswers / results.totalQuestions) * 100) /
          (user.totalQuizzes + 1)
      ),
      quizHistory: [...user.quizHistory, newQuizHistory]
    };
    
    // Initialize achievementDates if it doesn't exist
    if (!updatedUser.achievementDates) {
      updatedUser.achievementDates = {};
    }
    
    // Check for new achievements
    const newAchievements = [...user.achievements];
    const unlockedAchievements = [];
    
    // Helper function to unlock achievement
    const unlockAchievement = (achievementId) => {
      if (!newAchievements.includes(achievementId)) {
        newAchievements.push(achievementId);
        unlockedAchievements.push(achievementId);
        if (!updatedUser.achievementDates[achievementId]) {
          updatedUser.achievementDates[achievementId] = new Date().toISOString();
        }
        
        // Get achievement title for notification
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
          const title = language === 'English' ? achievement.title.en : achievement.title.ta;
          showAchievementNotification(achievementId, title);
        }
      }
    };
    
    // First quiz achievement
    if (user.totalQuizzes === 0) {
      unlockAchievement("first_quiz");
    }
    
    // Perfect score achievement
    if (results.correctAnswers === results.totalQuestions) {
      unlockAchievement("perfect_score");
    }
    
    // Quiz count achievements
    const newTotalQuizzes = user.totalQuizzes + 1;
    if (newTotalQuizzes >= 5) unlockAchievement("5_quizzes");
    if (newTotalQuizzes >= 10) unlockAchievement("10_quizzes");
    if (newTotalQuizzes >= 15) unlockAchievement("15_quizzes");
    if (newTotalQuizzes >= 20) unlockAchievement("20_quizzes");
    
    // Points achievements
    const newTotalPoints = user.totalPoints + pointsEarned;
    if (newTotalPoints >= 100) unlockAchievement("100_points");
    if (newTotalPoints >= 200) unlockAchievement("200_points");
    if (newTotalPoints >= 500) unlockAchievement("500_points");
    if (newTotalPoints >= 1000) unlockAchievement("1000_points");
    
    // Streak achievements (using maxStreak from results)
    if (results.maxStreak) {
      if (results.maxStreak >= 3) unlockAchievement("streak_3");
      if (results.maxStreak >= 5) unlockAchievement("streak_5");
      if (results.maxStreak >= 10) unlockAchievement("streak_10");
      if (results.maxStreak >= 15) unlockAchievement("streak_15");
      if (results.maxStreak >= 20) unlockAchievement("streak_20");
      if (results.maxStreak >= 25) unlockAchievement("streak_25");
      if (results.maxStreak >= 30) unlockAchievement("streak_30");
    }
    
    // Quiz Master achievement
    if (newTotalQuizzes >= 10) {
      const allScores = [...user.quizHistory, newQuizHistory].map(q => q.score);
      const averageScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;
      //if (averageScore >= 80) unlockAchievement("quiz_master");
    }
    
    // Subject Expert achievement
    const subjectQuizzes = [...user.quizHistory, newQuizHistory]
      .filter(q => q.subject === quizSettings.subject);
    if (subjectQuizzes.length >= 5) {
      const subjectScores = subjectQuizzes.map(q => q.score);
      const subjectAverage = subjectScores.reduce((a, b) => a + b, 0) / subjectScores.length;
      //if (subjectAverage >= 90) unlockAchievement("subject_expert");
    }
    
    // Speed Demon achievement
    if (results.allottedTime && results.timeTaken) {
      if (results.timeTaken < results.allottedTime / 2) {
        //unlockAchievement("speed_demon");
      }
    }
    
    // No Hints Used achievement
    if (results.hintsUsed === 0) {
      unlockAchievement("no_hints");
    }
    
    // Early Bird achievement
    const completionHour = new Date().getHours();
    if (completionHour >= 5 && completionHour < 9) {
      //unlockAchievement("early_bird");
    }
    
    // Update achievements if there are new ones
    if (unlockedAchievements.length > 0) {
      updatedUser.achievements = newAchievements;
      setNewlyUnlockedAchievements(unlockedAchievements);
    }
    
    // Debug logging
    console.log("Achievement check results:", {
      newTotalQuizzes,
      newTotalPoints,
      maxStreak: results.maxStreak,
      hintsUsed: results.hintsUsed,
      completionHour,
      timeTaken: results.timeTaken,
      allottedTime: results.allottedTime,
      speedDemon: results.timeTaken < results.allottedTime / 2,
      unlockedAchievements
    });
    
    // Update user in state and localStorage
    updateUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update users list in localStorage
    const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        ...updatedUser,
        schoolName: user.schoolName || users[userIndex].schoolName || ''
      };
      localStorage.setItem('quizAppUsers', JSON.stringify(users));
    }
    
    setActivePage("quizresults");
  };
  
  const handleRestartQuiz = () => setActivePage("quizsetup");
  
  const handleBackToHome = () => {
    setIsQuizInProgressLocal(false);
    setIsQuizInProgress(false);
    setActivePage("home");
    setSelectedLevel(null);
    setQuizResults(null);
    setQuestions([]);
  };
  
  // 📝 Page title
  useEffect(() => {
    document.title = language === "English" ? "Quiz Master" : "வினா மாஸ்டர்";
  }, [language]);
  
  return {
    language,
    selectedLevel,
    quizSettings,
    quizResults,
    levels,
    questions,
    loading,
    error,
    toggleLanguage,
    handleLevelSelect,
    handleStartQuiz,
    handleQuizComplete,
    handleRestartQuiz,
    handleBackToHome,
    newlyUnlockedAchievements,
    isQuizInProgress,
    achievementNotification,
  };
};