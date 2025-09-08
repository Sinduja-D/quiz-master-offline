import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './QuizResults.css';

const QuizResults = ({ results, language, onRestart, onHome }) => {
  const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
  
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
          colors: ['#1a2a6c', '#2a3a7c', '#3498db', '#2980b9', '#5dade2'],
        });
      }, 300);
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
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
    ? 'Perfect Score! Amazing job!' 
    : 'முழு மதிப்பெண்! அற்புதமான செயல்!';
    
  return (
    <div className="results-container">
      <div className="results-card">
        {/* Header */}
        <div className="results-header">
          {/*<button className="back-button" onClick={onHome}>
            ← {language === 'English' ? 'Back to Home' : 'முகப்பிற்குச் செல்ல'}
          </button>*/}
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