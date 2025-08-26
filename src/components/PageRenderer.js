import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import HelpPage from './HelpPage';
import ProfilePage from './ProfilePage';
import AchievementsPage from './AchievementsPage';
import LeaderboardPage from './LeaderboardPage';
import FunFactsPage from './FunFacts';
import QuizSetup from './QuizSetup';
import Quiz from './Quiz';
import QuizResults from './QuizResults';

const PageRenderer = ({ 
  activePage, 
  language, 
  levels, 
  handleLevelSelect, 
  setActivePage, 
  selectedLevel, 
  quizSettings, 
  handleStartQuiz, 
  handleQuizComplete, 
  handleBackToHome, 
  handleRestartQuiz, 
  quizResults, 
  userProfile 
}) => {
  switch(activePage) {
    case 'home': 
      return <HomePage 
        language={language} 
        levels={levels} 
        handleLevelSelect={handleLevelSelect} 
        setActivePage={setActivePage} 
      />;
    case 'about': 
      return <AboutPage language={language} />;
    case 'contact': 
      return <ContactPage language={language} />;
    case 'help': 
      return <HelpPage language={language} />;
    case 'profile': 
      return <ProfilePage language={language} userProfile={userProfile} />;
    case 'achievements': 
      return <AchievementsPage language={language} />;
    case 'leaderboard': 
      return <LeaderboardPage language={language} />;
    case 'funFacts': 
      return <FunFactsPage language={language} />;
    case 'quizSetup': 
      return <QuizSetup 
        language={language} 
        level={selectedLevel.id} 
        onStartQuiz={handleStartQuiz} 
        onBack={handleBackToHome} 
      />;
    case 'quiz': 
      return <Quiz 
        language={quizSettings.language} 
        level={quizSettings.level} 
        subject={quizSettings.subject} 
        grade={quizSettings.grade} 
        numberOfQuestions={quizSettings.numberOfQuestions} 
        onQuizComplete={handleQuizComplete} 
        onBack={handleBackToHome} 
      />;
    case 'results': 
      return <QuizResults 
        results={quizResults} 
        language={language} 
        onRestart={handleRestartQuiz} 
        onHome={handleBackToHome} 
      />;
    default: 
      return null;
  }
};

export default PageRenderer;