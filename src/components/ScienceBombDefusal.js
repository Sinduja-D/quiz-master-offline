import React, { useState, useEffect } from "react";
import bombQuestions from "../data/bombDefusalQuestions.json";
import "./ScienceBombDefusal.css";

const LEVEL_CONFIG = {
  easy: { time: 15, wires: 2 },
  medium: { time: 12, wires: 3 },
  hard: { time: 10, wires: 3 }
};

export default function ScienceBombDefusal({ language = "English", setActivePage }) {
  const [level, setLevel] = useState("medium");
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(10);
  const [status, setStatus] = useState("playing"); // playing | success | boom
  const [streak, setStreak] = useState(0);

  // Start or reset game
  const startGame = () => {
    const q = bombQuestions[Math.floor(Math.random() * bombQuestions.length)];
    const { time, wires } = LEVEL_CONFIG[level];

    setQuestion({
      ...q,
      options: q.statements[language].slice(0, wires)
    });

    setTimer(time);
    setStatus("playing");
  };

  // Timer countdown
  useEffect(() => {
    if (status !== "playing") return;

    if (timer === 0) {
      setStatus("boom");
      setStreak(0);
      return;
    }

    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, status]);

  // Initialize game on level change
  useEffect(() => {
    startGame();
  }, [level]);

  // Wire click handler
  const cutWire = (index) => {
    if (status !== "playing") return;

    if (index === question.correctIndex) {
      setStatus("success");
      setStreak(s => s + 1);
    } else {
      setStatus("boom");
      setStreak(0);
    }
  };

  if (!question) return null;

  return (
    <div className={`bomb-game ${timer <= 3 ? "panic" : ""}`}>
      {/* Header: Timer + Streak */}
      <div className="bomb-header">
        <span>⏱ {timer}s</span>
        <span>🔥 Streak: {streak}</span>
      </div>

      {/* Level Selector */}
      <div className="level-selector">
        {["easy", "medium", "hard"].map(l => (
          <button
            key={l}
            className={level === l ? "active" : ""}
            onClick={() => setLevel(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Wires */}
      <div className="bomb-body">
        {question.options.map((text, index) => (
          <button
            key={index}
            className="wire"
            onClick={() => cutWire(index)}
            disabled={status !== "playing"}
          >
            {text}
          </button>
        ))}
      </div>

      {/* Overlay after success or boom */}
      {status !== "playing" && (
        <div className={`bomb-overlay ${status}`}>
          <h1>
            {status === "success"
              ? language === "Tamil" ? "குண்டு செயலிழக்கப்பட்டது!" : "BOMB DEFUSED!"
              : language === "Tamil" ? "வெடிப்பு!" : "BOOM!"}
          </h1>
          <div className="overlay-buttons">
            <button onClick={startGame}>
              {language === "Tamil" ? "மீண்டும்" : "Next Bomb"}
            </button>
            <button onClick={() => setActivePage("gamesMenu")}>
              {language === "Tamil" ? "விளையாட்டு மெனுவிற்கு" : "Back to Games Menu"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}