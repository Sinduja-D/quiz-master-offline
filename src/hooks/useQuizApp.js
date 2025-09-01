// src/hooks/useQuizApp.js
import { useState, useEffect } from "react";
import { levels } from "../levels.js";
import confetti from 'canvas-confetti';

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
    
    // Streak achievements
    if (results.consecutiveCorrect >= 3 && !user.achievements.includes("streak_3")) {
      newAchievements.push("streak_3");
      unlockedAchievements.push("streak_3");
    }
    if (results.consecutiveCorrect >= 5 && !user.achievements.includes("streak_5")) {
      newAchievements.push("streak_5");
      unlockedAchievements.push("streak_5");
    }
    if (results.consecutiveCorrect >= 10 && !user.achievements.includes("streak_10")) {
      newAchievements.push("streak_10");
      unlockedAchievements.push("streak_10");
    }
    
    // Points achievements
    if (updatedUser.totalPoints >= 100 && !user.achievements.includes("100_points")) {
      newAchievements.push("100_points");
      unlockedAchievements.push("100_points");
    }
    if (updatedUser.totalPoints >= 500 && !user.achievements.includes("500_points")) {
      newAchievements.push("500_points");
      unlockedAchievements.push("500_points");
    }
    if (updatedUser.totalPoints >= 1000 && !user.achievements.includes("1000_points")) {
      newAchievements.push("1000_points");
      unlockedAchievements.push("1000_points");
    }
    
    // Quiz master achievement (10 quizzes with 80%+ average)
    if (updatedUser.totalQuizzes >= 10 && updatedUser.averageScore >= 80 && !user.achievements.includes("quiz_master")) {
      newAchievements.push("quiz_master");
      unlockedAchievements.push("quiz_master");
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
      }
    }
    
    // Speed demon achievement (completed quiz in less than half the allotted time)
    // Assuming 30 seconds per question as allotted time
    const allottedTime = results.totalQuestions * 30;
    if (timeTaken < allottedTime / 2 && !user.achievements.includes("speed_demon")) {
      newAchievements.push("speed_demon");
      unlockedAchievements.push("speed_demon");
    }
    
    // No hints achievement
    if (results.hintsUsed === 0 && !user.achievements.includes("no_hints")) {
      newAchievements.push("no_hints");
      unlockedAchievements.push("no_hints");
    }
    
    // Early bird achievement (completed quiz between 5 AM and 9 AM)
    const hour = new Date(results.endTime).getHours();
    if (hour >= 5 && hour < 9 && !user.achievements.includes("early_bird")) {
      newAchievements.push("early_bird");
      unlockedAchievements.push("early_bird");
    }
    
    // Night owl achievement (completed quiz between 10 PM and 2 AM)
    if ((hour >= 22 || hour < 2) && !user.achievements.includes("night_owl")) {
      newAchievements.push("night_owl");
      unlockedAchievements.push("night_owl");
    }
    
    // Weekly warrior achievement (completed at least one quiz every day for a week)
    // This is a simplified check - in a real app, you'd need more sophisticated tracking
    const last7Days = [...user.quizHistory, newQuizHistory]
      .filter(q => new Date(q.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .map(q => new Date(q.date).toLocaleDateString());
    
    const uniqueDays = [...new Set(last7Days)];
    if (uniqueDays.length >= 7 && !user.achievements.includes("weekly_warrior")) {
      newAchievements.push("weekly_warrior");
      unlockedAchievements.push("weekly_warrior");
    }
    
    // Monthly champion achievement (completed at least one quiz every day for a month)
    // This is a simplified check - in a real app, you'd need more sophisticated tracking
    const last30Days = [...user.quizHistory, newQuizHistory]
      .filter(q => new Date(q.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .map(q => new Date(q.date).toLocaleDateString());
    
    const uniqueDays30 = [...new Set(last30Days)];
    if (uniqueDays30.length >= 30 && !user.achievements.includes("monthly_champion")) {
      newAchievements.push("monthly_champion");
      unlockedAchievements.push("monthly_champion");
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
  
  // Sequential confetti for achievements
  useEffect(() => {
    if (newlyUnlockedAchievements.length > 0) {
      // Order achievements in the desired sequence
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
      
      // Sort unlocked achievements based on the predefined order
      const sortedAchievements = [...newlyUnlockedAchievements].sort((a, b) => {
        return achievementOrder.indexOf(a) - achievementOrder.indexOf(b);
      });
      
      // Function to trigger confetti for each achievement in sequence
      const triggerConfettiForAchievement = (index) => {
        if (index >= sortedAchievements.length) {
          // Reset after all achievements
          setNewlyUnlockedAchievements([]);
          return;
        }
        
        const achievementId = sortedAchievements[index];
        
        // Different confetti styles for different achievements
        let confettiConfig = {
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
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
        } else if (achievementId === 'streak_3' || achievementId === 'streak_5' || achievementId === 'streak_10') {
          const streakCount = achievementId === 'streak_3' ? 3 : achievementId === 'streak_5' ? 5 : 10;
          confettiConfig = {
            ...confettiConfig,
            particleCount: streakCount * 50,
            spread: 70 + streakCount * 5,
            colors: ['#FF4500', '#FF8C00', '#FFA500'],
            shapes: ['star'],
            origin: { y: 0.6 },
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
        } else if (achievementId === 'weekly_warrior' || achievementId === 'monthly_champion') {
          confettiConfig = {
            ...confettiConfig,
            particleCount: 300,
            spread: 100,
            colors: ['#32CD32', '#3CB371', '#2E8B57', '#228B22', '#008000'],
            shapes: ['circle', 'star'],
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
        } else if (achievementId === 'night_owl') {
          confettiConfig = {
            ...confettiConfig,
            particleCount: 200,
            spread: 85,
            colors: ['#191970', '#000080', '#00008B', '#0000CD', '#4169E1'],
            shapes: ['circle', 'star'],
          };
        }
        
        // Trigger confetti
        confetti(confettiConfig);
        
        // Schedule next achievement confetti with a delay
        setTimeout(() => triggerConfettiForAchievement(index + 1), 2000);
      };
      
      // Start the sequence
      triggerConfettiForAchievement(0);
    }
  }, [newlyUnlockedAchievements]);
  
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