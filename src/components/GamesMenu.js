import React, { useRef, useEffect, useState } from "react";
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
  { key: "detective", title: { English: "Science Detective", Tamil: "அறிவியல் விசாரணையாளர்" }, desc: { English: "Solve science mysteries like a detective", Tamil: "விசாரணையாளர் போல அறிவியல் மர்மங்களை தீர்க்கவும்" }, image: detectiveImg },
];

const GamesMenu = ({ language, setActivePage }) => {
  const gridRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const total = games.length;
    const interval = setInterval(() => {
      if (gridRef.current) {
        const cardWidth = gridRef.current.children[0].offsetWidth + 20; // gap
        const nextIndex = (index + 3) % total; // move 3 cards each time
        gridRef.current.scrollTo({ left: cardWidth * nextIndex, behavior: "smooth" });
        setIndex(nextIndex);
      }
    }, 3000); // auto-transition 3 sec

    return () => clearInterval(interval);
  }, [index]);

  const scrollLeft = () => {
    if (gridRef.current) {
      const cardWidth = gridRef.current.children[0].offsetWidth + 20;
      const prevIndex = (index - 3 + games.length) % games.length;
      gridRef.current.scrollTo({ left: cardWidth * prevIndex, behavior: "smooth" });
      setIndex(prevIndex);
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      const cardWidth = gridRef.current.children[0].offsetWidth + 20;
      const nextIndex = (index + 3) % games.length;
      gridRef.current.scrollTo({ left: cardWidth * nextIndex, behavior: "smooth" });
      setIndex(nextIndex);
    }
  };

  return (
    <div className="games-menu">
      <h1>{language === "English" ? "Games Zone" : "விளையாட்டு பகுதி"}</h1>

      <div className="arrow-btn arrow-left" onClick={scrollLeft}>{"<"}</div>
      <div className="arrow-btn arrow-right" onClick={scrollRight}>{">"}</div>

      <div className="games-grid" ref={gridRef}>
        {games.map((game) => (
          <div key={game.key} className="game-card">
            <img src={game.image} alt={game.title[language]} className="game-image" />
            <h3>{game.title[language]}</h3>
            <p>{game.desc[language]}</p>
            <button className="play-btn" onClick={() => setActivePage(game.key)}>
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
