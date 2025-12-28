import React, { useState, useEffect } from "react";
import "./HomePage.css";
import rmkLogo from "../assets/rmk.gif";
import tamilNaduLogo from "../assets/tamil-nadu-logo.png";
import DemoGuide from "./DemoGuide"; // <-- new import

const HomePage = ({ language, setActivePage, onLevelSelect, user }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user?.username]);

  // auto-show demo for newly logged-in user (per-user key)
  useEffect(() => {
    if (!user?.username) return;
    try {
      const key = `demoSeen_${user.username}`;
      const seen = localStorage.getItem(key);
      if (!seen) {
        // small delay so UI is ready
        const t = setTimeout(() => setShowDemo(true), 700);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [user?.username]);

  function handleCloseDemo() {
    setShowDemo(false);
  }

  const levels = [
    {
      id: "beginner",
      name: { English: "Little Scientists", Tamil: "சிறிய விஞ்ஞானிகள்" },
      icon: "🔬",
      grade: { English: "Grades 6-7", Tamil: "6-7 ஆம் வகுப்பு" },
    },
    {
      id: "intermediate",
      name: { English: "Junior Explorers", Tamil: "இளைய ஆராய்ச்சியாளர்கள்" },
      icon: "🚀",
      grade: { English: "Grades 8-10", Tamil: "8-10 ஆம் வகுப்பு" },
    },
    {
      id: "advance",
      name: { English: "Master Minds", Tamil: "மாஸ்டர் மைண்ட்ஸ்" },
      icon: "🧠",
      grade: { English: "Grades 11-12", Tamil: "11-12 ஆம் வகுப்பு" },
    },
  ];

  return (
    <div className={`home-root ${language === "Tamil" ? "lang-ta" : ""}`}>
      {showDemo && <DemoGuide user={user} language={language} onCloseProp={handleCloseDemo} />}

      {showWelcome && (
        <div className="welcome-popup">
          {language === "English"
            ? `Welcome to HomePage, ${user.username}!`
            : `முகப்புப்பக்கத்திற்கு வரவேற்கிறோம், ${user.username}!`}
        </div>
      )}

      {/* HERO SECTION */}
      <div className="hero-bar">
        <div className="hero-block hero-center">
          <img src={tamilNaduLogo} alt="Tamil Nadu Logo" className="hero-logo" />
          <h4>
            {language === "English"
              ? "Government of Tamil Nadu"
              : "தமிழ்நாடு அரசு"}
          </h4>
        </div>

        <div className="hero-block hero-center">
          <img src={rmkLogo} alt="RMK Logo" className="hero-logo" />
          <div>
            <h4>
              {language === "English"
                ? "R.M.K Engineering College"
                : "ஆர்.எம்.கே. பொறியியல் கல்லூரி"}
            </h4>
            <p>
              {language === "English"
                ? "(An Autonomous Institution)"
                : "(ஒரு தன்னாட்சி நிறுவனம்)"}
            </p>
          </div>
        </div>

        <div className="hero-block hero-right">
          <p>{language === "English" ? "Designed and Compiled by" : "வடிவமைத்து தொகுத்தவர்கள்"}</p>
          <p>
            {language === "English"
              ? "Developers: Sinduja D, Reethu P, Vijayalakshmi S R"
              : "உருவாக்குநர்கள்: சிந்துஜா டி, ரீத்து பெ, விஜயலட்சுமி சி ரா"}
          </p>
          <p>
            {language === "English"
              ? "Department of Information Technology (2023–2027)"
              : "தகவல் தொழில்நுட்பத் துறை (2023–2027)"}
          </p>
          <p>
            {language === "English" ? "Mentor: Ms. M. Rekha, M.E.(Ph.D)" : "வழிகாட்டி: திருமதி எம். ரேகா, M.E.(Ph.D)"}
          </p>
        </div>
      </div>

      {/* MAIN TITLE */}
      <h1 className="main-title">
        {language === "English"
          ? "Science Quiz for Young Achievers"
          : "இளைய சிந்தனையாளர்களுக்கான அறிவியல் வினாடி வினா"}
      </h1>

      {/* LEVEL BUTTONS */}
      <div className="levels-row">
        {levels.map((level) => {
          let bgGradient = "";
          switch (level.id) {
            case "beginner":
              bgGradient = "linear-gradient(135deg, #1E7B3B, #6FD36F)";
              break;
            case "intermediate":
              bgGradient = "linear-gradient(135deg, #E85A1F, #FFA94D)";
              break;
            case "advance":
              bgGradient = "linear-gradient(135deg, #4B2A7F, #B57CFF)";
              break;
            default:
              bgGradient = "#ccc";
          }
          return (
            <div
              key={level.id}
              className={`level-card level-${level.id}`}
              style={{ background: bgGradient }}
              onClick={() => {
                onLevelSelect(level);
                setActivePage("quizsetup");
              }}
            >
              <div className="level-icon">{level.icon}</div>
              <div className="level-text">
                <h3>{level.name[language]}</h3>
                <span>{level.grade[language]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* EXPLORE ALL GAMES BUTTON */}
      <div
        className="games-btn"
        onClick={() => setActivePage("games")}
        style={{ background: "linear-gradient(135deg, #2B2E83, #7A2E8C)" }}
      >
        🎮 {language === "English" ? "Explore All Games" : "அனைத்து விளையாட்டுகளை ஆராயுங்கள்"}
      </div>
    </div>
  );
};

export default HomePage;
