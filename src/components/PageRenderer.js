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
import DetectivePage from "./detective/DetectivePage";
import CertificatePage from "./certificate/CertificatePage";
import GamesMenu from "./GamesMenu";
import ScienceBombDefusal from "./ScienceBombDefusal";


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


  // Store last quiz state for review
  const [lastQuizQuestions, setLastQuizQuestions] = useState([]);
  const [lastQuizUserAnswers, setLastQuizUserAnswers] = useState([]);

  // Track story completion statuses
  const [completedStories, setCompletedStories] = useState(user.escapeRoomsCompletedMap || {});

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

  // Prevent language change during quiz or escape room
  const safeToggleLanguage = () => {
    if (activePage === "quiz" || activePage === "escapeRoom") {
      alert(
        language === "English"
          ? "You cannot change the language during this activity."
          : "இந்த செயல்பாட்டின் போது மொழியை மாற்ற முடியாது."
      );
      return;
    }
    toggleLanguage();
  };

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
  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setActivePage("escapeRoom");
  };

  // Escape Room: complete story
  const handleEscapeRoomComplete = (storyId, status = "completed") => {
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
  };

  const handleEscapeRoomBack = () => {
    setSelectedStory(null);
    setActivePage("storyMenu");
  };

  // Loading state
  if (!user) {
    return (
      <div className="loading-container">
        <p>{language === "English" ? "Loading..." : "ஏற்றப்படுகிறது..."}</p>
      </div>
    );
  }

  // Certificate page (early return)
  if (activePage === "certificate") {
    return <CertificatePage user={user} language={language} setActivePage={setActivePage} />;
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
      return <RiddleQuiz language={language} />;

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
        />
      );

    case "dailyScience":
      return <DailySciencePage language={language} user={user} updateUser={updateUser} />;

    case "funFacts":
      return <FunFactsPage language={language} />;

    case "spin":
      return <SpinWheel language={language} user={user} />;
case "detective":
      return (
        <DetectivePage
          language={language}
          onBack={() => setActivePage("games") }
        />
      );

case "bombDefusal":
      return <ScienceBombDefusal language={language} setActivePage={setActivePage} onBack={() => setActivePage("games") }/>;



    // NEW: Add a case for the games page
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
      case "certificate":
  return (
    <CertificatePage
      user={user}
      language={language}
      setActivePage={setActivePage}
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