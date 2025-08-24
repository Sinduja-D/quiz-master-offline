// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import {
  questions_tamil_beginner,
  questions_tamil_intermediate,
  questions_tamil_advanced,
  questions_english_beginner,
  questions_english_intermediate,
  questions_english_advanced
} from '../data/index.js';
import './Quiz.css';

const Quiz = ({ language, level, numberOfQuestions, onQuizComplete, onBack }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [showStartPopup, setShowStartPopup] = useState(true);
  const [results, setResults] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  });

  // Get the appropriate question set based on language and level
  const getQuestionSet = () => {
    if (language === 'Tamil') {
      switch(level) {
        case 'beginner': return questions_tamil_beginner;
        case 'intermediate': return questions_tamil_intermediate;
        case 'advanced': return questions_tamil_advanced;
        default: return questions_tamil_beginner;
      }
    } else {
      switch(level) {
        case 'beginner': return questions_english_beginner;
        case 'intermediate': return questions_english_intermediate;
        case 'advanced': return questions_english_advanced;
        default: return questions_english_beginner;
      }
    }
  };

  // Select questions from the appropriate set
  useEffect(() => {
    const questionSet = getQuestionSet();
    
    // Shuffle and select the requested number of questions
    const shuffled = [...questionSet].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numberOfQuestions);
    
    setQuizQuestions(selected);
    setResults({
      totalQuestions: numberOfQuestions,
      correctAnswers: 0,
      wrongAnswers: 0
    });
  }, [language, level, numberOfQuestions]);

  // Timer for the start popup
  useEffect(() => {
    if (showStartPopup && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (showStartPopup && timeLeft === 0) {
      setShowStartPopup(false);
    }
  }, [showStartPopup, timeLeft]);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.correctOption;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Update results
     const updatedResults = {
    ...results,
    correctAnswers: correct ? results.correctAnswers + 1 : results.correctAnswers,
    wrongAnswers: !correct ? results.wrongAnswers + 1 : results.wrongAnswers,
    totalQuestions: quizQuestions.length
  };
    // Handle consecutive correct answers
    if (correct) {
      const newCount = consecutiveCorrect + 1;
      setConsecutiveCorrect(newCount);
      
      if (newCount % 3 === 0) {
        setShowCongrats(true);
        setTimeout(() => setShowCongrats(false), 2000);
      }
    } else {
      setConsecutiveCorrect(0);
    }
    // ...existing code...
<div className="options-container">
  {["option1", "option2", "option3", "option4"].map((key, idx) => {
    const isSelected = selectedOption === (idx + 1).toString();
    const isCorrect = currentQuestion.correctOption === (idx + 1).toString();
    return (
      <div
        key={key}
        className={`option${isSelected ? " selected" : ""}${showFeedback && isCorrect ? " correct" : ""}${showFeedback && isSelected && !isCorrect ? " wrong" : ""}`}
        onClick={() => !showFeedback && setSelectedOption((idx + 1).toString())}
      >
        <span className="option-label">{String.fromCharCode(65 + idx)}</span>
        <span className="option-text">{currentQuestion[key]}</span>
      </div>
    );
  })}
</div>
// ...existing code...
      setTimeout(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setResults(updatedResults);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setResults(updatedResults);
      onQuizComplete(updatedResults);
    }
  }, 1500);


// ...existing code...
  };

  const getOptionClass = (option) => {
    if (!showFeedback) {
      return selectedOption === option ? 'selected' : '';
    }
    
    if (option === quizQuestions[currentQuestionIndex].correctOption) {
      return 'correct';
    }
    
    if (selectedOption === option && !isCorrect) {
      return 'wrong';
    }
    
    return '';
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (quizQuestions.length === 0) {
    return (
      <div className="quiz-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{language === 'English' ? 'Loading questions...' : 'கேள்விகள் ஏற்றப்படுகின்றன...'}</p>
          <button className="back-button" onClick={onBack}>
            {language === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {showStartPopup && (
        <Popup 
          message={
            language === 'English' 
              ? 'The Test is going to start in' 
              : 'தேர்வு தொடங்குவதற்கு'
          }
          timer={timeLeft}
          onClose={() => setShowStartPopup(false)}
        />
      )}
      
      {showCongrats && (
        <div className="congrats-message">
          {language === 'English' 
            ? `Congratulations! ${consecutiveCorrect} correct answers in a row!` 
            : `வாழ்த்துக்கள்! தொடர்ச்சியாக ${consecutiveCorrect} சரியான பதில்கள்!`}
        </div>
      )}
      
      <div className="quiz-header">
        <button className="back-button" onClick={onBack}>
          ← {language === 'English' ? 'Back' : 'திரும்ப'}
        </button>
        <div className="quiz-progress">
          {language === 'English' ? 'Question' : 'கேள்வி'} {currentQuestionIndex + 1} {language === 'English' ? 'of' : 'மொத்தம்'} {quizQuestions.length}
        </div>
        <div className="quiz-level">
          {level === 'beginner' && '🟢'}
          {level === 'intermediate' && '🟡'}
          {level === 'advanced' && '🔴'}
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </div>
      </div>
      
      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-container">
         
  {["option1", "option2", "option3", "option4"].map((key, idx) => {
    const isSelected = selectedOption === (idx + 1).toString();
    const isCorrect = currentQuestion.correctOption === (idx + 1).toString();
    return (
      <div
        key={key}
        className={`option${isSelected ? " selected" : ""}${showFeedback && isCorrect ? " correct" : ""}${showFeedback && isSelected && !isCorrect ? " wrong" : ""}`}
        onClick={() => !showFeedback && setSelectedOption((idx + 1).toString())}
      >
        <span className="option-label">{String.fromCharCode(65 + idx)}</span>
        <span className="option-text">{currentQuestion[key]}</span>
      </div>
    );
  })}
</div>
        
        
        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={selectedOption === null || showFeedback}
        >
          {language === 'English' ? 'Submit Answer' : 'பதிலைச் சமர்ப்பிக்கவும்'}
        </button>
      </div>
      
      <div className="quiz-footer">
        <div className="streak-counter">
          {language === 'English' ? 'Streak' : 'வரிசை'}: {consecutiveCorrect}
        </div>
      </div>
    </div>
  );
};

export default Quiz;