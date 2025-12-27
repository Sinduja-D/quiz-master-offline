import React, { useEffect, useState } from "react";
import "./FunFacts.css";
import funFactsData from "../data/funFactsData";

const FunFacts = ({ language,setActivePage }) => {
  const [board, setBoard] = useState([]);
  const [selectedFact, setSelectedFact] = useState(null);

  useEffect(() => {
    generateBoard();
  }, []);

  const generateBoard = () => {
    const shuffled = [...funFactsData].sort(() => 0.5 - Math.random());
    setBoard(
      shuffled.slice(0, 6).map((fact, i) => ({
        id: i,
        fact,
        revealed: false,
      }))
    );
    setSelectedFact(null);
  };

  const revealFact = (id) => {
    setBoard((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, revealed: true } : b
      )
    );
    setSelectedFact(board.find((b) => b.id === id).fact);
  };

  return (
    <div className="funfacts-overlay">
<button
        className="back-btn-games-fixed"
        onClick={() => setActivePage("games")}
      >
        🎮Games
      </button>
      <h1 className="funfacts-title">
        {language === "English"
          ? "Science Fun Facts"
          : "அறிவியல் சுவாரஸ்ய உண்மைகள்"}
      </h1>

      <div className="funfacts-grid">
        {board.map((item) => (
          <div
            key={item.id}
            className={`funfact-card ${item.revealed ? "revealed" : ""}`}
            onClick={() => revealFact(item.id)}
          >
            <div className="icon">
              {item.revealed ? "🔬" : "🧠"}
            </div>
            <span className="label">
              {item.revealed ? "FACT" : "TAP"}
            </span>
          </div>
        ))}
      </div>

      <button className="new-set-btn" onClick={generateBoard}>
        {language === "English" ? "New Set" : "புதிய தொகுப்பு"}
      </button>

      {/* FACT POPUP */}
      {selectedFact && (
        <div className="fact-modal" onClick={() => setSelectedFact(null)}>
          <div className="fact-modal-card">
            <h2>Did you know?</h2>
            <p>
              {language === "English"
                ? selectedFact.en
                : selectedFact.ta}
            </p>
            <span className="tap-close">
              {language === "English"
                ? "Tap anywhere to close"
                : "மூட தட்டவும்"}
            </span>
          </div>
        </div>
      )}

    </div>
  );
};

export default FunFacts;
