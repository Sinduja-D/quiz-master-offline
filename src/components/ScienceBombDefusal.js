import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Howl } from "howler";
import bombQuestions from "../data/bombDefusalQuestions.json";
import "./ScienceBombDefusal.css";

/* ================= CONFIG ================= */
const TIME_LIMIT = 12;
const SWIPE_DISTANCE = 70;

/* ================= SOUNDS ================= */
const blastSound = new Howl({ src: ["/sounds/blast.mp3"] });
const successSound = new Howl({ src: ["/sounds/success.mp3"] });

/* ================= BILINGUAL TEXT ================= */
/* SAME PATTERN AS EscapeRoom */
const bombText = {
  English: {
    title: "Defuse the Bomb",
    instructions: [
      "Read all the statements carefully",
      "Timer starts after reading all clues",
      "Swipe the correct wire to defuse the bomb"
    ],
    start: "Start Mission",
    tap: "Tap to reveal",
    successTitle: "Congratulations!",
    successMsg: "You successfully defused the bomb!",
    retry: "Retry",
    next: "Next Bomb",
    back: "← Back"
  },
  Tamil: {
    title: "குண்டை செயலிழக்கச் செய்",
    instructions: [
      "அனைத்து குறிப்புகளையும் கவனமாக வாசிக்கவும்",
      "அனைத்தையும் வாசித்த பின் நேரம் தொடங்கும்",
      "சரியான கம்பியை ஸ்வைப் செய்து குண்டை நிறுத்தவும்"
    ],
    start: "தொடங்கு",
    tap: "தொடத் திற",
    successTitle: "வாழ்த்துகள்!",
    successMsg: "நீங்கள் குண்டை வெற்றிகரமாக செயலிழக்கச் செய்தீர்கள்!",
    retry: "மீண்டும் முயற்சி",
    next: "அடுத்த குண்டு",
    back: "← மெனுவிற்கு திரும்ப"
  }
};

export default function ScienceBombDefusal({ language, onBack, onComplete }) {
  const [question, setQuestion] = useState(null);
  const [clicked, setClicked] = useState([false, false, false]);
  const [activeStatement, setActiveStatement] = useState(null);
  const [status, setStatus] = useState("instructions");
  const [timer, setTimer] = useState(TIME_LIMIT);
  const [streak, setStreak] = useState(0);
  const swipeStart = useRef({});

  /* INIT */
  useEffect(() => {
    const q = bombQuestions[Math.floor(Math.random() * bombQuestions.length)];
    setQuestion({
      ...q,
      options: q.statements[language].slice(0, 3)
    });
  }, [language]);

  /* TIMER */
  useEffect(() => {
    if (status !== "playing") return;
    if (timer === 0) triggerBoom();

    const i = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(i);
  }, [timer, status]);

  /* STATEMENT FLOW */
  const revealStatement = (i) => {
    if (status === "reading" && !clicked[i]) {
      setActiveStatement(i);
    }
  };

  const closeStatement = () => {
    const updated = [...clicked];
    updated[activeStatement] = true;
    setClicked(updated);
    setActiveStatement(null);

    if (updated.every(Boolean)) {
      setStatus("playing");
      setTimer(TIME_LIMIT);
    }
  };

  /* SWIPE CUT */
  const swipeStartHandler = (e, i) => {
    if (status !== "playing") return;
    swipeStart.current[i] = e.clientX || e.touches?.[0]?.clientX;
  };

  const swipeEndHandler = (e, i) => {
    if (status !== "playing") return;
    const endX = e.clientX || e.changedTouches?.[0]?.clientX;
    if (endX - swipeStart.current[i] > SWIPE_DISTANCE) {
      cutWire(i);
    }
  };

  const cutWire = (i) => {
    if (i === question.correctIndex) {
      successSound.play();
      setStatus("success");
      setStreak(s => s + 1);
      onComplete?.("bomb", "completed");
    } else {
      triggerBoom();
    }
  };

  const triggerBoom = () => {
    blastSound.play();
    setStatus("boom");
    setStreak(0);
    onComplete?.("bomb", "failed");
  };

  if (!question) return null;

  return (
    <div className={`bomb-overlay ${status}`}>

      {/* HUD */}
      <div className="hud-left">⏱ {status === "playing" ? timer : "--"}</div>
      <div className="hud-right">🔥 {streak}</div>

      {/* BACK */}
      <button className="back-btn" onClick={onBack}>
        {bombText[language].back}
      </button>

      {/* GAME */}
      <div className="game-area">

        {/* WIRES */}
        <div className="wires">
          {question.options.map((text, i) => (
            <div className="wire-row" key={i}>
              <div
                className={`wire wire-${i}`}
                onClick={() => revealStatement(i)}
                onPointerDown={(e) => swipeStartHandler(e, i)}
                onPointerUp={(e) => swipeEndHandler(e, i)}
              />
              <div className="statement-box">
                {clicked[i] ? text : bombText[language].tap}
              </div>
            </div>
          ))}
        </div>

        {/* BOMB */}
        <div className={`bomb ${status}`} />
      </div>

      {/* CONFETTI */}
      {status === "success" && <Confetti />}
      {status === "boom" && <Confetti colors={["#ff0000", "#ff9800"]} />}

      {/* INSTRUCTIONS */}
      {status === "instructions" && (
        <div className="overlay instructions">
          <div className="instruction-card">
            <h2>{bombText[language].title}</h2>
            <ul>
              {bombText[language].instructions.map((t, i) => (
                <li key={i}>💡 {t}</li>
              ))}
            </ul>
            <button className="start-btn" onClick={() => setStatus("reading")}>
              🚀 {bombText[language].start}
            </button>
          </div>
        </div>
      )}

      {/* STATEMENT */}
      {activeStatement !== null && (
        <div className="overlay">
          <h3>{question.options[activeStatement]}</h3>
          <button onClick={closeStatement}>Next</button>
        </div>
      )}

      {/* SUCCESS */}
      {status === "success" && (
        <div className="overlay success">
          <h1>{bombText[language].successTitle}</h1>
          <p>{bombText[language].successMsg}</p>
          <button onClick={() => window.location.reload()}>
            {bombText[language].next}
          </button>
        </div>
      )}

      {/* BOOM */}
      {status === "boom" && (
        <div className="overlay boom">
          <h1>💥 BOOM!</h1>
          <button onClick={() => window.location.reload()}>
            {bombText[language].retry}
          </button>
        </div>
      )}
    </div>
  );
}
