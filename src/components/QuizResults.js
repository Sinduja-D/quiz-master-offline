import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import QuizReview from "./QuizReview";
import "./QuizResults.css";

const QuizResults = ({
  results,
  questions,
  userAnswers,
  language,
  onRestart,
  onHome,
}) => {
  const [showReview, setShowReview] = useState(false);

  const percentage =
    results.totalQuestions > 0
      ? Math.round(
          (results.correctAnswers / results.totalQuestions) * 100
        )
      : 0;

  useEffect(() => {
    if (percentage === 100) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [percentage]);

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
    /* ✅ FIXED WRAPPER */
    <div className="quiz-results-wrapper">
      <div className="results-container">
        <div className="results-card">
          {/* Header */}
          <div className="results-header">
            <h2>
              {language === "English" ? "Quiz Results" : "வினா முடிவுகள்"}
            </h2>
          </div>

          {/* Perfect Score */}
          {percentage === 100 && (
            <div className="perfect-score-celebration">
              <div className="perfect-score-icon">🏆</div>
              <div className="perfect-score-text">
                {language === "English"
                  ? "Perfect Score!"
                  : "முழு மதிப்பெண்!"}
              </div>
            </div>
          )}

          {/* Performance Message */}
          <div className="performance-message">
            {percentage >= 80
              ? language === "English"
                ? "Excellent! You did a great job!"
                : "சிறப்பு!"
              : percentage >= 60
              ? language === "English"
                ? "Good job! Keep practicing!"
                : "நன்று! பயிற்சி செய்யுங்கள்!"
              : language === "English"
              ? "Keep trying!"
              : "முயற்சி தொடருங்கள்!"}
          </div>

          {/* Score */}
          <div className="score-circle">
            <div className="score-percentage">{percentage}%</div>
          </div>

          {/* Stats */}
          <div className="results-stats">
            <div className="stat-item">
              <div className="stat-value">
                {results.totalQuestions || 0}
              </div>
              <div className="stat-label">
                {language === "English"
                  ? "Total"
                  : "மொத்தம்"}
              </div>
            </div>

            <div className="stat-item correct">
              <div className="stat-value">
                {results.correctAnswers || 0}
              </div>
              <div className="stat-label">
                {language === "English"
                  ? "Correct"
                  : "சரி"}
              </div>
            </div>

            <div className="stat-item wrong">
              <div className="stat-value">
                {results.wrongAnswers || 0}
              </div>
              <div className="stat-label">
                {language === "English"
                  ? "Wrong"
                  : "தவறு"}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="results-actions">
            <button
              className="action-button review"
              onClick={() => setShowReview(true)}
            >
              {language === "English"
                ? "Review Answers"
                : "பதில்களை பார்க்க"}
            </button>

            <button
              className="action-button restart"
              onClick={onRestart}
            >
              {language === "English"
                ? "Restart Quiz"
                : "மீண்டும் தொடங்கு"}
            </button>

            <button
              className="action-button home"
              onClick={onHome}
            >
              {language === "English"
                ? "Home"
                : "முகப்பு"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;