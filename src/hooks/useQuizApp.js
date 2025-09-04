// src/hooks/useQuizApp.js
import { useState, useEffect } from "react";
import { levels } from "../levels.js";
import { fetchLocalQuestions } from '../data/localDataService';

export const useQuizApp = (setActivePage, user, updateUser) => {
  // 🌍 UI + State
  const [language, setLanguage] = useState("English");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState([]);
  const [isQuizInProgress, setIsQuizInProgress] = useState(false);
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
    
    // Quiz count achievements
    if (updatedUser.totalQuizzes >= 5 && !user.achievements.includes("5_quizzes")) {
      newAchievements.push("5_quizzes");
      unlockedAchievements.push("5_quizzes");
      if (!updatedUser.achievementDates["5_quizzes"]) {
        updatedUser.achievementDates["5_quizzes"] = new Date().toISOString();
      }
      showAchievementNotification("5_quizzes", "5 Quizzes Completed");
    }
    
    if (updatedUser.totalQuizzes >= 10 && !user.achievements.includes("10_quizzes")) {
      newAchievements.push("10_quizzes");
      unlockedAchievements.push("10_quizzes");
      if (!updatedUser.achievementDates["10_quizzes"]) {
        updatedUser.achievementDates["10_quizzes"] = new Date().toISOString();
      }
      showAchievementNotification("10_quizzes", "10 Quizzes Completed");
    }
    
    if (updatedUser.totalQuizzes >= 25 && !user.achievements.includes("25_quizzes")) {
      newAchievements.push("25_quizzes");
      unlockedAchievements.push("25_quizzes");
      if (!updatedUser.achievementDates["25_quizzes"]) {
        updatedUser.achievementDates["25_quizzes"] = new Date().toISOString();
      }
      showAchievementNotification("25_quizzes", "25 Quizzes Completed");
    }
    
    if (updatedUser.totalQuizzes >= 50 && !user.achievements.includes("50_quizzes")) {
      newAchievements.push("50_quizzes");
      unlockedAchievements.push("50_quizzes");
      if (!updatedUser.achievementDates["50_quizzes"]) {
        updatedUser.achievementDates["50_quizzes"] = new Date().toISOString();
      }
      showAchievementNotification("50_quizzes", "50 Quizzes Completed");
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
    
    // Streak achievements
    if (results.consecutiveCorrect >= 3 && !user.achievements.includes("streak_3")) {
      newAchievements.push("streak_3");
      unlockedAchievements.push("streak_3");
      if (!updatedUser.achievementDates.streak_3) {
        updatedUser.achievementDates.streak_3 = new Date().toISOString();
      }
      showAchievementNotification("streak_3", "3 Correct in a Row");
    }
    
    if (results.consecutiveCorrect >= 5 && !user.achievements.includes("streak_5")) {
      newAchievements.push("streak_5");
      unlockedAchievements.push("streak_5");
      if (!updatedUser.achievementDates.streak_5) {
        updatedUser.achievementDates.streak_5 = new Date().toISOString();
      }
      showAchievementNotification("streak_5", "5 Correct in a Row");
    }
    
    if (results.consecutiveCorrect >= 10 && !user.achievements.includes("streak_10")) {
      newAchievements.push("streak_10");
      unlockedAchievements.push("streak_10");
      if (!updatedUser.achievementDates.streak_10) {
        updatedUser.achievementDates.streak_10 = new Date().toISOString();
      }
      showAchievementNotification("streak_10", "10 Correct in a Row");
    }
    
    if (results.consecutiveCorrect >= 15 && !user.achievements.includes("streak_15")) {
      newAchievements.push("streak_15");
      unlockedAchievements.push("streak_15");
      if (!updatedUser.achievementDates.streak_15) {
        updatedUser.achievementDates.streak_15 = new Date().toISOString();
      }
      showAchievementNotification("streak_15", "15 Correct in a Row");
    }
    
    if (results.consecutiveCorrect >= 25 && !user.achievements.includes("streak_25")) {
      newAchievements.push("streak_25");
      unlockedAchievements.push("streak_25");
      if (!updatedUser.achievementDates.streak_25) {
        updatedUser.achievementDates.streak_25 = new Date().toISOString();
      }
      showAchievementNotification("streak_25", "25 Correct in a Row");
    }
    
    if (results.consecutiveCorrect >= 50 && !user.achievements.includes("streak_50")) {
      newAchievements.push("streak_50");
      unlockedAchievements.push("streak_50");
      if (!updatedUser.achievementDates.streak_50) {
        updatedUser.achievementDates.streak_50 = new Date().toISOString();
      }
      showAchievementNotification("streak_50", "50 Correct in a Row");
    }
    
    // Points achievements
    if (updatedUser.totalPoints >= 100 && !user.achievements.includes("100_points")) {
      newAchievements.push("100_points");
      unlockedAchievements.push("100_points");
      if (!updatedUser.achievementDates["100_points"]) {
        updatedUser.achievementDates["100_points"] = new Date().toISOString();
      }
      showAchievementNotification("100_points", "100 Points Earned");
    }
    
    if (updatedUser.totalPoints >= 500 && !user.achievements.includes("500_points")) {
      newAchievements.push("500_points");
      unlockedAchievements.push("500_points");
      if (!updatedUser.achievementDates["500_points"]) {
        updatedUser.achievementDates["500_points"] = new Date().toISOString();
      }
      showAchievementNotification("500_points", "500 Points Earned");
    }
    
    if (updatedUser.totalPoints >= 1000 && !user.achievements.includes("1000_points")) {
      newAchievements.push("1000_points");
      unlockedAchievements.push("1000_points");
      if (!updatedUser.achievementDates["1000_points"]) {
        updatedUser.achievementDates["1000_points"] = new Date().toISOString();
      }
      showAchievementNotification("1000_points", "1000 Points Earned");
    }
    
    // Quiz master achievement (10 quizzes with 80%+ average)
    if (updatedUser.totalQuizzes >= 10 && updatedUser.averageScore >= 80 && !user.achievements.includes("quiz_master")) {
      newAchievements.push("quiz_master");
      unlockedAchievements.push("quiz_master");
      if (!updatedUser.achievementDates.quiz_master) {
        updatedUser.achievementDates.quiz_master = new Date().toISOString();
      }
      showAchievementNotification("quiz_master", "Quiz Master");
    }
    
    // Subject expert achievement (5 quizzes in the same subject with 90%+ average)
    const subjectQuizzes = [...user.quizHistory, newQuizHistory].filter(q => q.subject === quizSettings.subject);
    if (subjectQuizzes.length >= 5) {
      const subjectAverage = Math.round(
        subjectQuizzes.reduce((sum, q) => sum + q.score, 0) / subjectQuizzes.length
      );
      if (subjectAverage >= 90 && !user.achievements.includes("subject_expert")) {
        newAchievements.push("subject_expert");
        unlockedAchievements.push("subject_expert");
        if (!updatedUser.achievementDates.subject_expert) {
          updatedUser.achievementDates.subject_expert = new Date().toISOString();
        }
        showAchievementNotification("subject_expert", "Subject Expert");
      }
    }
    
    // Speed demon achievement (completed quiz in less than half the allotted time)
    const allottedTime = results.totalQuestions * 30;
    if (timeTaken < allottedTime / 2 && !user.achievements.includes("speed_demon")) {
      newAchievements.push("speed_demon");
      unlockedAchievements.push("speed_demon");
      if (!updatedUser.achievementDates.speed_demon) {
        updatedUser.achievementDates.speed_demon = new Date().toISOString();
      }
      showAchievementNotification("speed_demon", "Speed Demon");
    }
    
    // No hints achievement
    if (results.hintsUsed === 0 && !user.achievements.includes("no_hints")) {
      newAchievements.push("no_hints");
      unlockedAchievements.push("no_hints");
      if (!updatedUser.achievementDates.no_hints) {
        updatedUser.achievementDates.no_hints = new Date().toISOString();
      }
      showAchievementNotification("no_hints", "No Hints Used");
    }
    
    // Early bird achievement (completed quiz between 5 AM and 9 AM)
    const hour = new Date(results.endTime).getHours();
    if (hour >= 5 && hour < 9 && !user.achievements.includes("early_bird")) {
      newAchievements.push("early_bird");
      unlockedAchievements.push("early_bird");
      if (!updatedUser.achievementDates.early_bird) {
        updatedUser.achievementDates.early_bird = new Date().toISOString();
      }
      showAchievementNotification("early_bird", "Early Bird");
    }
    
    // Night owl achievement (completed quiz between 10 PM and 2 AM)
    if ((hour >= 22 || hour < 2) && !user.achievements.includes("night_owl")) {
      newAchievements.push("night_owl");
      unlockedAchievements.push("night_owl");
      if (!updatedUser.achievementDates.night_owl) {
        updatedUser.achievementDates.night_owl = new Date().toISOString();
      }
      showAchievementNotification("night_owl", "Night Owl");
    }
    
    // Weekly warrior achievement (completed at least one quiz every day for a week)
    const last7Days = [...user.quizHistory, newQuizHistory]
      .filter(q => new Date(q.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .map(q => new Date(q.date).toLocaleDateString());
    
    const uniqueDays = [...new Set(last7Days)];
    if (uniqueDays.length >= 7 && !user.achievements.includes("weekly_warrior")) {
      newAchievements.push("weekly_warrior");
      unlockedAchievements.push("weekly_warrior");
      if (!updatedUser.achievementDates.weekly_warrior) {
        updatedUser.achievementDates.weekly_warrior = new Date().toISOString();
      }
      showAchievementNotification("weekly_warrior", "Weekly Warrior");
    }
    
    // Monthly champion achievement (completed at least one quiz every day for a month)
    const last30Days = [...user.quizHistory, newQuizHistory]
      .filter(q => new Date(q.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .map(q => new Date(q.date).toLocaleDateString());
    
    const uniqueDays30 = [...new Set(last30Days)];
    if (uniqueDays30.length >= 30 && !user.achievements.includes("monthly_champion")) {
      newAchievements.push("monthly_champion");
      unlockedAchievements.push("monthly_champion");
      if (!updatedUser.achievementDates.monthly_champion) {
        updatedUser.achievementDates.monthly_champion = new Date().toISOString();
      }
      showAchievementNotification("monthly_champion", "Monthly Champion");
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