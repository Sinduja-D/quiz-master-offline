import { useState, useEffect } from 'react';
import { levels } from '../constants/levels';

export const useQuizApp = () => {
  const [language, setLanguage] = useState('English');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: 'QuizUser123', 
    memberSince: 'Jan 2025', 
    totalPoints: 1250,
    totalQuizzes: 24, 
    averageScore: 78, 
    achievements: 5
  });

  const toggleLanguage = () => setLanguage(language === 'English' ? 'Tamil' : 'English');
  
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setQuizSettings({language, level: level.id, numberOfQuestions: 10});
    setActivePage('quizSetup');
  };
  
  const handleStartQuiz = (numberOfQuestions, subject, grade) => {
    setQuizSettings({...quizSettings, numberOfQuestions, subject, grade});
    setActivePage('quiz');
  };
  
  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setActivePage('results');
    
    const pointsEarned = results.correctAnswers * 10;
    setUserProfile(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + pointsEarned,
      totalQuizzes: prev.totalQuizzes + 1,
      averageScore: Math.round((prev.averageScore * prev.totalQuizzes + 
        (results.correctAnswers / results.totalQuestions) * 100) / (prev.totalQuizzes + 1))
    }));
  };
  
  const handleRestartQuiz = () => setActivePage('quiz');
  const handleBackToHome = () => {
    setActivePage('home');
    setSelectedLevel(null);
    setQuizResults(null);
  };

  useEffect(() => {
    document.title = language === 'English' ? 'Quiz Master' : 'வினா மாஸ்டர்';
  }, [language]);

  return {
    language,
    selectedLevel,
    activePage,
    quizSettings,
    quizResults,
    userProfile,
    levels,
    toggleLanguage,
    handleLevelSelect,
    handleStartQuiz,
    handleQuizComplete,
    handleRestartQuiz,
    handleBackToHome,
    setActivePage
  };
};