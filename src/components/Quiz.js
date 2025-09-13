import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import confetti from 'canvas-confetti';
import './Quiz.css';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Quiz = ({ language, level, numberOfQuestions, subject, grade, onQuizComplete, onBack, candidateName }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0); // Track max streak
  const [showCongrats, setShowCongrats] = useState(false);
  // Timer for start popup
  const [timeLeft, setTimeLeft] = useState(5);
  // Timer for each question
  const [questionTimeLeft, setQuestionTimeLeft] = useState(60);
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
  const [showLanguageWarning, setShowLanguageWarning] = useState(false);
  const [achievementNotification, setAchievementNotification] = useState(null);
  // Store user answers for each question
  const [userAnswers, setUserAnswers] = useState({});
  // Track which questions have been submitted
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  // Track hints requested for each question
  const [hintsRequested, setHintsRequested] = useState({});
  // Track current display language (can be different from the initial language)
  const [displayLanguage, setDisplayLanguage] = useState(language);
  
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
  
  // Function to trigger confetti for streak achievements
  const triggerStreakConfetti = (streakCount) => {
    let confettiConfig = {
      particleCount: streakCount * 50,
      spread: 70 + streakCount * 5,
      origin: { y: 0.6 },
      colors: ['#FF4500', '#FF8C00', '#FFA500'],
      shapes: ['star'],
      gravity: 0.8,
      drift: 1,
    };
    confetti(confettiConfig);
  };
  
  // Function to show achievement notification
  const showAchievementNotification = (achievementId, achievementTitle) => {
    setAchievementNotification({
      id: achievementId,
      title: achievementTitle
    });
    setTimeout(() => {
      setAchievementNotification(null);
    }, 3000);
  };
  
  // Fetch questions from local JSON (only once when component mounts)
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Import dynamically to avoid issues with SSR
        const { fetchLocalQuestions } = await import('../data/localDataService');
        // Fetch questions with initial language, but we'll get both versions
        const data = await fetchLocalQuestions({
          difficulty: level,
          grade: parseInt(grade),
          subject: subject,
          language: language,
          limit: numberOfQuestions
        });
        
        if (data.length === 0) {
          setError(`No questions found for ${subject} Grade ${grade} (${level} level)`);
          setQuizQuestions([]);
        } else {
          // Questions are already shuffled in the service
          setQuizQuestions(data);
          setDisplayLanguage(language); // Set initial display language
          setResults({
            totalQuestions: data.length,
            correctAnswers: 0,
            wrongAnswers: 0,
            incorrectConcepts: [],
            hintsUsed: 0,
            startTime: new Date(),
            endTime: null
          });
          
          // Initialize user answers, submitted questions, and hints requested
          const initialAnswers = {};
          const initialSubmitted = {};
          const initialHints = {};
          data.forEach((_, index) => {
            initialAnswers[index] = null;
            initialSubmitted[index] = false;
            initialHints[index] = false;
          });
          setUserAnswers(initialAnswers);
          setSubmittedQuestions(initialSubmitted);
          setHintsRequested(initialHints);
        }
      } catch (err) {
        console.error('Error loading local questions:', err);
        setError('Failed to load questions. Please try again later.');
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
  }, [level, numberOfQuestions, subject, grade]); // Removed language from dependencies
  
  // Prevent user from leaving quiz page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!showStartPopup && quizQuestions.length > 0) {
        const message = displayLanguage === 'English'
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
  }, [displayLanguage, showStartPopup, quizQuestions.length]);
  
  // Start popup countdown
  useEffect(() => {
    if (showStartPopup && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (showStartPopup && timeLeft === 0) {
      setShowStartPopup(false);
    }
  }, [showStartPopup, timeLeft]);
  
  // Per-question countdown
  useEffect(() => {
    if (showStartPopup) return; // don't run until quiz starts
    if (questionTimeLeft === 0) {
      handleNext(); // auto next when timer ends
      return;
    }
    const timer = setInterval(() => {
      setQuestionTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [questionTimeLeft, showStartPopup]);
  
  // Restore saved answer when changing questions
  useEffect(() => {
    if (quizQuestions.length > 0) {
      setSelectedOption(userAnswers[currentQuestionIndex] || null);
      setShowFeedback(submittedQuestions[currentQuestionIndex] || false);
      setShowHint(hintsRequested[currentQuestionIndex] || false);
    }
  }, [currentQuestionIndex, userAnswers, submittedQuestions, hintsRequested, quizQuestions.length]);
  
  // Update display language when language prop changes
  useEffect(() => {
    setDisplayLanguage(language);
    // Reset hint visibility when language changes
    setShowHint(false);
  }, [language]);
  
  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      setSelectedOption(option);
      // Save the answer
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: option
      }));
    }
  };
  
  const handleHintClick = () => {
    setShowHint(true);
    // Mark that hint was requested for this question
    setHintsRequested(prev => ({
      ...prev,
      [currentQuestionIndex]: true
    }));
    setResults(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1
    }));
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correctOptionKey = mapCorrectOption(currentQuestion.correctOption);
    const correct = selectedOption === correctOptionKey;
    setShowFeedback(true);
    
    // Mark this question as submitted
    setSubmittedQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: true
    }));
    
    // Update results
    const updatedResults = {
      ...results,
      correctAnswers: correct ? results.correctAnswers + 1 : results.correctAnswers,
      wrongAnswers: !correct ? results.wrongAnswers + 1 : results.wrongAnswers,
      incorrectConcepts: !correct && currentQuestion.concept && !results.incorrectConcepts.includes(currentQuestion.concept)
        ? [...results.incorrectConcepts, currentQuestion.concept]
        : results.incorrectConcepts,
    };
    setResults(updatedResults);
    
    if (!correct && currentQuestion.concept) setShowConcept(true);
    
    if (correct) {
      const newCount = consecutiveCorrect + 1;
      setConsecutiveCorrect(newCount);
      
      // Update max streak if current streak is higher
      if (newCount > maxStreak) {
        setMaxStreak(newCount);
      }
      
      // Check for streak achievements
      if ([3, 5, 10, 15, 20, 25, 30].includes(newCount)) {
        setShowCongrats(true);
        triggerStreakConfetti(newCount);
        showAchievementNotification(`streak_${newCount}`, `${newCount} Correct in a Row!`);
        setTimeout(() => setShowCongrats(false), 2000);
      }
    } else {
      setConsecutiveCorrect(0);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionTimeLeft(60); // reset timer on next question
      // Reset hint visibility for the next question
      setShowHint(false);
    } else {
      // Calculate total time taken for the quiz
      const totalTimeTaken = Math.floor((new Date() - results.startTime) / 1000);
      
      // Calculate allotted time (60 seconds per question)
      const allottedTime = quizQuestions.length * 60;
      
      const finalResults = {
        ...results,
        consecutiveCorrect: consecutiveCorrect,
        maxStreak: maxStreak, // Pass the tracked max streak
        endTime: new Date(),
        timeTaken: totalTimeTaken,
        allottedTime: allottedTime
      };
      onQuizComplete(finalResults);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionTimeLeft(60); // reset timer on previous question
      // Reset hint visibility for the previous question
      setShowHint(false);
    }
  };
  
  const handleBackClick = () => {
    const confirmMessage = displayLanguage === 'English'
      ? 'Are you sure you want to exit the quiz? Your progress will be lost.'
      : 'நீங்கள் வினாவிலிருந்து வெளியேற விரும்புகிறீர்களா? உங்கள் முன்னேற்றம் இழக்கப்படும்.';
    if (window.confirm(confirmMessage)) {
      onBack();
    }
  };
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Get question content based on current display language
  const getQuestionContent = () => {
    if (!currentQuestion) return null;
    
    if (displayLanguage === 'Tamil') {
      return {
        question: currentQuestion.tamilQuestion,
        optionA: currentQuestion.tamOpt1,
        optionB: currentQuestion.tamOpt2,
        optionC: currentQuestion.tamOpt3,
        optionD: currentQuestion.tamOpt4,
        hint: currentQuestion.tamilHint,
        concept: currentQuestion.tamilConcept
      };
    } else {
      return {
        question: currentQuestion.englishQuestion,
        optionA: currentQuestion.engOpt1,
        optionB: currentQuestion.engOpt2,
        optionC: currentQuestion.engOpt3,
        optionD: currentQuestion.engOpt4,
        hint: currentQuestion.englishHint,
        concept: currentQuestion.englishConcept
      };
    }
  };
  
  const questionContent = getQuestionContent();
  
  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{displayLanguage === 'English' ? 'Loading questions...' : 'கேள்விகள் ஏற்றப்படுகின்றன...'}</p>
          <button className="back-button" onClick={onBack}>
            {displayLanguage === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
          </button>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quiz-error">
        <h3>{displayLanguage === 'English' ? 'Error' : 'பிழை'}</h3>
        <p>{error}</p>
        <button className="back-button" onClick={onBack}>
          {displayLanguage === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
        </button>
      </div>
    );
  }
  
  if (quizQuestions.length === 0) {
    return (
      <div className="quiz-empty">
        <h3>{displayLanguage === 'English' ? 'No Questions Found' : 'கேள்விகள் இல்லை'}</h3>
        <button className="back-button" onClick={onBack}>
          {displayLanguage === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
        </button>
      </div>
    );
  }
  
  return (
    <div className="quiz-container">
      {showStartPopup && <Popup
        message={displayLanguage === 'English' ? 'The Test is going to start in' : 'தேர்வு தொடங்குவதற்கு'}
        timer={timeLeft}
        onClose={() => setShowStartPopup(false)}
      />}
      
      {showLanguageWarning && (
        <div className="language-warning-popup">
          <div className="popup-content">
            <p>{displayLanguage === 'English'
              ? 'You are not allowed to change the language after starting the quiz'
              : 'வினா தொடங்கிய பிறகு மொழியை மாற்ற அனுமதிக்கப்படவில்லை'}</p>
          </div>
        </div>
      )}
      
      {achievementNotification && (
        <div className="achievement-notification">
          <div className="notification-content">
            <div className="notification-icon">🏆</div>
            <div className="notification-text">
              <div className="notification-title">
                {displayLanguage === 'English' ? 'Achievement Unlocked!' : 'சாதனை திறக்கப்பட்டது!'}
              </div>
              <div className="notification-name">
                {achievementNotification.title}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="quiz-header">
        <div className="header-left">
          <button className="back-button-header" onClick={handleBackClick}>
            ← {displayLanguage === 'English' ? 'Back' : 'திரும்ப'}
          </button>
        </div>
        <div className="header-center">
          <div className="quiz-progress">
            {displayLanguage === 'English' ? 'Question' : 'கேள்வி'} {currentQuestionIndex + 1} {displayLanguage === 'English' ? 'of' : 'மொத்தம்'} {quizQuestions.length}
          </div>
        </div>
        <div className="header-right">
          <div className="quiz-level">
            {level === 'beginner'}
            {level === 'intermediate'}
            {level === 'advance'}
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </div>
          <div className="quiz-timer">
            ⏱ {questionTimeLeft}s
          </div>
          {currentQuestion && !showFeedback && (
            <button
              className="hint-button-header"
              onClick={handleHintClick}
              title={displayLanguage === 'English' ? 'Get a hint' : 'குறிப்பு பெறுங்கள்'}
            >
              💡
            </button>
          )}
        </div>
      </div>
      
      <div className="question-container">
        <h2 className="question-text">{questionContent?.question}</h2>
        
        {showHint && questionContent?.hint && (
          <div className="hint-card">
            <div className="hint-header">
              <span className="hint-icon">💡</span>
              <span className="hint-title">{displayLanguage === 'English' ? 'Hint' : 'குறிப்பு'}</span>
            </div>
            <div className="hint-content">
              {questionContent.hint}
            </div>
          </div>
        )}
        
        <div className="options-container">
          {['optionA', 'optionB', 'optionC', 'optionD'].map((key, idx) => {
            const isSelected = selectedOption === key;
            const isCorrect = mapCorrectOption(currentQuestion.correctOption) === key;
            return (
              <div
                key={key}
                className={`option ${isSelected ? 'selected' : ''} ${showFeedback && isCorrect ? 'correct' : ''} ${showFeedback && isSelected && !isCorrect ? 'wrong' : ''}`}
                onClick={() => !showFeedback && handleOptionSelect(key)}
              >
                <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{questionContent[key]}</span>
              </div>
            );
          })}
        </div>
        
        {showFeedback && questionContent?.concept && (
          <div className="concept-card">
            <div className="concept-header" onClick={() => setShowConcept(!showConcept)}>
              <span className="concept-icon">📚</span>
              <span className="concept-title">{displayLanguage === 'English' ? 'Related Concept' : 'தொடர்புடைய கருத்து'}</span>
              <span className="concept-toggle">{showConcept ? '▲' : '▼'}</span>
            </div>
            {showConcept && (
              <div className="concept-content">
                {questionContent.concept}
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
                {displayLanguage === 'English'
                  ? `Congratulations ${candidateName || ''}!`
                  : `வாழ்த்துக்கள் ${candidateName || ''}!`}
              </div>
              <div className="congrats-streak">{consecutiveCorrect}</div>
              <div className="congrats-subtitle">
                {displayLanguage === 'English' ? 'Correct Answers in a Row!' : 'தொடர்ச்சியாக சரியான பதில்கள்!'}
              </div>
            </div>
          </div>
        )}
        
        <div className="quiz-actions">
          {currentQuestionIndex > 0 && (
            <button
              className="previous-button"
              onClick={handlePrevious}
            >
              ← {displayLanguage === 'English' ? 'Previous' : 'முந்தைய '}
            </button>
          )}
          {!showFeedback ?
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={selectedOption === null}
            >
              {displayLanguage === 'English' ? 'Submit Answer' : 'பதிலைச் சமர்ப்பிக்கவும்'}
            </button>
            :
            <button
              className="next-button"
              onClick={handleNext}
            >
              {currentQuestionIndex < quizQuestions.length - 1
                ? (displayLanguage === 'English' ? 'Next Question →' : 'அடுத்த கேள்வி →')
                : (displayLanguage === 'English' ? 'Finish Quiz' : 'வினாடி வினா முடி')}
            </button>
          }
        </div>
      </div>
      
      <div className="quiz-footer">
        <div className="streak-counter">
          🔥 {displayLanguage === 'English' ? 'Streak' : 'வரிசை'}: {consecutiveCorrect}
        </div>
      </div>
    </div>
  );
};

export default Quiz;