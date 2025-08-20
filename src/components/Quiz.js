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
} from '../data';
import './Quiz.css';

const Quiz = ({ language, level, numberOfQuestions, onQuizComplete }) => {
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
        case 'Beginner': return questions_tamil_beginner;
        case 'Intermediate': return questions_tamil_intermediate;
        case 'Advanced': return questions_tamil_advanced;
        default: return questions_tamil_beginner;
      }
    } else {
      switch(level) {
        case 'Beginner': return questions_english_beginner;
        case 'Intermediate': return questions_english_intermediate;
        case 'Advanced': return questions_english_advanced;
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
    setResults(prev => ({
      ...prev,
      correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: !correct ? prev.wrongAnswers + 1 : prev.wrongAnswers
    }));
    
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
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        // Quiz completed
        onQuizComplete(results);
      }
    }, 1500);
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
        {language === 'English' ? 'Loading questions...' : 'கேள்விகள் ஏற்றப்படுகின்றன...'}
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
        <div className="quiz-progress">
          {language === 'English' ? 'Question' : 'கேள்வி'} {currentQuestionIndex + 1} {language === 'English' ? 'of' : 'மொத்தம்'} {quizQuestions.length}
        </div>
        <div className="quiz-level">
          {level === 'Beginner' && '🟢'}
          {level === 'Intermediate' && '🟡'}
          {level === 'Advanced' && '🔴'}
          {level}
        </div>
      </div>
      
      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-container">
          <div 
            className={`option ${getOptionClass(1)}`}
            onClick={() => handleOptionSelect(1)}
          >
            <span className="option-label">A</span>
            <span className="option-text">{currentQuestion.option1}</span>
          </div>
          
          <div 
            className={`option ${getOptionClass(2)}`}
            onClick={() => handleOptionSelect(2)}
          >
            <span className="option-label">B</span>
            <span className="option-text">{currentQuestion.option2}</span>
          </div>
          
          <div 
            className={`option ${getOptionClass(3)}`}
            onClick={() => handleOptionSelect(3)}
          >
            <span className="option-label">C</span>
            <span className="option-text">{currentQuestion.option3}</span>
          </div>
          
          <div 
            className={`option ${getOptionClass(4)}`}
            onClick={() => handleOptionSelect(4)}
          >
            <span className="option-label">D</span>
            <span className="option-text">{currentQuestion.option4}</span>
          </div>
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
