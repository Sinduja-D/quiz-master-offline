// src/hooks/useQuizApp.js
import { useState, useEffect } from "react";
import { levels } from "../levels.js";

export const useQuizApp = (setActivePage) => {
  // 🌍 UI + State
  const [language, setLanguage] = useState("English");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  
  // 👤 User profile
  const [userProfile, setUserProfile] = useState({
    username: "QuizUser123",
    memberSince: "Jan 2025",
    totalPoints: 1250,
    totalQuizzes: 24,
    averageScore: 78,
    achievements: 5,
  });

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
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🌍 Handlers
  const toggleLanguage = () =>
    setLanguage(language === "English" ? "Tamil" : "English");

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
      setActivePage("quiz");
    } catch (err) {
      console.error("Error in handleStartQuiz:", err);
    }
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    const pointsEarned = results.correctAnswers * 10;
    setUserProfile((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + pointsEarned,
      totalQuizzes: prev.totalQuizzes + 1,
      averageScore: Math.round(
        (prev.averageScore * prev.totalQuizzes +
          (results.correctAnswers / results.totalQuestions) * 100) /
          (prev.totalQuizzes + 1)
      ),
    }));
    setActivePage("quizresults");
  };

  const handleRestartQuiz = () => setActivePage("quizsetup");
  
  const handleBackToHome = () => {
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
    userProfile,
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
  };
};