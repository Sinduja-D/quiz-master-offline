// src/components/QuizSetup.js
import React, { useState } from 'react';
import './QuizSetup.css';

const QuizSetup = ({ language, level, onStartQuiz, onBack }) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const handleStartQuiz = () => {
    onStartQuiz(numberOfQuestions);
  };

  const levelNames = {
    English: {
      Beginner: 'Beginner',
      Intermediate: 'Intermediate',
      Advanced: 'Advanced'
    },
    Tamil: {
      Beginner: 'தொடக்க',
      Intermediate: 'இடைநிலை',
      Advanced: 'மேம்பட்ட'
    }
  };

  return (
    <div className="quiz-setup-container">
      <div className="quiz-setup-card">
        <div className="setup-header">
          <button className="back-button" onClick={onBack}>
            ← {language === 'English' ? 'Back' : 'திரும்ப'}
          </button>
          <h2>
            {language === 'English' ? 'Quiz Setup' : 'வினா அமைப்பு'}
          </h2>
        </div>
        
        <div className="setup-info">
          <div className="info-item">
            <span className="info-label">
              {language === 'English' ? 'Language:' : 'மொழி:'}
            </span>
            <span className="info-value">{language}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">
              {language === 'English' ? 'Difficulty Level:' : 'சிரம நிலை:'}
            </span>
            <span className="info-value">{levelNames[language][level]}</span>
          </div>
        </div>
        
        <div className="question-selector">
          <label htmlFor="questionCount">
            {language === 'English' 
              ? 'Number of Questions (1-50):' 
              : 'கேள்விகளின் எண்ணிக்கை (1-50):'}
          </label>
          <input
            type="range"
            id="questionCount"
            min="1"
            max="50"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
            className="question-slider"
          />
          <div className="question-count-display">{numberOfQuestions}</div>
        </div>
        
        <button className="start-quiz-button" onClick={handleStartQuiz}>
          {language === 'English' ? 'Start Quiz' : 'வினாத்திட்டத்தைத் தொடங்கு'}
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;