import { useState, useEffect } from "react";
import { levels } from "../levels.js";
import { fetchLocalQuestions } from '../data/localDataService';

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
    // Always allow language change
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
    
    // Update user data - ensure schoolName is preserved
    const updatedUser = {
      ...user,
      schoolName: user.schoolName || '', // Ensure schoolName is preserved
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
    
    // First quiz achievement
    if (user.totalQuizzes === 0) {
      newAchievements.push("first_quiz");
      unlockedAchievements.push("first_quiz");
      if (!updatedUser.achievementDates.first_quiz) {
        updatedUser.achievementDates.first_quiz = new Date().toISOString();
      }
      showAchievementNotification("first_quiz", "First Quiz Completed");
    }
    
    // Perfect score achievement
    if (results.correctAnswers === results.totalQuestions) {
      newAchievements.push("perfect_score");
      unlockedAchievements.push("perfect_score");
      if (!updatedUser.achievementDates.perfect_score) {
        updatedUser.achievementDates.perfect_score = new Date().toISOString();
      }
      showAchievementNotification("perfect_score", "Perfect Score");
    }
    
    // Update achievements if there are new ones
    if (newAchievements.length > user.achievements.length) {
      updatedUser.achievements = newAchievements;
      setNewlyUnlockedAchievements(unlockedAchievements);
    }
    
    // Update user in state and localStorage
    updateUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update users list in localStorage - ensure schoolName is preserved
    const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      // Preserve schoolName when updating user
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