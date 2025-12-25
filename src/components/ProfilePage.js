import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = ({ language, user, setActivePage }) => {
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("quizAppUsers") || "[]");
    const sorted = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
    const index = sorted.findIndex((u) => u.id === user.id);
    if (index !== -1) setUserRank(index + 1);
  }, [user.id]);

  const text = {
    title: language === "English" ? "My Profile" : "என் சுயவிவரம்",
    school: language === "English" ? "School" : "பள்ளி",
    place: language === "English" ? "Place" : "இடம்",
    since: language === "English" ? "Member Since" : "உறுப்பினர் முதல்",
    stats: language === "English" ? "Statistics" : "புள்ளிவிவரங்கள்",
    history: language === "English" ? "Recent Quiz History" : "சமீபத்திய வினா வரலாறு",
    noQuiz: language === "English" ? "No quizzes attempted yet." : "இன்னும் எந்த வினாவும் எடுத்துக்கொள்ளவில்லை",
  };

  /* ✅ Emoji avatar – always visible */
  const emojis = ["😎", "🙂", "👩‍🎓", "👨‍🎓", "🚀", "🧠"];
  const avatarEmoji = emojis[user.username.length % emojis.length];

  return (
    <div className="page-content profile-scroll">
      <div className="profile-container">

        {/* 🔥 PROFILE CARD */}
        <div className="profile-id-card">

          {/* ✅ EMOJI AVATAR */}
          <div className="id-avatar">
            {avatarEmoji}
          </div>

          <div className="id-info">
            <h2>{user.username}</h2>
            <p>{text.school}: {user.schoolName || "-"}</p>
            <p>{text.place}: {user.memberPlace || "-"}</p>
            <p>{text.since}: {user.memberSince || "-"}</p>
          </div>

          {/* ✅ STRICT TOP 3 ONLY */}
          {userRank !== null && userRank <= 3 ? (
            <div className={`id-rank rank-${userRank}`}>
              🏆<br />
              Rank<br />
              {userRank}
            </div>
          ) : (
            <div /> 
          )}
        </div>

        {/* STATS */}
        <h3 className="section-title">{text.stats}</h3>
        <div className="stats-row">
          <div className="stat-box">
            <span>{user.totalPoints || 0}</span>
            <p>Points</p>
          </div>
          <div className="stat-box">
            <span>{user.totalQuizzes || 0}</span>
            <p>Tests</p>
          </div>
          <div className="stat-box">
            <span>{user.averageScore || 0}%</span>
            <p>Avg Score</p>
          </div>
          <div className="stat-box">
            <span>{user.achievements?.length || 0}</span>
            <p>Badges</p>
          </div>
        </div>

        {/* CERTIFICATE BUTTON */}
        <div className="center">
          <button
            className="primary-btn"
            onClick={() => setActivePage("certificate")}
          >
            {language === "English" ? "Generate Certificate" : "சான்றிதழ் உருவாக்கவும்"}
          </button>
        </div>

        {/* HISTORY */}
        <h3 className="section-title">{text.history}</h3>
        {user.quizHistory && user.quizHistory.length > 0 ? (
          user.quizHistory.slice(-5).map((q, i) => (
            <div key={i} className="profile-card history-card">
              <div>
                <strong>{q.subject}</strong>
                <p>{q.date}</p>
              </div>
              <div className="score">
                {Math.round((q.correctAnswers / q.totalQuestions) * 100)}%
              </div>
            </div>
          ))
        ) : (
          <div className="profile-card empty">{text.noQuiz}</div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
