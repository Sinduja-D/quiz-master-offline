import React, { useState, useEffect } from 'react';
import './LeaderboardPage.css';

const LeaderboardPage = ({ language, currentUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUsers = localStorage.getItem('quizAppUsers');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      const sortedUsers = [...parsedUsers].sort(
        (a, b) => b.totalPoints - a.totalPoints
      );
      setUsers(sortedUsers);
    }
    setLoading(false);
  }, []);

  const text = {
    rank: language === 'English' ? 'Rank' : 'தரவரிசை',
    user: language === 'English' ? 'User' : 'பயனர்',
    school: language === 'English' ? 'School' : 'பள்ளி',
    place: language === 'English' ? 'Place' : 'இடம்',
    points: language === 'English' ? 'Points' : 'புள்ளிகள்',
    quizzes: language === 'English' ? 'Quizzes' : 'வினாக்கள்',
    avgScore: language === 'English' ? 'Avg Score' : 'சராசரி',
    notSpecified: language === 'English' ? '-' : '-',
    you: language === 'English' ? 'You' : 'நீங்கள்',
    title: language === 'English' ? 'Leaderboard' : 'தலைவர் பட்டியல்',
    loading: language === 'English'
      ? 'Loading leaderboard...'
      : 'தலைவர் பட்டியல் ஏற்றப்படுகிறது...'
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  if (loading) {
    return <p>{text.loading}</p>;
  }

  return (
    <div className={`page-content leaderboard-page ${language === 'Tamil' ? 'tamil-language' : ''}`}>
      <h2>{text.title}</h2>

      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="header-rank">{text.rank}</div>
          <div className="header-user">{text.user}</div>
          <div className="header-school">{text.school}</div>
          <div className="header-place">{text.place}</div>
          <div className="header-points">{text.points}</div>
          <div className="header-quizzes">{text.quizzes}</div>
          <div className="header-score">{text.avgScore}</div>
        </div>

        <div className="leaderboard-list">
          {users.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = currentUser?.id === user.id;

            return (
              <div
                key={user.id}
                className={`leaderboard-item ${isCurrentUser ? 'current-user' : ''}`}
              >
                <div className="user-rank">{getRankIcon(rank)}</div>

                <div className="user-name">
                  {user.username}
                  {isCurrentUser && (
                    <span className="current-user-badge">{text.you}</span>
                  )}
                </div>

                <div className="user-school">
                  {user.schoolName || text.notSpecified}
                </div>

                <div className="user-place">
                  {user.memberPlace || text.notSpecified}
                </div>

                <div className="user-points">{user.totalPoints}</div>
                <div className="user-quizzes">{user.totalQuizzes}</div>
                <div className="user-score">{user.averageScore}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
