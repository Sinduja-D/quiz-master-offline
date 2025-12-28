import React, { useRef, useEffect } from "react";
import "./GamesMenu.css";

import riddleImg from "../assets/images/riddle.png";
import spinwheelImg from "../assets/images/spinwheel.png";
import escaperoomImg from "../assets/images/escaperoom.png";
import funfactsImg from "../assets/images/funfacts.png";
import boomImg from "../assets/images/boom.png";
import detectiveImg from "../assets/images/detective.png";


const games = [
  { key: "riddles", title: { English: "Riddle Quiz", Tamil: "மறுமொழி வினாடி" }, desc: { English: "Solve science riddles from the periodic table", Tamil: "ஆவர்த்தன அட்டவணை அடிப்படையிலான மறுமொழிகள்" }, image: riddleImg },
  { key: "dailyScience", title: { English: "Spin Wheel", Tamil: "சுழற்சி சக்கரம்" }, desc: { English: "Scientists and their inventions", Tamil: "அறிஞர்கள் மற்றும் அவர்களின் கண்டுபிடிப்புகள்" }, image: spinwheelImg },
  { key: "storyMenu", title: { English: "Escape Room", Tamil: "வரிசை அறை" }, desc: { English: "Solve questions to escape rooms", Tamil: "வினாக்களைத் தீர்த்து அறையிலிருந்து வெளியேறு" }, image: escaperoomImg },
  { key: "funFacts", title: { English: "Fun Facts", Tamil: "சுவாரசிய தகவல்கள்" }, desc: { English: "Flip cards to reveal science facts", Tamil: "அறிவியல் தகவல்களை அறிந்து கொள்ளுங்கள்" }, image: funfactsImg },
  { key: "bombDefusal", title: { English: "Bomb Defusal", Tamil: "குண்டு செயலிழப்பு" }, desc: { English: "Defuse bomb using science knowledge", Tamil: "அறிவியலைப் பயன்படுத்தி குண்டை நிறுத்து" }, image: boomImg },
];

const GamesMenu = ({ language, setActivePage }) => {
  const gridRef = useRef(null);

  // duplicate once
  const loopGames = [...games, ...games];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cardWidth = grid.children[0].offsetWidth + 24; // gap
    let position = 0;

    const interval = setInterval(() => {
      position += cardWidth; // MOVE ONLY ONE CARD
      grid.scrollTo({ left: position, behavior: "smooth" });

      // when end of first list is crossed → reset
      if (position >= cardWidth * games.length) {
        setTimeout(() => {
          grid.scrollLeft = 0;
          position = 0;
        }, 450);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="games-menu">
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
              {language === "English" ? "Play Now" : "இப்போது விளையாடுங்கள்"}
            </button>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => setActivePage("home")}>
        ← {language === "English" ? "Back to Home" : "முகப்பிற்கு திரும்ப"}
      </button>
    </div>
  );
};

export default GamesMenu;
