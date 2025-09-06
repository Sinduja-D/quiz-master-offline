// src/components/PageRenderer.jsx
import React, { useState, useEffect } from "react";
import HomePage from "./HomePage.js";
import AboutPage from "./AboutPage.js";
import ContactPage from "./ContactPage.js";
import HelpPage from "./HelpPage.js";
import ProfilePage from "./ProfilePage.js";
import AchievementsPage from "./AchievementsPage.js";
import LeaderboardPage from "./LeaderboardPage.js";
import FunFactsPage from "./FunFacts.js";
import QuizSetup from "./QuizSetup.js";
import Quiz from "./Quiz.js";
import RiddleQuiz from "./RiddleQuiz.js";
import QuizResults from "./QuizResults.js";
import DailySciencePage from "./DailySciencePage.js";
import SpinWheel from "./SpinWheel.js";
import StoryMenu from "./StoryMenu.js";
import EscapeRoom from "./EscapeRoom.js";
import { useQuizApp } from "../hooks/useQuizApp.js";

const PageRenderer = ({ language, activePage, setActivePage, user, updateUser, toggleLanguage }) => {
  // State for escape room functionality
  const [selectedStory, setSelectedStory] = useState(null);
  
  // Pass setActivePage and user to the hook
  const {
    selectedLevel,
    quizSettings,
    quizResults,
    questions,
    loading,
    error,
    handleLevelSelect,
    handleStartQuiz,
    handleQuizComplete,
    handleRestartQuiz,
    handleBackToHome,
    newlyUnlockedAchievements,
    isQuizInProgress,
    achievementNotification
  } = useQuizApp(setActivePage, user, updateUser);
  
  // Create a safe toggle language function that checks if we're in a quiz
  const safeToggleLanguage = () => {
    if (activePage === "quiz") {
      // We're in a quiz, show warning
      alert(language === 'English' 
        ? "You are not allowed to change the language after starting the quiz" 
        : "வினா தொடங்கிய பிறகு மொழியை மாற்ற அனுமதியில்லை");
      return;
    }
    toggleLanguage();
  };
  
  // Store selected difficulty in sessionStorage when level is selected
  useEffect(() => {
    if (selectedLevel) {
      sessionStorage.setItem('selectedDifficulty', selectedLevel.id);
    }
  }, [selectedLevel]);
  
  // Get difficulty from sessionStorage when navigating to quiz setup
  useEffect(() => {
    if (activePage === "quizsetup") {
      const difficulty = sessionStorage.getItem('selectedDifficulty');
      if (!difficulty) {
        // If no difficulty is found, redirect to home
        setActivePage("home");
      }
    }
  }, [activePage, setActivePage]);
  
  // Escape room handlers
  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setActivePage("escapeRoom");
  };
  
  const handleEscapeRoomComplete = (storyId) => {
    // Update user with escape room completion
    const updatedUser = { ...user };
    if (!updatedUser.escapeRoomsCompleted) {
      updatedUser.escapeRoomsCompleted = [];
    }
    if (!updatedUser.escapeRoomsCompleted.includes(storyId)) {
      updatedUser.escapeRoomsCompleted.push(storyId);
    }
    
    // Update user points for completing escape room
    updatedUser.totalPoints = (updatedUser.totalPoints || 0) + 50;
    
    updateUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update users list in localStorage
    const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('quizAppUsers', JSON.stringify(users));
    }
    
    // Navigate back to story menu
    setActivePage("storyMenu");
  };
  
  const handleEscapeRoomBack = () => {
    setSelectedStory(null);
    setActivePage("storyMenu");
  };
  
  // If user is null, show loading
  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{language === 'English' ? 'Loading...' : 'ஏற்றப்படுகிறது...'}</p>
      </div>
    );
  }
  
  switch (activePage) {
    case "home":
      return (
        <HomePage 
          language={language} 
          setActivePage={setActivePage}
          onLevelSelect={handleLevelSelect}
          toggleLanguage={safeToggleLanguage}
        />
      );
    case "about":
      return <AboutPage language={language} />;
    case "contact":
      return <ContactPage language={language} />;
    case "help":
      return <HelpPage language={language} />;
    case "profile":
      return <ProfilePage language={language} user={user} />;
    case "achievements":
      return <AchievementsPage 
        language={language} 
        user={user} 
        newlyUnlockedAchievements={newlyUnlockedAchievements}
      />;
    case "leaderboard":
      return <LeaderboardPage language={language} currentUser={user} />;
    case "riddles":
      return <RiddleQuiz language={language} />;
    case "storyMenu":
      return <StoryMenu 
        language={language} 
        onStorySelect={handleStorySelect}
        completedStories={user.escapeRoomsCompleted || []}
      />;
    case "escapeRoom":
      return (
        <EscapeRoom 
          language={language} 
          storyId={selectedStory?.id}
          onBack={handleEscapeRoomBack}
          onComplete={handleEscapeRoomComplete}
        />
      );
    case "dailyScience":
      return <DailySciencePage 
        language={language} 
        user={user} 
        updateUser={updateUser}
      />;
    case "funFacts":
      return <FunFactsPage language={language} />;
    case "quizsetup":
      return (
        <QuizSetup 
          level={selectedLevel} 
          startQuiz={handleStartQuiz} 
          language={language}
          onBack={() => setActivePage("home")}
        />
      );
    case "quiz":
      return (
        <Quiz 
          language={language}
          level={quizSettings?.level?.id}
          numberOfQuestions={quizSettings?.numberOfQuestions || 10}
          subject={quizSettings?.subject}
          grade={quizSettings?.grade}
          onQuizComplete={handleQuizComplete}
          onBack={() => setActivePage("quizsetup")}
        />
      );
    case "quizresults":
      return (
        <QuizResults 
          results={quizResults}
          language={language}
          onRestart={handleRestartQuiz}
          onHome={handleBackToHome}
        />
      );
    default:
      return <HomePage language={language} setActivePage={setActivePage} />;
  }
};

export default PageRenderer;