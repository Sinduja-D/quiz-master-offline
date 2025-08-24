// src/components/QuizResults.js
import React from 'react';
import './QuizResults.css';

const QuizResults = ({ results, language, onRestart, onHome }) => {
  const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
  
  let performanceMessage = '';
  if (percentage >= 80) {
    performanceMessage = language === 'English' 
      ? 'Excellent! You did a great job!' 
      : 'சிறப்பு! நீங்கள் சிறப்பாகச் செய்தீர்கள்!';
  } else if (percentage >= 60) {
    performanceMessage = language === 'English' 
      ? 'Good job! Keep practicing!' 
      : 'நன்று! பயிற்சி செய்து கொண்டே இருங்கள்!';
  } else {
    performanceMessage = language === 'English' 
      ? 'Keep trying! Practice makes perfect!' 
      : 'முயற்சி செய்து கொண்டே இருங்கள்! பயிற்சி மனிதனை நிபுணராக்கும்!';
  }

  return (
    <div className="results-container">
      <div className="results-card">
        <div className="results-header">
          <button className="back-button" onClick={onHome}>
            ← {language === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
          </button>
          <h2>
            {language === 'English' ? 'Quiz Results' : 'வினா முடிவுகள்'}
          </h2>
        </div>
        
        <div className="performance-message">
          {performanceMessage}
        </div>
        
        <div className="score-circle">
          <div className="score-percentage">{percentage}%</div>
        </div>
        
        <div className="results-stats">
          <div className="stat-item">
            <div className="stat-value">{results.totalQuestions}</div>
            <div className="stat-label">
              {language === 'English' ? 'Total Questions' : 'மொத்த கேள்விகள்'}
            </div>
          </div>
          
          <div className="stat-item correct">
            <div className="stat-value">{results.correctAnswers}</div>
            <div className="stat-label">
              {language === 'English' ? 'Correct' : 'சரியானவை'}
            </div>
          </div>
          
          <div className="stat-item wrong">
            <div className="stat-value">{results.wrongAnswers}</div>
            <div className="stat-label">
              {language === 'English' ? 'Wrong' : 'தவறானவை'}
            </div>
          </div>
        </div>
        
        <div className="results-actions">
          <button className="action-button restart" onClick={onRestart}>
            {language === 'English' ? 'Restart Quiz' : 'வினாவை மீண்டும் தொடங்கு'}
          </button>
          
          <button className="action-button home" onClick={onHome}>
            {language === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;