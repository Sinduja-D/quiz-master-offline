import React, { useRef, useEffect } from "react";
import "./GamesMenu.css";

import riddleImg from "../assets/images/riddle.png";
import spinwheelImg from "../assets/images/spinwheel.png";
import escaperoomImg from "../assets/images/escaperoom.png";
import funfactsImg from "../assets/images/funfacts.png";
import boomImg from "../assets/images/boom.png";
import sliderPuzzleImg from "../assets/images/sliderPuzzle.png";
import elementMatchImg from "../assets/images/elementMatch.png";

const games = [
  { key: "riddles", title: { English: "Riddle Quiz", Tamil: "மறுமொழி வினாடி" }, desc: { English: "Solve science riddles", Tamil: "அறிவியல் மறுமொழிகள்" }, image: riddleImg },
  { key: "dailyScience", title: { English: "Spin Wheel", Tamil: "சுழற்சி சக்கரம்" }, desc: { English: "Scientists & inventions", Tamil: "அறிஞர்கள் மற்றும் கண்டுபிடிப்புகள்" }, image: spinwheelImg },
  { key: "storyMenu", title: { English: "Escape Room", Tamil: "வரிசை அறை" }, desc: { English: "Escape by answering", Tamil: "வினாக்களை தீர்த்து வெளியேறு" }, image: escaperoomImg },
  { key: "funFacts", title: { English: "Fun Facts", Tamil: "சுவாரசிய தகவல்கள்" }, desc: { English: "Science facts", Tamil: "அறிவியல் தகவல்கள்" }, image: funfactsImg },
  { key: "bombDefusal", title: { English: "Bomb Defusal", Tamil: "குண்டு செயலிழப்பு" }, desc: { English: "Defuse with logic", Tamil: "அறிவியலைப் பயன்படுத்து" }, image: boomImg },
  { key: "scienceSliderPuzzle", title: { English: "Slider Puzzle", Tamil: "ஸ்லைடர் புதிர்" }, desc: { English: "Arrange tiles to complete the arrangement", Tamil: "ஏற்பாட்டை முடிக்க ஓடுகளை ஒழுங்குபடுத்துங்கள்" }, image: sliderPuzzleImg },
  { key: "elementMatch", title: { English: "Element Match", Tamil: "தனிமம் பொருத்தம்" }, desc: { English: "Match element names with symbols", Tamil: "தனிமம் பெயர் மற்றும் சின்னத்தை பொருத்தவும்" }, image: elementMatchImg },
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

  const scrollNext = () => {
    const grid = gridRef.current;
    const cardWidth = grid.children[0].offsetWidth + 24;
    grid.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const grid = gridRef.current;
    const cardWidth = grid.children[0].offsetWidth + 24;
    grid.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  return (
    <div className="games-menu">
      {/* ✅ Back Button – TOP LEFT */}
      <button className="back-btn" onClick={() => setActivePage("home")}>
        ← Back to home
      </button>

      <h1>{language === "English" ? "Games Zone" : "விளையாட்டு பகுதி"}</h1>

      {/* NAVIGATION BUTTONS */}
      <button className="nav-btn nav-prev" onClick={scrollPrev}>‹</button>
      <button className="nav-btn nav-next" onClick={scrollNext}>›</button>

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
