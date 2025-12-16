import React, { useState, useEffect } from "react";

/* Pages */
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import HelpPage from "./HelpPage";
import ProfilePage from "./ProfilePage";
import AchievementsPage from "./AchievementsPage";
import LeaderboardPage from "./LeaderboardPage";
import FunFactsPage from "./FunFacts";
import QuizSetup from "./QuizSetup";
import Quiz from "./Quiz";
import RiddleQuiz from "./RiddleQuiz";
import QuizResults from "./QuizResults";
import DailySciencePage from "./DailySciencePage";
import SpinWheel from "./SpinWheel";
import StoryMenu from "./StoryMenu";
import EscapeRoom from "./EscapeRoom";
import CertificatePage from "./certificate/CertificatePage";

/* Hook */
import { useQuizApp } from "../hooks/useQuizApp";

const PageRenderer = ({
  language,
  activePage,
  setActivePage,
  user,
  updateUser,
  toggleLanguage,
  candidateName,
  setIsQuizInProgress,
}) => {
  const [selectedStory, setSelectedStory] = useState(null);

  /* 🔍 Quiz review state */
  const [lastQuizQuestions, setLastQuizQuestions] = useState([]);
  const [lastQuizUserAnswers, setLastQuizUserAnswers] = useState([]);

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
  } = useQuizApp(setActivePage, user, updateUser, setIsQuizInProgress);

  /* 🚫 Prevent language change during quiz */
  const safeToggleLanguage = () => {
    if (activePage === "quiz") {
      alert(
        language === "English"
          ? "You cannot change language during the quiz"
          : "வினா நடக்கும் போது மொழியை மாற்ற முடியாது"
      );
      return;
    }
    toggleLanguage();
  };

  /* 💾 Save selected difficulty */
  useEffect(() => {
    if (selectedLevel) {
      sessionStorage.setItem("selectedDifficulty", selectedLevel.id);
    }
  }, [selectedLevel]);

  /* 🔒 Prevent direct quizsetup access */
  useEffect(() => {
    if (activePage === "quizsetup") {
      const difficulty = sessionStorage.getItem("selectedDifficulty");
      if (!difficulty) {
        setActivePage("home");
      }
    }
  }, [activePage, setActivePage]);

  /* 🧩 Escape room handlers */
  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setActivePage("escapeRoom");
  };

  const handleEscapeRoomComplete = (storyId) => {
    const updatedUser = { ...user };
    updatedUser.escapeRoomsCompleted = updatedUser.escapeRoomsCompleted || [];

    if (!updatedUser.escapeRoomsCompleted.includes(storyId)) {
      updatedUser.escapeRoomsCompleted.push(storyId);
      updatedUser.totalPoints = (updatedUser.totalPoints || 0) + 50;
    }

    updateUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("quizAppUsers") || "[]");
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("quizAppUsers", JSON.stringify(users));
    }

    setActivePage("storyMenu");
  };

  const handleEscapeRoomBack = () => {
    setSelectedStory(null);
    setActivePage("storyMenu");
  };

  /* ⏳ Loading state */
  if (!user) {
    return (
      <div className="loading-container">
        <p>{language === "English" ? "Loading..." : "ஏற்றப்படுகிறது..."}</p>
      </div>
    );
  }

  /* 🧾 Certificate page (early return) */
  if (activePage === "certificate") {
    return (
      <CertificatePage
        user={user}
        language={language}
        setActivePage={setActivePage}
      />
    );
  }

  /* 🔀 PAGE SWITCH */
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
      return (
        <ProfilePage
          language={language}
          user={user}
          setActivePage={setActivePage}
        />
      );

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
      return <RiddleQuiz language={language} />;

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
      return (
        <DailySciencePage
          language={language}
          user={user}
          updateUser={updateUser}
        />
      );

    case "funFacts":
      return <FunFactsPage language={language} />;

    case "spin":
      return <SpinWheel language={language} user={user} />;

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
          candidateName={candidateName}
          onQuizComplete={(results, payload) => {
            // payload contains { questions, userAnswers }
            if (payload && Array.isArray(payload.questions)) {
              setLastQuizQuestions(payload.questions);
            } else {
              setLastQuizQuestions([]);
            }
            setLastQuizUserAnswers(payload && payload.userAnswers ? payload.userAnswers : {});
            // Pass only the results object to the app-level handler
            handleQuizComplete(results);
            setIsQuizInProgress(false);
          }}
        />
      );

    case "quizresults":
      return (
        <QuizResults
          results={quizResults}
          language={language}
          onRestart={handleRestartQuiz}
          onHome={handleBackToHome}
          questions={lastQuizQuestions}
          userAnswers={lastQuizUserAnswers}
        />
      );

    default:
      return <HomePage language={language} setActivePage={setActivePage} />;
  }
};

export default PageRenderer;
