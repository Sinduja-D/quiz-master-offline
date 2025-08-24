// src/components/QuizSetup.js
import React, { useState } from 'react';
import './QuizSetup.css';

const QuizSetup = ({ language, level, onStartQuiz, onBack }) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [selectedSubject, setSelectedSubject] = useState('Chemistry');
  const [selectedGrade, setSelectedGrade] = useState('');

  const handleStartQuiz = () => {
    if (!selectedGrade) {
      alert(language === 'English' ? 'Please select a grade' : 'தயவுசெய்து ஒரு தரத்தைத் தேர்ந்தெடுக்கவும்');
      return;
    }
    onStartQuiz(numberOfQuestions, selectedSubject, selectedGrade);
  };

  const levelNames = {
    English: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    Tamil: {
      beginner: 'தொடக்க',
      intermediate: 'இடைநிலை',
      advanced: 'மேம்பட்ட'
    }
  };

  const gradeOptions = {
    beginner: [6, 7],
    intermediate: [8, 9, 10],
    advanced: [11, 12]
  };

  const subjects = {
    English: ['Chemistry', 'Physics', 'Biology'],
    Tamil: ['வேதியியல்', 'இயற்பியல்', 'உயிரியல்']
  };

  const subjectIcons = {
    Chemistry: '🧪',
    Physics: '⚛️',
    Biology: '🧬',
    'வேதியியல்': '🧪',
    'இயற்பியல்': '⚛️',
    'உயிரியல்': '🧬'
  };

  const levelColors = {
    beginner: '#4CAF50',
    intermediate: '#2196F3',
    advanced: '#9C27B0'
  };

  const levelIcons = {
    beginner: '🟢',
    intermediate: '🟡',
    advanced: '🔴'
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
            <span className="info-value">{language=== 'English' ? 'English': 'தமிழ்'}</span>
            
          </div>
          
          <div className="info-item">
            <span className="info-label">
              {language === 'English' ? 'Difficulty Level:' : 'சிரம நிலை:'}
            </span>
            <div className="difficulty-badge" style={{ backgroundColor: levelColors[level] }}>
              <span className="level-icon">{levelIcons[level]}</span>
              <span className="level-name">{levelNames[language][level]}</span>
            </div>
          </div>
        </div>
        
        <div className="subject-selector">
          <label>
            {language === 'English' ? 'Select Subject:' : 'பாடத்தைத் தேர்ந்தெடுக்கவும்:'}
          </label>
          <div className="subject-options">
            {subjects[language].map((subject) => (
              <button
                key={subject}
                className={`subject-option ${selectedSubject === subject ? 'active' : ''}`}
                onClick={() => setSelectedSubject(subject)}
              >
                <span className="subject-icon">{subjectIcons[subject]}</span>
                <span className="subject-name">{subject}</span>
              </button>
            ))}
          </div>
        </div>
        
         <div className="grade-selector">
          <label>
            {language === 'English' ? 'Select Grade:' : 'தரத்தைத் தேர்ந்தெடுக்கவும்:'}
          </label>
          <div className="grade-dropdown">
            <select 
              value={selectedGrade} 
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="grade-select"
            >
              <option value="">
                {language === 'English' ? 'Select Grade' : 'தரத்தைத் தேர்ந்தெடுக்கவும்'}
              </option>
              {gradeOptions[level].map((grade) => (
                <option key={grade} value={grade}>
                  {language === 'English' ? `Grade ${grade}` : `${grade}ஆம் வகுப்பு`}
                </option>
              ))}
            </select>
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