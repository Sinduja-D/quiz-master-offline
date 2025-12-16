// src/components/QuizResults.js (modified)
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import QuizReview from './QuizReview';
import './QuizResults.css';

const QuizResults = ({ results, questions, userAnswers, language, onRestart, onHome }) => {
  const [showReview, setShowReview] = useState(false);
  
  // Calculate percentage safely
  const percentage = results.totalQuestions > 0 
    ? Math.round((results.correctAnswers / results.totalQuestions) * 100)
    : 0;
  
  // Trigger confetti when user scores 100%
  useEffect(() => {
    if (percentage === 100) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1a2a6c', '#2a3a7c', '#3498db', '#2980b9', '#5dade2'],
        shapes: ['circle', 'square'],
        gravity: 0.8,
        drift: 1,
      });
      
      // Add a second burst after a delay for more celebration
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          shapes:['star'],
          colors: ['#1a2a6c', '#2a3a7c', '#3498db', '#2980b9', '#5dade2'],
        });
      }, 300);
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          shapes:['star'],
          colors: ['#1a2a6c', '#2a3a7c', '#3498db', '#2980b9', '#5dade2'],
        });
      }, 600);
    }
  }, [percentage]);
  
  let performanceMessage = '';
  if (percentage >= 80) {
    performanceMessage =
      language === 'English'
        ? 'Excellent! You did a great job!'
        : 'சிறப்பு! நீங்கள் சிறப்பாகச் செய்தீர்கள்!';
  } else if (percentage >= 60) {
    performanceMessage =
      language === 'English'
        ? 'Good job! Keep practicing!'
        : 'நன்று! பயிற்சி செய்து கொண்டே இருங்கள்!';
  } else {
    performanceMessage =
      language === 'English'
        ? 'Keep trying! Practice makes perfect!'
        : 'முயற்சி செய்து கொண்டே இருங்கள்! பயிற்சி மனிதனை நிபுணராக்கும்!';
  }
  
  // Special message for perfect score
  const perfectScoreMessage = language === 'English' 
    ? 'Perfect Score!' 
    : 'முழு மதிப்பெண்! அற்புதமான செயல்!';
    
  // If showReview is true, render the QuizReview component
  if (showReview) {
    return (
      <QuizReview 
        questions={questions}
        userAnswers={userAnswers}
        language={language}
        onBack={() => setShowReview(false)}
      />
    );
  }
    
  return (
    <div className="results-container">
      <div className="results-card">
        {/* Header */}
        <div className="results-header">
          <h2>{language === 'English' ? 'Quiz Results' : 'வினா முடிவுகள்'}</h2>
        </div>
        
        {/* Perfect Score Celebration */}
        {percentage === 100 && (
          <div className="perfect-score-celebration">
            <div className="perfect-score-icon">🏆</div>
            <div className="perfect-score-text">{perfectScoreMessage}</div>
          </div>
        )}
        
        {/* Performance Message */}
        <div className="performance-message">{performanceMessage}</div>
        
        {/* Score Circle */}
        <div className={`score-circle ${percentage === 100 ? 'perfect-score' : ''}`}>
          <div className="score-percentage">{percentage}%</div>
        </div>
        
        {/* Stats */}
        <div className="results-stats">
          <div className="stat-item">
            <div className="stat-value">{results.totalQuestions || 0}</div>
            <div className="stat-label">
              {language === 'English' ? 'Total Questions' : 'மொத்த கேள்விகள்'}
            </div>
          </div>
          <div className="stat-item correct">
            <div className="stat-value">{results.correctAnswers || 0}</div>
            <div className="stat-label">
              {language === 'English' ? 'Correct' : 'சரியானவை'}
            </div>
          </div>
          <div className="stat-item wrong">
            <div className="stat-value">{results.wrongAnswers || 0}</div>
            <div className="stat-label">
              {language === 'English' ? 'Wrong' : 'தவறானவை'}
            </div>
          </div>
        </div>
        
        {/* Weak Topics Section */}
        {results.incorrectConcepts && results.incorrectConcepts.length > 0 && (
          <div className="weak-topics">
            <h3>
              {language === 'English'
                ? 'Areas for Improvement'
                : 'மேம்படுத்த வேண்டிய தலைப்புகள்'}
            </h3>
            <p>
              {language === 'English'
                ? 'Focus on these concepts to improve your score:'
                : 'உங்கள் மதிப்பெண்ணை மேம்படுத்த இந்த கருத்துகளில் கவனம் செலுத்தவும்:'}
            </p>
            <ul>
              {results.incorrectConcepts.map((concept, index) => (
                <li key={index}>{concept}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Actions */}
        <div className="results-actions">
          <button className="action-button review" onClick={() => setShowReview(true)}>
            {language === 'English'
              ? 'Review Answers'
              : 'பதில்களை மதிப்பாய்வு செய்யுங்கள்'}
          </button>
          <button className="action-button restart" onClick={onRestart}>
            {language === 'English'
              ? 'Restart Quiz'
              : 'வினாவை மீண்டும் தொடங்கு'}
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