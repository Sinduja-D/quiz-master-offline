
// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import './Quiz.css';

const Quiz = ({ language, level, numberOfQuestions, subject, grade, onQuizComplete, onBack }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [showStartPopup, setShowStartPopup] = useState(true);
  const [results, setResults] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    incorrectConcepts: [],
    hintsUsed: 0,
    startTime: null,
    endTime: null
  });
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState({
    server: false,
    database: false,
    questions: false
  });
  const [showLanguageWarning, setShowLanguageWarning] = useState(false);
  
  // ✅ Use .env for API
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  // Map correct option from database (1,2,3,4) to frontend keys (optionA, optionB, etc.)
  const mapCorrectOption = (correctOption) => {
    const optionMap = {
      '1': 'optionA',
      '2': 'optionB',
      '3': 'optionC',
      '4': 'optionD'
    };
    return optionMap[correctOption] || correctOption;
  };
  
  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      setConnectionStatus({ server: false, database: false, questions: false });
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        // ✅ Use correct API endpoint and no subject mapping
        const queryParams = new URLSearchParams({
          language: language,
          difficulty: level,
          subject: subject, // Use subject directly
          grade: parseInt(grade),
          limit: numberOfQuestions
        });
        
        const response = await fetch(`${API_URL}/api/questions?${queryParams.toString()}`, { 
          signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.message) {
          setError(data.message);
          setQuizQuestions([]);
        } else {
          setQuizQuestions(data);
          setResults({ 
            totalQuestions: data.length, 
            correctAnswers: 0, 
            wrongAnswers: 0, 
            incorrectConcepts: [],
            hintsUsed: 0,
            startTime: new Date(), // Set start time when quiz begins
            endTime: null
          });
          setConnectionStatus({ server: true, database: true, questions: true });
        }
      } catch (err) {
        setError(err.message || 'Failed to load questions. Please try again later.');
        setQuizQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (level && subject && grade && numberOfQuestions) {
      fetchQuestions();
    } else {
      setLoading(false);
    }
  }, [language, level, numberOfQuestions, subject, grade, retryCount]);
  
  const handleRetry = () => setRetryCount(prev => prev + 1);
  
  // Prevent user from leaving the quiz page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!showStartPopup && quizQuestions.length > 0) {
        const message = language === 'English' 
          ? 'Are you sure you want to leave? Your progress will be lost.' 
          : 'நீங்கள் வெளியேற விரும்புகிறீர்களா? உங்கள் முன்னேற்றம் இழக்கப்படும்.';
        e.returnValue = message;
        return message;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [language, showStartPopup, quizQuestions.length]);
  
  useEffect(() => {
    if (showStartPopup && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (showStartPopup && timeLeft === 0) {
      setShowStartPopup(false);
    }
  }, [showStartPopup, timeLeft]);
  
  const handleOptionSelect = (option) => {
    if (!showFeedback) setSelectedOption(option);
  };
  
  const handleHintClick = () => {
    setShowHint(true);
    setResults(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1
    }));
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Map the correct option from the database
    const correctOptionKey = mapCorrectOption(currentQuestion.correctOption);
    const correct = selectedOption === correctOptionKey;
    
    setShowFeedback(true);
    if (!correct && currentQuestion.concept) setShowConcept(true);
    
    const updatedResults = {
      ...results,
      correctAnswers: correct ? results.correctAnswers + 1 : results.correctAnswers,
      wrongAnswers: !correct ? results.wrongAnswers + 1 : results.wrongAnswers,
      totalQuestions: quizQuestions.length,
      incorrectConcepts: !correct && currentQuestion.concept && !results.incorrectConcepts.includes(currentQuestion.concept)
        ? [...results.incorrectConcepts, currentQuestion.concept]
        : results.incorrectConcepts,
      consecutiveCorrect: correct ? consecutiveCorrect + 1 : 0 // Track consecutive correct
    };
    
    setResults(updatedResults);
    
    if (correct) {
      const newCount = consecutiveCorrect + 1;
      setConsecutiveCorrect(newCount);
      if (newCount % 3 === 0 || newCount === 5 || newCount === 10) {
        setShowCongrats(true);
        setTimeout(() => setShowCongrats(false), 2000);
      }
    } else {
      setConsecutiveCorrect(0);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setShowHint(false);
      setShowConcept(false);
    } else {
      // Set end time and pass the consecutiveCorrect streak to results
      const finalResults = {
        ...results,
        consecutiveCorrect: consecutiveCorrect,
        endTime: new Date()
      };
      onQuizComplete(finalResults);
    }
  };
  
  const handleBackClick = () => {
    const confirmMessage = language === 'English' 
      ? 'Are you sure you want to exit the quiz? Your progress will be lost.' 
      : 'நீங்கள் வினாவிலிருந்து வெளியேற விரும்புகிறீர்களா? உங்கள் முன்னேற்றம் இழக்கப்படும்.';
    
    if (window.confirm(confirmMessage)) {
      onBack();
    }
  };
  
  const handleLanguageChangeAttempt = () => {
    setShowLanguageWarning(true);
    setTimeout(() => setShowLanguageWarning(false), 3000);
  };
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{language === 'English' ? 'Loading questions...' : 'கேள்விகள் ஏற்றப்படுகின்றன...'}</p>
          <div className="connection-status">
            <ul>
              <li>Server: {connectionStatus.server ? '✅ Connected' : '⏳ Checking...'}</li>
              <li>Database: {connectionStatus.database ? '✅ Connected' : '⏳ Checking...'}</li>
              <li>Questions: {connectionStatus.questions ? '✅ Loaded' : '⏳ Loading...'}</li>
            </ul>
          </div>
          <button className="back-button" onClick={onBack}>
            {language === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
          </button>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quiz-error">
        <h3>{language === 'English' ? 'Error' : 'பிழை'}</h3>
        <p>{error}</p>
        <button className="retry-button" onClick={handleRetry}>
          {language === 'English' ? 'Try Again' : 'மீண்டும் முயற்சிக்கவும்'}
        </button>
        <button className="back-button" onClick={onBack}>
          {language === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
        </button>
      </div>
    );
  }
  
  if (quizQuestions.length === 0) {
    return (
      <div className="quiz-empty">
        <h3>{language === 'English' ? 'No Questions Found' : 'கேள்விகள் இல்லை'}</h3>
        <button className="back-button" onClick={onBack}>
          {language === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
        </button>
      </div>
    );
  }
  
  return (
    <div className="quiz-container">
      {showStartPopup && <Popup 
        message={language === 'English' ? 'The Test is going to start in' : 'தேர்வு தொடங்குவதற்கு'} 
        timer={timeLeft} 
        onClose={() => setShowStartPopup(false)} 
      />}
      
      {showLanguageWarning && (
        <div className="language-warning-popup">
          <div className="popup-content">
            <p>{language === 'English' 
              ? 'You are not allowed to change the language after starting the quiz' 
              : 'வினா தொடங்கிய பிறகு மொழியை மாற்ற அனுமதிக்கப்படவில்லை'}</p>
          </div>
        </div>
      )}
      
      <div className="quiz-header">
        <button className="back-button" onClick={handleBackClick}>
          ← {language === 'English' ? 'Back' : 'திரும்ப'}
        </button>
        <div className="quiz-progress">
          {language === 'English' ? 'Question' : 'கேள்வி'} {currentQuestionIndex + 1} {language === 'English' ? 'of' : 'மொத்தம்'} {quizQuestions.length}
        </div>
        <div className="quiz-level">
          {level === 'beginner' && '🟢'}
          {level === 'intermediate' && '🟡'}
          {level === 'advance' && '🔴'} {/* Fixed: was 'advanced' */}
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </div>
        {currentQuestion.hint && !showFeedback && (
          <button 
            className="hint-button-header"
            onClick={handleHintClick} // Use our new hint click handler
            title={language === 'English' ? 'Get a hint' : 'குறிப்பு பெறுங்கள்'}
          >
            💡
          </button>
        )}
      </div>
      
      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        {showHint && (
          <div className="hint-card">
            <div className="hint-header">
              <span className="hint-icon">💡</span>
              <span className="hint-title">{language === 'English' ? 'Hint' : 'குறிப்பு'}</span>
            </div>
            <div className="hint-content">
              {currentQuestion.hint}
            </div>
          </div>
        )}
        
        <div className="options-container">
          {['optionA','optionB','optionC','optionD'].map((key, idx) => {
            const isSelected = selectedOption === key;
            const isCorrect = mapCorrectOption(currentQuestion.correctOption) === key;
            return (
              <div
                key={key}
                className={`option ${isSelected ? ' selected' : ''}${showFeedback && isCorrect ? ' correct' : ''}${showFeedback && isSelected && !isCorrect ? ' wrong' : ''}`}
                onClick={() => !showFeedback && handleOptionSelect(key)}
              >
                <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{currentQuestion[key]}</span>
              </div>
            );
          })}
        </div>
        
        {showFeedback && currentQuestion.concept && (
          <div className="concept-card">
            <div className="concept-header" onClick={() => setShowConcept(!showConcept)}>
              <span className="concept-icon">📚</span>
              <span className="concept-title">{language === 'English' ? 'Related Concept' : 'தொடர்புடைய கருத்து'}</span>
              <span className="concept-toggle">{showConcept ? '▲' : '▼'}</span>
            </div>
            {showConcept && (
              <div className="concept-content">
                {currentQuestion.concept}
              </div>
            )}
          </div>
        )}
        
        {showCongrats && (
          <div className="congrats-container">
            {[...Array(50)].map((_, i) => (
              <div key={`glitter-${i}`} className="glitter"></div>
            ))}
            
            <div className="congrats-message">
              <div className="congrats-title">
                {language === 'English' ? 'Congratulations!' : 'வாழ்த்துக்கள்!'}
              </div>
              <div className="congrats-streak">{consecutiveCorrect}</div>
              <div className="congrats-subtitle">
                {language === 'English' ? 'Correct Answers in a Row!' : 'தொடர்ச்சியாக சரியான பதில்கள்!'}
              </div>
            </div>
          </div>
        )}
        
        <div className="quiz-actions">
          {!showFeedback && 
            <button 
              className="submit-button" 
              onClick={handleSubmit} 
              disabled={selectedOption===null}
            >
              {language==='English'?'Submit Answer':'பதிலைச் சமர்ப்பிக்கவும்'}
            </button>
          }
          {showFeedback && 
            <button 
              className="next-button" 
              onClick={handleNext}
            >
              {currentQuestionIndex < quizQuestions.length - 1 
                ? (language==='English'?'Next Question →':'அடுத்த கேள்வி →') 
                : (language==='English'?'Finish Quiz':'வினாடி வினா முடி')}
            </button>
          }
        </div>
      </div>
      
      <div className="quiz-footer">
        <div className="streak-counter">
          🔥 {language==='English'?'Streak':'வரிசை'}: {consecutiveCorrect}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
