import React, { useEffect, useState } from "react";
import "./LeaderboardPage.css";

const LeaderboardPage = ({ language, currentUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("quizAppUsers");
    if (savedUsers) {
      const sorted = JSON.parse(savedUsers).sort(
        (a, b) => b.totalPoints - a.totalPoints
      );
      setUsers(sorted);
    }
  }, []);

  const text = {
    title: language === "English" ? "Leaderboard" : "தலைவர் பட்டியல்",
    rank: language === "English" ? "Rank" : "தரவரிசை",
    user: language === "English" ? "User" : "பயனர்",
    school: language === "English" ? "School" : "பள்ளி",
    place: language === "English" ? "Place" : "இடம்",
    points: language === "English" ? "Points" : "புள்ளிகள்",
    quizzes: language === "English" ? "Quizzes" : "வினாக்கள்",
    you: language === "English" ? "You" : "நீங்கள்",
    notSpecified: "-",
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="leaderboard-page-full">
      <h1>{text.title}</h1>
      <div className="leaderboard-header">
        <span>{text.rank}</span>
        <span>{text.user}</span>
        <span>{text.school}</span>
        <span>{text.place}</span>
        <span>{text.points}</span>
        <span>{text.quizzes}</span>
      </div>

      <div className="leaderboard-list">
        {users.map((user, idx) => {
          const isCurrent = currentUser?.id === user.id;
          return (
            <div
              key={user.id}
              className={`leaderboard-row ${isCurrent ? "current-user" : ""}`}
            >
              <span>{getRankIcon(idx + 1)}</span>
              <span>{user.username}</span>
              <span>{user.schoolName || text.notSpecified}</span>
              <span>{user.memberPlace || text.notSpecified}</span>
              <span>{user.totalPoints}</span>
              <span>{user.totalQuizzes}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardPage;
