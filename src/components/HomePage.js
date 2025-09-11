// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { levels } from "../levels.js";


const HomePage = ({ language, setActivePage, onLevelSelect, user }) => {
  const [showWelcome, setShowWelcome] = useState(false);

  // show banner once on mount if we have a username
  useEffect(() => {
    if (user?.username) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className="home-container">
      {/* welcome banner */}
      {showWelcome && (
        <div className="welcome-popup">
          {language === "English"
            ? `Welcome, ${user.username}!`
            : `வரவேற்பு, ${user.username}!`}
        </div>
      )}

      <div className="hero-box">
        <h1 className="hero-title">
          {language === "English"
            ? "SCIENCE PARK-THIRUVALLUR DISTRICT"
            : "அறிவியல் பூங்கா-திருவள்ளூர் மாவட்டம்"}
        </h1>
        <h3 className="hero-title">
          {language === "English"
            ? "DESIGNED AND DEVELOPED BY: R.M.K. ENGINEERING COLLEGE"
            : "வடிவமைத்து உருவாக்கியவர்கள்: ஆர்.எம்.கே. பொறியியல் கல்லூரி"}
        </h3>
        {/*<p className="hero-subtitle">
          {language === "English"
            ? "Sinduja D · Reethu P · Vijayalakshmi SR, \n Mentor: M.Rekha, Assistant Professor"
            : "சிந்துஜா டி · ரீத்து பெ · விஜயலட்சுமி எஸ் ஆ,\n வழிகாட்டி: ம.ரேகா, உதவி பேராசிரியர்"}
        </p>*/}
        <div className="credits">
  {language === "English" ? (
    <>
      <div className="student-names">
        <span className="student-tag">Sinduja D</span>
        <span className="student-tag">Reethu P</span>
        <span className="student-tag">Vijayalakshmi SR</span>
      </div>
      <div className="mentor-name">
        Mentor: M.Rekha, Assistant Professor
      </div>
    </>
  ) : (
    <>
      <div className="student-names">
        <span className="student-tag">சிந்துஜா டி</span>
        <span className="student-tag">ரீத்து பெ</span>
        <span className="student-tag">விஜயலட்சுமி எஸ் ஆ</span>
      </div>
      <div className="mentor-name">
        வழிகாட்டி: ம.ரேகா, உதவி பேராசிரியர்
      </div>
    </>
  )}
</div>

      </div>

      <div className="content-wrapper">
        <div className="level-container">
          <div className="section-title">
            <h2>
              {language === "English"
                ? "Select Difficulty Level"
                : "சிரம நிலையைத் தேர்ந்தெடுக்கவும்"}
            </h2>
          </div>
          <div className="level-cards">
            {levels.map((level) => (
              <div
                key={level.id}
                className="level-card"
                style={{ backgroundColor: level.color }}
                onClick={() => {
                  onLevelSelect(level);
                  setActivePage("quizsetup");
                }}
              >
                <div className="level-icon">{level.icon}</div>
                <h3 className="level-name">{level.name[language]}</h3>
                <p className="level-grade">{level.grade[language]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="explore-section">
          <div className="explore-header">
            <h2>
              {language === "English"
                ? "Explore More Adventures"
                : "மேலும் சாகசங்களை ஆராயுங்கள்"}
            </h2>
          </div>
          <div className="adventure-grid">
            <button
              onClick={() => setActivePage("riddles")}
              className="adventure-card riddles"
            >
              <div className="card-icon">🤔</div>
              <span>{language === "English" ? "Riddles" : "புதிர்கள்"}</span>
            </button>
            <button
              onClick={() => setActivePage("dailyScience")}
              className="adventure-card daily-science"
            >
              <div className="card-icon">🎡</div>
              <span>{language === "English" ? "Spin Wheel" : "சுழலும் சக்கரம்"}</span>
            </button>
            <button
              onClick={() => setActivePage("funFacts")}
              className="adventure-card fun-facts"
            >
              <div className="card-icon">💡</div>
              <span>{language === "English" ? "Fun Facts" : "சுவாரஸ்யங்கள்"}</span>
            </button>
            <button
              onClick={() => setActivePage("storyMenu")}
              className="adventure-card story-menu"
            >
              <div className="card-icon">🔍</div>
              <span>{language === "English" ? "Escape Room" : "தப்பிப்பிழைத்தல் அறை"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
