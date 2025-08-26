// src/App.js
import React from 'react';
import './App.css';
import reportWebVitals from './reportWebVitals';

// Import components
import Navbar from './components/Navbar';
import PageRenderer from './components/PageRenderer';
import Footer from './components/Footer';
import { useQuizApp } from './hooks/useQuizApp';

function App() {
  const {
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
  } = useQuizApp();

  return (
    <div className="app-container">
      <Navbar 
        language={language} 
        activePage={activePage} 
        setActivePage={setActivePage} 
        toggleLanguage={toggleLanguage} 
      />
      
      <main className="main-content">
        <PageRenderer 
          activePage={activePage}
          language={language}
          levels={levels}
          handleLevelSelect={handleLevelSelect}
          setActivePage={setActivePage}
          selectedLevel={selectedLevel}
          quizSettings={quizSettings}
          handleStartQuiz={handleStartQuiz}
          handleQuizComplete={handleQuizComplete}
          handleBackToHome={handleBackToHome}
          handleRestartQuiz={handleRestartQuiz}
          quizResults={quizResults}
          userProfile={userProfile}
        />
      </main>
      
      <Footer language={language} />
    </div>
  );
}

reportWebVitals();
export default App;