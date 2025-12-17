import React, { useEffect, useState } from "react";
import bombQuestions from "../data/bombDefusalQuestions";
import "./ScienceBombDefusal.css";

const LEVEL_CONFIG = {
  easy: { time: 12, wires: 2 },
  medium: { time: 10, wires: 3 },
  hard: { time: 8, wires: 3 }
};

export default function ScienceBombDefusal({ language = "English" }) {
  const [level, setLevel] = useState("medium");
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(10);
  const [status, setStatus] = useState("playing"); // playing | success | boom
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    startGame();
  }, [level]);

  useEffect(() => {
    if (status !== "playing") return;

    if (timer === 0) {
      setStatus("boom");
      setStreak(0);
      return;
    }

    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, status]);

  const startGame = () => {
    const q =
      bombQuestions[Math.floor(Math.random() * bombQuestions.length)];

    const { time, wires } = LEVEL_CONFIG[level];

    setQuestion({
      ...q,
      options: q.statements[language].slice(0, wires)
    });

    setTimer(time);
    setStatus("playing");
  };

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
      <div className="bomb-header">
        <span>⏱ {timer}</span>
        <span>🔥 {streak}</span>
      </div>

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

      {status !== "playing" && (
        <div className={`bomb-overlay ${status}`}>
          <h1>
            {status === "success"
              ? language === "Tamil"
                ? "குண்டு செயலிழக்கப்பட்டது!"
                : "BOMB DEFUSED!"
              : language === "Tamil"
                ? "வெடிப்பு!"
                : "BOOM!"}
          </h1>

          <button onClick={startGame}>
            {language === "Tamil" ? "மீண்டும்" : "Next Bomb"}
          </button>
        </div>
      )}
    </div>
  );
}
