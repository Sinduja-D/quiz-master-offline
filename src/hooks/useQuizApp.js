// src/hooks/useQuizApp.js
import { useState, useEffect } from "react";
import { levels } from "../levels.js";

export const useQuizApp = (setActivePage, user, updateUser) => {
  // 🌍 UI + State
  const [language, setLanguage] = useState("English");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState([]);
  const [isQuizInProgress, setIsQuizInProgress] = useState(false); // Track quiz progress
  
  // 📊 Backend state
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 🌐 Backend URL from .env
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
  // 🌐 Fetch questions
  const fetchQuestions = async ({ difficulty, grade, subject, language, limit }) => {
    console.log("fetchQuestions called with:", { difficulty, grade, subject, language, limit });
    setLoading(true);
    setError(null);
    try {
      // Use the correct API endpoint
      const url = `${API_URL}/api/questions?difficulty=${difficulty}&grade=${grade}&subject=${subject}&language=${language}&limit=${limit}`;
      console.log("Fetching from URL:", url);
      const response = await fetch(url);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.message) {
        setError(data.message);
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
    if (isQuizInProgress) {
      alert(language === 'English' 
        ? "You are not allowed to change the language after starting the quiz" 
        : "வினா தொடங்கிய பிறகு மொழியை மாற்ற அனுமதியில்லை");
      return;
    }
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
    
    // Use the values directly without mapping
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
      setIsQuizInProgress(true); // Mark quiz as in progress
      setActivePage("quiz");
    } catch (err) {
      console.error("Error in handleStartQuiz:", err);
    }
  };
  
  const handleQuizComplete = (results) => {
    setIsQuizInProgress(false); // Mark quiz as completed
    setQuizResults(results);
    
    // Calculate points earned
    const pointsEarned = results.correctAnswers * 10;
    
    // Create a new quiz history entry
    const newQuizHistory = {
      date: new Date().toLocaleDateString(),
      subject: quizSettings.subject,
      grade: quizSettings.grade,
      difficulty: quizSettings.level.id,
      correctAnswers: results.correctAnswers,
      totalQuestions: results.totalQuestions,
      score: Math.round((results.correctAnswers / results.totalQuestions) * 100),
      incorrectConcepts: results.incorrectConcepts || []
    };
    
    // Update user data
    const updatedUser = {
      ...user,
      totalPoints: user.totalPoints + pointsEarned,
      totalQuizzes: user.totalQuizzes + 1,
      averageScore: Math.round(
        (user.averageScore * user.totalQuizzes +
          (results.correctAnswers / results.totalQuestions) * 100) /
          (user.totalQuizzes + 1)
      ),
      quizHistory: [...user.quizHistory, newQuizHistory]
    };
    
    // Check for new achievements
    const newAchievements = [...user.achievements];
    const unlockedAchievements = [];
    
    // First quiz achievement
    if (user.totalQuizzes === 0) {
      newAchievements.push("first_quiz");
      unlockedAchievements.push("first_quiz");
    }
    
    // Perfect score achievement
    if (results.correctAnswers === results.totalQuestions) {
      newAchievements.push("perfect_score");
      unlockedAchievements.push("perfect_score");
    }
    
    // 3 correct in a row achievement
    if (results.consecutiveCorrect >= 3) {
      newAchievements.push("streak_3");
      unlockedAchievements.push("streak_3");
    }
    
    // 100 points achievement
    if (updatedUser.totalPoints >= 100 && !user.achievements.includes("100_points")) {
      newAchievements.push("100_points");
      unlockedAchievements.push("100_points");
    }
    
    // 500 points achievement
    if (updatedUser.totalPoints >= 500 && !user.achievements.includes("500_points")) {
      newAchievements.push("500_points");
      unlockedAchievements.push("500_points");
    }
    
    // Quiz master achievement (10 quizzes with 80%+ average)
    if (updatedUser.totalQuizzes >= 10 && updatedUser.averageScore >= 80 && !user.achievements.includes("quiz_master")) {
      newAchievements.push("quiz_master");
      unlockedAchievements.push("quiz_master");
    }
    
    // Update achievements if there are new ones
    if (newAchievements.length > user.achievements.length) {
      updatedUser.achievements = newAchievements;
      setNewlyUnlockedAchievements(unlockedAchievements);
    }
    
    // Update user in state and localStorage
    updateUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update users list in localStorage
    const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('quizAppUsers', JSON.stringify(users));
    }
    
    setActivePage("quizresults");
  };
  
  const handleRestartQuiz = () => setActivePage("quizsetup");
  
  const handleBackToHome = () => {
    setIsQuizInProgress(false); // Reset quiz progress when going home
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
    isQuizInProgress, // Expose this state
  };
};