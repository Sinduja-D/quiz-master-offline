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
    stats: language === "English" ? "Statistics" : "புள்ளிவிவரங்கள்",
    noQuiz:
      language === "English"
        ? "No tests taken yet. Give your first quiz a try! 🚀"
        : "இன்னும் எந்த வினாவும் எடுத்துக்கொள்ளவில்லை. முதலில் ஒரு வினாவை முயற்சிக்கவும்! 🚀",

    school: language === "English" ? "School" : "பள்ளி",
    place: language === "English" ? "Place" : "இடம்",
    memberSince: language === "English" ? "Member Since" : "சேர்ந்த தேதி",

    points: language === "English" ? "Points" : "மதிப்பெண்கள்",
    tests: language === "English" ? "Tests" : "வினாக்கள்",
    avgScore: language === "English" ? "Avg Score" : "சராசரி மதிப்பெண்",
    badges: language === "English" ? "Badges" : "பட்டங்கள்",

    certificate:
      language === "English"
        ? "Generate Certificate"
        : "சான்றிதழ் உருவாக்கவும்",

    certificateWarn:
      language === "English"
        ? "Take at least one quiz to generate your certificate."
        : "சான்றிதழ் பெற குறைந்தது ஒரு வினாவையாவது எடுத்துக்கொள்ள வேண்டும்."
  };

  const emojis = ["😎", "🙂", "👩‍🎓", "👨‍🎓", "🚀", "🧠"];
  const avatarEmoji = emojis[user.username.length % emojis.length];

  const hasTakenQuiz =
    (user.totalQuizzes && user.totalQuizzes > 0) ||
    (user.quizHistory && user.quizHistory.length > 0);

  return (
    <div className="page-content">
      <div className="profile-container">

        <div className="top-cards">

          {/* INFO CARD */}
          <div className="info-card">
            <div className="avatar">{avatarEmoji}</div>
            <h2>{user.username}</h2>
            <p>{text.school}: {user.schoolName || "-"}</p>
            <p>{text.place}: {user.memberPlace || "-"}</p>
            <p>{text.memberSince}: {user.memberSince || "-"}</p>
          </div>

          {/* STATS CARD */}
          <div className="stats-card">
            <div className="stats-header">
              <h3>{text.stats}</h3>
              {userRank && (
                <div className={`rank rank-${userRank}`}>
                  Rank {userRank}
                </div>
              )}
            </div>

            <div className="stat-item">
              <span>{text.points}</span>
              <strong>{user.totalPoints || 0}</strong>
            </div>

            <div className="stat-item">
              <span>{text.tests}</span>
              <strong>{user.totalQuizzes || 0}</strong>
            </div>

            <div className="stat-item">
              <span>{text.avgScore}</span>
              <strong>{user.averageScore || 0}%</strong>
            </div>

            <div className="stat-item">
              <span>{text.badges}</span>
              <strong>{user.achievements?.length || 0}</strong>
            </div>

            <button
              className="primary-btn"
              disabled={!hasTakenQuiz}
              onClick={() => {
                if (hasTakenQuiz) setActivePage("certificate");
              }}
            >
              {text.certificate}
            </button>

            {!hasTakenQuiz && (
              <p className="warning-text">{text.certificateWarn}</p>
            )}
          </div>

        </div>

        {/* EMPTY QUIZ */}
        {(!user.quizHistory || user.quizHistory.length === 0) && (
          <div className="empty-centered">{text.noQuiz}</div>
        )}

        {/* QUIZ HISTORY */}
        {user.quizHistory && user.quizHistory.length > 0 && (
          <div className="history-card-container">
            {user.quizHistory.slice(-3).map((q, i) => (
              <div key={i} className="history-card">
                <div>
                  <strong>{q.subject}</strong>
                  <p>{q.date}</p>
                </div>
                <div className="score">
                  {Math.round((q.correctAnswers / q.totalQuestions) * 100)}%
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
