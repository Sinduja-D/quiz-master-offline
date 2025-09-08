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

const PageRenderer = ({
  language,
  activePage,
  setActivePage,
  user,
  updateUser,
  toggleLanguage,
  candidateName,
}) => {
  const [selectedStory, setSelectedStory] = useState(null);

  const {
    selectedLevel,
    quizSettings,
    quizResults,
    handleLevelSelect,
    handleStartQuiz,
    handleQuizComplete,
    handleRestartQuiz,
    handleBackToHome,
    newlyUnlockedAchievements,
  } = useQuizApp(setActivePage, user, updateUser);

  const safeToggleLanguage = () => {
    if (activePage === "quiz") {
      alert(
        language === "English"
          ? "You are not allowed to change the language after starting the quiz"
          : "வினா தொடங்கிய பிறகு மொழியை மாற்ற அனுமதியில்லை"
      );
      return;
    }
    toggleLanguage();
  };

  useEffect(() => {
    if (selectedLevel) {
      sessionStorage.setItem("selectedDifficulty", selectedLevel.id);
    }
  }, [selectedLevel]);

  useEffect(() => {
    if (activePage === "quizsetup") {
      const difficulty = sessionStorage.getItem("selectedDifficulty");
      if (!difficulty) {
        setActivePage("home");
      }
    }
  }, [activePage, setActivePage]);

  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setActivePage("escapeRoom");
  };

  const handleEscapeRoomComplete = (storyId) => {
    const updatedUser = { ...user };
    if (!updatedUser.escapeRoomsCompleted) {
      updatedUser.escapeRoomsCompleted = [];
    }
    if (!updatedUser.escapeRoomsCompleted.includes(storyId)) {
      updatedUser.escapeRoomsCompleted.push(storyId);
    }
    updatedUser.totalPoints = (updatedUser.totalPoints || 0) + 50;

    updateUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("quizAppUsers") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("quizAppUsers", JSON.stringify(users));
    }

    setActivePage("storyMenu");
  };

  const handleEscapeRoomBack = () => {
    setSelectedStory(null);
    setActivePage("storyMenu");
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{language === "English" ? "Loading..." : "ஏற்றப்படுகிறது..."}</p>
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
          user={user}
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
      return (
        <AchievementsPage
          language={language}
          user={user}
          newlyUnlockedAchievements={newlyUnlockedAchievements}
        />
      );
    case "leaderboard":
      return <LeaderboardPage language={language} currentUser={user} />;
    case "riddles":
      return (
        <RiddleQuiz
          language={language}
          userName={user.name}
          schoolName={user.schoolName}
        />
      );
    case "storyMenu":
      return (
        <StoryMenu
          language={language}
          onStorySelect={handleStorySelect}
          completedStories={user.escapeRoomsCompleted || []}
        />
      );
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
      return <DailySciencePage language={language} user={user} updateUser={updateUser} />;
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
          candidateName={candidateName}
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
