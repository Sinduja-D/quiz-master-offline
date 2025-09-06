// src/components/DailySciencePage.jsx
import React, { useState, useEffect } from 'react';
import './DailySciencePage.css';
import { dailyScienceQuestions } from '../data/dailyScienceQuestions';
import SpinWheel from './SpinWheel';

const DailySciencePage = ({ language, user, updateUser }) => {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [hasAnsweredToday, setHasAnsweredToday] = useState(false);
  const [secondChance, setSecondChance] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user has answered today's question
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const lastAnswered = user?.lastDailyQuestionDate;
    
    if (lastAnswered === today) {
      setHasAnsweredToday(true);
    } else {
      // Get a unique question for this user for today
      const userSeed = user.id + today;
      const questionIndex = Math.abs(
        userSeed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      ) % dailyScienceQuestions.length;
      
      setQuestion(dailyScienceQuestions[questionIndex]);
    }
    
    setLoading(false);
  }, [user]);

  const handleOptionSelect = (index) => {
    if (showResult) return;
    
    setSelectedOption(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      // User gets a chance to spin the wheel
      setTimeout(() => setShowSpinWheel(true), 1500);
    } else {
      // Update user data to show they answered today
      const today = new Date().toISOString().split('T')[0];
      const updatedUser = {
        ...user,
        lastDailyQuestionDate: today,
        lastDailyQuestionId: question.id
      };
      updateUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const handleSpinComplete = (reward) => {
    // Update user points based on reward
    const points = reward.points || 0;
    
    // If user didn't win points and hasn't used second chance, give them a second chance
    if (points === 0 && !secondChance) {
      setSecondChance(true);
      return;
    }
    
    const updatedUser = {
      ...user,
      totalPoints: user.totalPoints + points,
      lastDailyQuestionDate: new Date().toISOString().split('T')[0],
      lastDailyQuestionId: question.id,
      lastSpinWheelDate: new Date().toISOString().split('T')[0],
      spinWheelSecondChance: false // Reset second chance after spinning
    };
    
    updateUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update leaderboard
    const users = JSON.parse(localStorage.getItem('quizAppUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('quizAppUsers', JSON.stringify(users));
    }
    
    setShowSpinWheel(false);
    setHasAnsweredToday(true);
  };

  const t = (eng, tam) => (language === "English" ? eng : tam);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('Loading question...', 'கேள்வி ஏற்றப்படுகிறது...')}</p>
      </div>
    );
  }

  if (hasAnsweredToday) {
    return (
      <div className="daily-science-container">
        <div className="already-answered">
          <h2>{t('Daily Science Challenge', 'தினசரி அறிவியல் சவால்')}</h2>
          <div className="message-box">
            <p>{t('You have already answered today\'s question. Come back tomorrow for a new challenge!', 
                 'நீங்கள் இன்றைய கேள்விக்கு ஏற்கனவே பதிலளித்துள்ளீர்கள். புதிய சவாலுக்கு நாளை வாருங்கள்!')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-science-container">
      <h2>{t('Daily Science Challenge', 'தினசரி அறிவியல் சவால்')}</h2>
      
      {showSpinWheel ? (
        <SpinWheel 
          language={language} 
          onSpinComplete={handleSpinComplete}
          user={user}
          secondChance={secondChance}
        />
      ) : (
        <div className="question-card">
          <div className="question-text">
            <p className="english">{question.question.english}</p>
            <p className="tamil">{question.question.tamil}</p>
          </div>
          
          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === index ? 'selected' : ''} ${
                  showResult && index === question.correctAnswer ? 'correct' : ''
                } ${
                  showResult && selectedOption === index && !isCorrect ? 'incorrect' : ''
                }`}
                onClick={() => handleOptionSelect(index)}
                disabled={showResult}
              >
                <span className="english">{option.english}</span>
                <span className="tamil">{option.tamil}</span>
              </button>
            ))}
          </div>
          
          {showResult && (
            <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <p>{t('Correct! You earned a spin!', 'சரி! நீங்கள் ஒரு சுழற்சியை வென்றீர்கள்!')}</p>
              ) : (
                <p>{t('Incorrect. Better luck tomorrow!', 'தவறு. நாளை நல்ல அதிர்ஷ்டம்!')}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailySciencePage;