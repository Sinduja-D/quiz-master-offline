import React, { useState, useEffect, useCallback } from "react";

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
import ScienceSliderPuzzle from "./ScienceSliderPuzzle";
import CertificatePage from "./certificate/CertificatePage";
import GamesMenu from "./GamesMenu";
import ScienceBombDefusal from "./ScienceBombDefusal";
import MemoryMatch from "./MemoryMatch";

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
  const [selectedCase, setSelectedCase] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Store last quiz state for review
  const [lastQuizQuestions, setLastQuizQuestions] = useState([]);
  const [lastQuizUserAnswers, setLastQuizUserAnswers] = useState([]);

  // Track story completion statuses - using optional chaining for safety
  const [completedStories, setCompletedStories] = useState(user?.escapeRoomsCompletedMap || {});

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

  // Debug logging for troubleshooting
  useEffect(() => {
    console.log('PageRenderer activePage:', activePage);
    console.log('PageRenderer setActivePage:', typeof setActivePage);
  }, [activePage]);

  // Prevent language change during quiz or escape room
  const safeToggleLanguage = useCallback(() => {
    if (activePage === "quiz" || activePage === "escapeRoom") {
      alert(
        language === "English"
          ? "You cannot change the language during this activity."
          : "இந்த செயல்பாட்டின் போது மொழியை மாற்ற முடியாது."
      );
      return;
    }
    toggleLanguage();
  }, [activePage, language, toggleLanguage]);

  // Save selected difficulty
  useEffect(() => {
    if (selectedLevel) {
      sessionStorage.setItem("selectedDifficulty", selectedLevel.id);
    }
  }, [selectedLevel]);

  // Prevent direct access to quiz setup
  useEffect(() => {
    if (activePage === "quizsetup") {
      const difficulty = sessionStorage.getItem("selectedDifficulty");
      if (!difficulty) {
        setActivePage("home");
      }
    }
  }, [activePage, setActivePage]);

  // Escape Room: select story
  const handleStorySelect = useCallback((story) => {
    setSelectedStory(story);
    setActivePage("escapeRoom");
  }, [setActivePage]);

  // Escape Room: complete story
  const handleEscapeRoomComplete = useCallback((storyId, status = "completed") => {
    try {
      setIsLoading(true);
      const updatedUser = { ...user };
      if (!updatedUser.escapeRoomsCompleted) updatedUser.escapeRoomsCompleted = [];
      if (!updatedUser.escapeRoomsCompletedMap) updatedUser.escapeRoomsCompletedMap = {};

      updatedUser.escapeRoomsCompletedMap[storyId] = status;
      if (!updatedUser.escapeRoomsCompleted.includes(storyId)) {
        updatedUser.escapeRoomsCompleted.push(storyId);
      }

      // Award points only if fully completed
      if (status === "completed") {
        updatedUser.totalPoints = (updatedUser.totalPoints || 0) + 50;
      }

      // Update user state & localStorage
      updateUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem("quizAppUsers") || "[]");
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("quizAppUsers", JSON.stringify(users));
      }

      // Update local state to reflect immediately in StoryMenu
      setCompletedStories({ ...updatedUser.escapeRoomsCompletedMap });

      // Return to story menu
      setSelectedStory(null);
      setActivePage("storyMenu");
    } catch (err) {
      setError(err.message || "Failed to update escape room completion status");
      console.error("Error in handleEscapeRoomComplete:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, updateUser, setActivePage]);

  const handleEscapeRoomBack = useCallback(() => {
    setSelectedStory(null);
    setActivePage("storyMenu");
  }, [setActivePage]);

  // Error boundary
  if (error) {
    return (
      <div className="error-container">
        <h2>{language === "English" ? "Something went wrong" : "ஏதோ தவறு நடந்தது"}</h2>
        <p>{error}</p>
        <button onClick={() => setError(null)}>
          {language === "English" ? "Try again" : "மீண்டும் முயற்சிக்கவும்"}
        </button>
      </div>
    );
  }

  // Loading state
  if (!user || isLoading) {
    return (
      <div className="loading-container">
        <p>{language === "English" ? "Loading..." : "ஏற்றப்படுகிறது..."}</p>
      </div>
    );
  }

  // Page switch
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
      return <ProfilePage language={language} user={user} setActivePage={setActivePage} />;

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
      return <RiddleQuiz language={language} setActivePage={setActivePage} />;

    case "storyMenu":
      return (
        <StoryMenu
          language={language}
          onStorySelect={handleStorySelect}
          completedStories={completedStories}
        />
      );

    case "escapeRoom":
      return (
        <EscapeRoom
          language={language}
          storyId={selectedStory?.id}
          onBack={handleEscapeRoomBack}
          onComplete={handleEscapeRoomComplete}
          setActivePage={setActivePage}
        />
      );

    case "dailyScience":
          return (
                <DailySciencePage
                    language={language}
                    user={user}
                    updateUser={updateUser}
                    setActivePage={setActivePage}   // ✅ ADD THIS LINE
                  />
                );
    case "funFacts":
      return <FunFactsPage language={language} setActivePage={setActivePage} />;

    case "spin":
      console.log('Rendering SpinWheel with setActivePage:', typeof setActivePage);
      return (
        <SpinWheel 
          language={language} 
          user={user} 
          setActivePage={setActivePage}
          onSpinComplete={(result) => {
            // Handle spin completion if needed
            console.log('Spin completed with result:', result);
          }}
        />
      );

    case "bombDefusal":
      return <ScienceBombDefusal language={language} setActivePage={setActivePage} onBack={() => setActivePage("games") }/>;

      case "scienceSliderPuzzle":
      return (
        <ScienceSliderPuzzle
          language={language}
          setActivePage={setActivePage}
        />
      );

      case "elementMatch":
      return <MemoryMatch language={language} onBack={() => setActivePage("games")} setActivePage={setActivePage} />;
    // Games page
    case "games":
      return (
        <GamesMenu
          language={language}
          setActivePage={setActivePage}
        />
      );


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
            if (payload && Array.isArray(payload.questions)) setLastQuizQuestions(payload.questions);
            setLastQuizUserAnswers(payload?.userAnswers || {});
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

    case "certificate":
      return <CertificatePage user={user} language={language} setActivePage={setActivePage} />;

    

    default:
      return <HomePage language={language} setActivePage={setActivePage} />;
  }
};

export default PageRenderer;