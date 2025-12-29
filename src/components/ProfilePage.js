// src/components/ProfilePage.js

import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = ({ language, user, setActivePage }) => {
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("quizAppUsers") || "[]");
    const sorted = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
    const index = sorted.findIndex((u) => u.id === user.id);

    if (index !== -1 && index < 3) {
      setUserRank(index + 1);
    } else {
      setUserRank(null);
    }
  }, [user.id]);

  const text = {
    title: language === "English" ? "My Profile" : "என் சுயவிவரம்",
    stats: language === "English" ? "Statistics" : "புள்ளிவிவரங்கள்",
    history: language === "English" ? "Recent Quiz History" : "சமீபத்திய வினா வரலாறு",
    noQuiz: language === "English"
      ? "No tests taken yet. Give your first quiz a try! 🚀"
      : "இன்னும் எந்த வினாவும் எடுத்துக்கொள்ளவில்லை. முதலில் ஒரு வினாவை முயற்சிக்கவும்! 🚀",
  };

  const emojis = ["😎", "🙂", "👩‍🎓", "👨‍🎓", "🚀", "🧠"];
  const avatarEmoji = emojis[user.username.length % emojis.length];
  const hasTakenQuiz =
  (user.totalQuizzes && user.totalQuizzes > 0) ||
  (user.quizHistory && user.quizHistory.length > 0);

  return (
    <div className="page-content">
      <div className="profile-container">

        {/* TOP CARDS */}
        <div className="top-cards">

          {/* INFO CARD */}
          <div className="info-card">
            <div className="avatar">{avatarEmoji}</div>
            <h2>{user.username}</h2>
            <p>School: {user.schoolName || "-"}</p>
            <p>Place: {user.memberPlace || "-"}</p>
            <p>Member Since: {user.memberSince || "-"}</p>
          </div>

          {/* STATS CARD */}
          <div className="stats-card">
            <div className="stats-header">
              <h3>{text.stats}</h3>
              {userRank && (
                <div className={`rank rank-${userRank}`}>Rank {userRank}</div>
              )}
            </div>
            <div className="stat-item">
              <span>Points</span>
              <strong>{user.totalPoints || 0}</strong>
            </div>
            <div className="stat-item">
              <span>Tests</span>
              <strong>{user.totalQuizzes || 0}</strong>
            </div>
            <div className="stat-item">
              <span>Avg Score</span>
              <strong>{user.averageScore || 0}%</strong>
            </div>
            <div className="stat-item">
              <span>Badges</span>
              <strong>{user.achievements?.length || 0}</strong>
            </div>

            {/* CERTIFICATE BUTTON INSIDE STATS CARD */}
           <button
  className="primary-btn"
  disabled={!hasTakenQuiz}
  onClick={() => {
    if (hasTakenQuiz) {
      setActivePage("certificate");
    }
  }}
>
  {language === "English"
    ? "Generate Certificate"
    : "சான்றிதழ் உருவாக்கவும்"}
</button>
{!hasTakenQuiz && (
  <p className="warning-text">
    {language === "English"
      ? "Take at least one quiz to generate your certificate."
      : "சான்றிதழ் பெற குறைந்தது ஒரு வினாவையாவது எடுத்துக்கொள்ள வேண்டும்."}
  </p>
)}


          </div>

        </div>

        {/* EMPTY QUIZ MESSAGE CENTERED */}
        {(!user.quizHistory || user.quizHistory.length === 0) && (
          <div className="empty-centered">{text.noQuiz}</div>
        )}

        {/* QUIZ HISTORY (ONLY IF QUIZZES EXIST) */}
        {user.quizHistory && user.quizHistory.length > 0 && (
          <div className="history-card-container">
            {user.quizHistory.slice(-3).map((q, i) => (
              <div key={i} className="history-card">
                <div>
                  <strong>{q.subject}</strong>
                  <p>{q.date}</p>
                </div>
                <div className="score">{Math.round((q.correctAnswers / q.totalQuestions) * 100)}%</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
