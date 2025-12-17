import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Howl } from "howler";
import bombQuestions from "../data/bombDefusalQuestions.json";
import "./ScienceBombDefusal.css";

const TIME_LIMIT = 15;
const CONFETTI_DURATION = 3000;

const blastSound = new Howl({ src: ["/sounds/blast.mp3"] });
const successSound = new Howl({ src: ["/sounds/success.mp3"] });

const bombText = {
  English: {
    title: "Defuse the Bomb",
    instructions: [
      "Read all the statements carefully",
      "Timer starts after viewing all wires",
      "Click the correct wire to defuse the bomb"
    ],
    start: "Start Mission",
    read: "Click the wire to read",
    continue: "Continue",
    back: "← Back",
    defusedTitle: "🎉 Bomb Defused!",
    defusedMsg: "Excellent work. The device is now safe.",
    blastTitle: "💥 BOOM!",
    blastMsg: "The bomb has exploded.",
    retryTitle: "Mission Failed",
    retryMsg: "Try again from start.",
    retryBtn: "Try Again"
  },
  Tamil: {
    title: "குண்டை செயலிழக்கச் செய்",
    instructions: [
      "அனைத்து குறிப்புகளையும் கவனமாக வாசிக்கவும்",
      "அனைத்தையும் வாசித்த பின் நேரம் தொடங்கும்",
      "சரியான கம்பியை அழுத்தி குண்டை செயலிழக்கச் செய்க"
    ],
    start: "தொடங்கு",
    read: "கம்பியை அழுத்தி வாசிக்கவும்",
    continue: "தொடர்க",
    back: "← திரும்ப",
    defusedTitle: "🎉 குண்டு செயலிழக்கப்பட்டது!",
    defusedMsg: "சிறந்த வேலை! சாதனம் பாதுகாப்பாக உள்ளது.",
    blastTitle: "💥 வெடிப்பு!",
    blastMsg: "குண்டு வெடித்துவிட்டது.",
    retryTitle: "பணித் தோல்வி",
    retryMsg: "மீண்டும் தொடங்க முயற்சி செய்யவும்.",
    retryBtn: "மீண்டும் முயற்சி"
  }
};

export default function ScienceBombDefusal({ language, onBack }) {
  const [qIndex, setQIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [clicked, setClicked] = useState([false, false, false]);
  const [activeStatement, setActiveStatement] = useState(null);
  const [status, setStatus] = useState("instructions");
  const [timer, setTimer] = useState(TIME_LIMIT);
  const [timerActive, setTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParams, setConfettiParams] = useState({});
  const [showInstructions, setShowInstructions] = useState(true);

  // Load current question
  useEffect(() => {
    const q = bombQuestions[qIndex];
    if (!q) {
      onBack(); // No more questions, go back to menu
      return;
    }
    setQuestion({ ...q, options: q.statements[language] });
    setClicked([false, false, false]);
    setTimer(TIME_LIMIT);
    setTimerActive(false);
    setStatus(showInstructions ? "instructions" : "playing");
  }, [qIndex, language, onBack, showInstructions]);

  // Timer
  useEffect(() => {
    if (!timerActive) return;
    if (timer <= 0) handleBoom();

    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timerActive, timer]);

  const onWireClick = (i) => {
    if (status !== "playing") return;
    if (!clicked[i]) {
      setActiveStatement(i);
      return;
    }
    if (clicked.every(Boolean)) cutWire(i);
  };

  const closeStatement = () => {
    const updated = [...clicked];
    updated[activeStatement] = true;
    setClicked(updated);
    setActiveStatement(null);
    if (updated.every(Boolean)) setTimerActive(true);
  };

  const cutWire = (i) => {
    setTimerActive(false);
    if (i === question.correctIndex) {
      successSound.play();
      setStatus("success");
      setConfettiParams({
        numberOfPieces: 300,
        gravity: 0.5,
        colors: ["#4caf50", "#81c784", "#c8e6c9"]
      });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setStatus("playing");
        setQIndex(prev => prev + 1); // load next question
      }, 2000);
      setStreak(s => s + 1);
    } else handleBoom();
  };

  const handleBoom = () => {
    blastSound.play();
    setTimerActive(false);
    setStatus("boom");
    setConfettiParams({
      numberOfPieces: 200,
      gravity: 0.6,
      colors: ["#ff0000", "#ff9800", "#ffc107"]
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
  };

  const retryGame = () => {
    onBack(); // Go back to main menu
  };

  if (!question) return null;

  return (
    <div className="bomb-overlay">
      {showConfetti && <Confetti {...confettiParams} recycle={false} />}
      <button className="back-btn" onClick={onBack}>
        {bombText[language].back}
      </button>
      <div className="hud-right">🔥 {streak}</div>

      <div className="game-area-horizontal">
        {/* Instructions shown only once */}
        {status === "instructions" && showInstructions && (
          <div className="overlay">
            <div className="statement-modal">
              <h2>{bombText[language].title}</h2>
              <ul>
                {bombText[language].instructions.map((t,i) => <li key={i}>💡 {t}</li>)}
              </ul>
              <button onClick={() => { setStatus("playing"); setShowInstructions(false); }}>
                {bombText[language].start}
              </button>
            </div>
          </div>
        )}

        {/* Game area */}
        {(status === "playing" || status === "success") && (
          <div className="wires-container">
            {question.options.map((text, i) => (
              <div className="wire-block" key={i}>
                <div className="statement-box">{clicked[i] ? text : bombText[language].read}</div>
                <div className={`wire wire-${i}`} onClick={() => onWireClick(i)} />
              </div>
            ))}

            <div className={`bomb ${timer <= 5 && timerActive ? "danger" : ""}`}>
              <div className="bomb-timer">{timerActive ? timer : "--"}</div>
            </div>

            <div className="main-wire" />
          </div>
        )}
      </div>

      {/* Active statement modal */}
      {activeStatement !== null && (
        <div className="overlay">
          <div className="statement-modal">
            <h3>{question.options[activeStatement]}</h3>
            <button onClick={closeStatement}>{bombText[language].continue}</button>
          </div>
        </div>
      )}

      {/* Success overlay */}
      {status === "success" && (
        <div className="overlay success">
          <div className="result-card success-card">
            <h1>{bombText[language].defusedTitle}</h1>
            <p>{bombText[language].defusedMsg}</p>
          </div>
        </div>
      )}

      {/* Boom overlay with clickable retry */}
      {status === "boom" && (
        <>
          <div className="explosion-flash" />
          <div className="overlay retry">
            <div className="retry-card">
              <h2>{bombText[language].retryTitle}</h2>
              <p>{bombText[language].retryMsg}</p>
              <button onClick={retryGame}>{bombText[language].retryBtn}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
