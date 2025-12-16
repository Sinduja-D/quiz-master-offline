// ProfilePage.js
import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = ({ language, user, setActivePage }) => {
  const [userRank, setUserRank] = useState(null);

  /* ---------- TEXT (ENGLISH / TAMIL) ---------- */
  const text = {
    title: language === 'English' ? 'User Profile' : 'பயனர் சுயவிவரம்',
    school: language === 'English' ? 'School:' : 'பள்ளி:',
    place: language === 'English' ? 'Member Place:' : 'உறுப்பினர் இடம்:',
    since: language === 'English' ? 'Member Since:' : 'உறுப்பினர் முதல்:',
    notSpecified:
      language === 'English' ? 'Not specified' : 'குறிப்பிடப்படவில்லை',
    rank:
      language === 'English' ? 'Rank' : 'தரவரிசை',
    viewCertificate:
      language === 'English' ? '🎓 View Certificate' : '🎓 சான்றிதழ் காண்க',
    quizStats:
      language === 'English' ? 'Quiz Statistics' : 'வினா புள்ளிவிவரங்கள்',
    totalPoints:
      language === 'English' ? 'Total Points' : 'மொத்த புள்ளிகள்',
    quizzesTaken:
      language === 'English' ? 'Quizzes Taken' : 'எடுத்த வினாக்கள்',
    avgScore:
      language === 'English' ? 'Average Score' : 'சராசரி மதிப்பெண்',
    achievements:
      language === 'English' ? 'Achievements' : 'சாதனைகள்'
  };

  /* ---------- CALCULATE RANK (FROM LEADERBOARD) ---------- */
  useEffect(() => {
    const savedUsers = localStorage.getItem('quizAppUsers');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);

      const sortedUsers = [...users].sort(
        (a, b) => b.totalPoints - a.totalPoints
      );

      const index = sortedUsers.findIndex(u => u.id === user.id);
      if (index !== -1) {
        setUserRank(index + 1); // rank starts from 1
      }
    }
  }, [user.id]);

  /* ---------- EMOJI AVATAR ---------- */
  const getProfileEmoji = (user) => {
    const count = user.achievements?.length || 0;

    const beginner = ['🐣', '🌱', '🐢', '🐱'];
    const intermediate = ['🦸', '🧙', '👩‍🚀', '🦄'];
    const advanced = ['🏆', '👑', '🌟', '🔥'];

    const list =
      count <= 2 ? beginner : count <= 5 ? intermediate : advanced;

    let index = 0;
    if (user.username) {
      for (let c of user.username) {
        index = (index + c.charCodeAt(0)) % list.length;
      }
    }
    return list[index];
  };

  return (
    <div className="page-content profile-page">
      <h2>{text.title}</h2>

      {/* ---------- HEADER ---------- */}
      <div className="profile-header">
        <div className="profile-avatar">
          {getProfileEmoji(user)}
        </div>

        <div className="profile-details">
          <h3>{user.username}</h3>

          
          <p>
            <strong>{text.school}</strong>{' '}
            {user.schoolName || text.notSpecified}
          </p>

          <p>
            <strong>{text.place}</strong>{' '}
            {user.memberPlace || text.notSpecified}
          </p>

          <p>
            <strong>{text.since}</strong> {user.memberSince}
          </p>
          {/* 🔥 TOP 3 RANK BADGE */}
          {userRank && userRank <= 3 && (
            <div className="profile-rank-badge">
              {userRank === 1 && '🥇 '}
              {userRank === 2 && '🥈 '}
              {userRank === 3 && '🥉 '}
              {text.rank} {userRank}
            </div>
          )}

        </div>
      </div>

      {/* ---------- CERTIFICATE BUTTON ---------- */}
      {user.quizHistory?.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            className="view-certificate-btn"
            onClick={() => setActivePage('certificate')}
          >
            {text.viewCertificate}
          </button>
        </div>
      )}

      {/* ---------- STATS ---------- */}
      <div className="profile-stats">
        <h3>{text.quizStats}</h3>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{user.totalPoints}</div>
            <div className="stat-label">{text.totalPoints}</div>
          </div>

          <div className="stat-item">
            <div className="stat-value">{user.totalQuizzes}</div>
            <div className="stat-label">{text.quizzesTaken}</div>
          </div>

          <div className="stat-item">
            <div className="stat-value">{user.averageScore}%</div>
            <div className="stat-label">{text.avgScore}</div>
          </div>

          <div className="stat-item">
            <div className="stat-value">
              {user.achievements?.length || 0}
            </div>
            <div className="stat-label">{text.achievements}</div>
          </div>
        </div>
      </div>
        {user.quizHistory.length > 0 && (
        <>
          <div className="profile-history">
            <h3>{language === 'English' ? 'Recent Quiz History' : 'சமீபத்திய வினா வரலாறு'}</h3>
            <div className="history-list">
              {user.quizHistory.slice(-3).map((quiz, index) => (
                <div key={index} className="history-item">
                  <div className="history-info">
                    <h4>
                      {quiz.subject} - {quiz.grade}
                    </h4>
                    <p>{quiz.date}</p>
                  </div>
                  <div className="history-score">
                    <span className="score-value">
                      {Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100)}%
                    </span>
                    <span className="score-details">
                      {quiz.correctAnswers}/{quiz.totalQuestions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {user.quizHistory.length === 0 && (
        <div className="profile-empty">
          <p>
            {language === 'English'
              ? "You haven't taken any quizzes yet. Start a quiz to see your progress here!"
              : 'நீங்கள் இதுவரை எந்த வினாவும் எடுத்துக்கொள்ளவில்லை. உங்கள் முன்னேற்றத்தை இங்கே பார்க்க ஒரு வினாவைத் தொடங்கவும்!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
