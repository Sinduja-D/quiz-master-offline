import React, { useRef, useEffect } from "react";
import "./GamesMenu.css";

import riddleImg from "../assets/images/riddle.png";
import spinwheelImg from "../assets/images/spinwheel.png";
import escaperoomImg from "../assets/images/escaperoom.png";
import funfactsImg from "../assets/images/funfacts.png";
import boomImg from "../assets/images/boom.png";
import detectiveImg from "../assets/images/detective.png";

const games = [
  { key: "riddles", title: { English: "Riddle Quiz", Tamil: "மறுமொழி வினாடி" }, desc: { English: "Solve science riddles", Tamil: "அறிவியல் மறுமொழிகள்" }, image: riddleImg },
  { key: "dailyScience", title: { English: "Spin Wheel", Tamil: "சுழற்சி சக்கரம்" }, desc: { English: "Scientists & inventions", Tamil: "அறிஞர்கள் மற்றும் கண்டுபிடிப்புகள்" }, image: spinwheelImg },
  { key: "storyMenu", title: { English: "Escape Room", Tamil: "வரிசை அறை" }, desc: { English: "Escape by answering", Tamil: "வினாக்களை தீர்த்து வெளியேறு" }, image: escaperoomImg },
  { key: "funFacts", title: { English: "Fun Facts", Tamil: "சுவாரசிய தகவல்கள்" }, desc: { English: "Science facts", Tamil: "அறிவியல் தகவல்கள்" }, image: funfactsImg },
  { key: "bombDefusal", title: { English: "Bomb Defusal", Tamil: "குண்டு செயலிழப்பு" }, desc: { English: "Defuse with logic", Tamil: "அறிவியலைப் பயன்படுத்து" }, image: boomImg },
  { key: "detective", title: { English: "Science Detective", Tamil: "அறிவியல் விசாரணையாளர்" }, desc: { English: "Solve mysteries", Tamil: "மர்மங்களை தீர்க்கவும்" }, image: detectiveImg },
];

const GamesMenu = ({ language, setActivePage }) => {
  const gridRef = useRef(null);
  const loopGames = [...games, ...games];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cardWidth = grid.children[0].offsetWidth + 24;
    let position = 0;

    const interval = setInterval(() => {
      position += cardWidth;
      grid.scrollTo({ left: position, behavior: "smooth" });

      if (position >= cardWidth * games.length) {
        setTimeout(() => {
          grid.scrollLeft = 0;
          position = 0;
        }, 400);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="games-menu">
      {/* ✅ Back Button – TOP LEFT */}
      <button className="back-btn" onClick={() => setActivePage("home")}>
        ← Back to home
      </button>

      <h1>{language === "English" ? "Games Zone" : "விளையாட்டு பகுதி"}</h1>

      <div className="games-grid" ref={gridRef}>
        {loopGames.map((game, i) => (
          <div key={i} className="game-card">
            <img src={game.image} alt="" className="game-image" />
            <h3>{game.title[language]}</h3>
            <p>{game.desc[language]}</p>
            <button
              className="play-btn"
              onClick={() => setActivePage(game.key)}
            >
              {language === "English" ? "Play Now" : "விளையாடு"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesMenu;
