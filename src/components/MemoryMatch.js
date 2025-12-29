import React, { useEffect, useRef, useState } from "react";
import "./MemoryMatch.css";

/* ================= ELEMENT DATA ================= */
const ELEMENTS = [
  { id: 1, name: "Hydrogen", symbol: "H" },
  { id: 2, name: "Helium", symbol: "He" },
  { id: 3, name: "Lithium", symbol: "Li" },
  { id: 4, name: "Beryllium", symbol: "Be" },
  { id: 5, name: "Boron", symbol: "B" },
  { id: 6, name: "Carbon", symbol: "C" },
  { id: 7, name: "Nitrogen", symbol: "N" },
  { id: 8, name: "Oxygen", symbol: "O" },
  { id: 9, name: "Fluorine", symbol: "F" },
  { id: 10, name: "Neon", symbol: "Ne" },

  { id: 11, name: "Sodium", symbol: "Na" },
  { id: 12, name: "Magnesium", symbol: "Mg" },
  { id: 13, name: "Aluminium", symbol: "Al" },
  { id: 14, name: "Silicon", symbol: "Si" },
  { id: 15, name: "Phosphorus", symbol: "P" },
  { id: 16, name: "Sulfur", symbol: "S" },
  { id: 17, name: "Chlorine", symbol: "Cl" },
  { id: 18, name: "Argon", symbol: "Ar" },
  { id: 19, name: "Potassium", symbol: "K" },
  { id: 20, name: "Calcium", symbol: "Ca" },

  { id: 21, name: "Iron", symbol: "Fe" },
  { id: 22, name: "Copper", symbol: "Cu" },
  { id: 23, name: "Zinc", symbol: "Zn" },
  { id: 24, name: "Silver", symbol: "Ag" },
  { id: 25, name: "Gold", symbol: "Au" },
  { id: 26, name: "Mercury", symbol: "Hg" },
  { id: 27, name: "Tin", symbol: "Sn" },
  { id: 28, name: "Lead", symbol: "Pb" },
  { id: 29, name: "Nickel", symbol: "Ni" },
  { id: 30, name: "Cobalt", symbol: "Co" }
];

/* ================= UTILS ================= */
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ================= SOUND (win) ================= */
function playWinSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    const playTone = (freq, t, dur = 0.18) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.value = 0;
      g.gain.setValueAtTime(0, now + t);
      g.gain.linearRampToValueAtTime(0.18, now + t + 0.01);
      g.gain.linearRampToValueAtTime(0.001, now + t + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(now + t);
      o.stop(now + t + dur + 0.02);
    };

    // simple celebratory arpeggio (three quick notes + small flourish)
    playTone(880, 0.00, 0.14);
    playTone(1100, 0.12, 0.14);
    playTone(1320, 0.26, 0.20);
    // little descending finish
    playTone(1046, 0.52, 0.18);
    playTone(880, 0.72, 0.18);

    // optional vibration for supported devices
    if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
  } catch (e) {
    // audio may be blocked by browser without user gesture — fallback to short beep via Audio tag
    try {
      const s = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA=";
      const a = new Audio(s);
      a.play().catch(() => {});
    } catch (er) {}
  }
}

/* ================= MAIN ================= */
export default function MemoryMatch({ onBack }) {
  const [grid, setGrid] = useState({ rows: 4, cols: 4 });
  const pairCount = (grid.rows * grid.cols) / 2;

  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  const pickPairs = () => shuffle(ELEMENTS).slice(0, pairCount);

  const buildCards = (pairs) =>
    shuffle(
      pairs.flatMap((el) => [
        { id: el.id + "-n", pairId: el.id, label: el.name, type: "name" },
        { id: el.id + "-s", pairId: el.id, label: el.symbol, type: "symbol" },
      ])
    );

  const [cards, setCards] = useState(() => buildCards(pickPairs()));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  /* TIMER */
  useEffect(() => {
    clearInterval(timerRef.current);
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startRef.current) / 1000));
    }, 500);
    return () => clearInterval(timerRef.current);
  }, [grid]);

  /* STOP TIMER ON WIN */
  useEffect(() => {
    if (matched.size === pairCount) {
      clearInterval(timerRef.current);
      playWinSound();
    }
  }, [matched, pairCount]);

  /* MATCH LOGIC */
  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      const c1 = cards[a];
      const c2 = cards[b];

      if (c1.pairId === c2.pairId && c1.type !== c2.type) {
        setMatched((m) => new Set(m).add(c1.pairId));
        setFlipped([]);
      } else {
        setWrong([a, b]);
        setTimeout(() => {
          setWrong([]);
          setFlipped([]);
        }, 700);
      }
      setMoves((m) => m + 1);
    }
  }, [flipped, cards]);

  const flipCard = (i) => {
    if (flipped.length === 2) return;
    if (flipped.includes(i)) return;
    if (matched.has(cards[i].pairId)) return;
    setFlipped((f) => [...f, i]);
  };

  const resetGame = (rows = grid.rows, cols = grid.cols) => {
    const newPairs = shuffle(ELEMENTS).slice(0, (rows * cols) / 2);
    setGrid({ rows, cols });
    setTime(0);
    setMoves(0);
    setMatched(new Set());
    setFlipped([]);
    setWrong([]);
    setCards(buildCards(newPairs));
  };

  const level =
    grid.rows === 4 ? "Easy" :
    grid.rows === 6 && grid.cols === 6 ? "Medium" :
    "Advanced";

  const allMatched = matched.size === pairCount;

  function doneToGames() {
    if (typeof onBack === "function") {
      onBack();
      return;
    }
    window.dispatchEvent(new CustomEvent("navigate", { detail: { page: "games" } }));
    if (window.history.length > 1) window.history.back();
  }

  /* Result overlay content */
  function ResultOverlay() {
    // simple performance rating
    const accuracy = Math.round((pairCount / Math.max(1, moves)) * 100);
    let stars = 1;
    if (moves <= pairCount * 1.6) stars = 3;
    else if (moves <= pairCount * 2.4) stars = 2;

    return (
      <div className="mm-result" role="dialog" aria-modal="true" aria-label="Result">
        <div className="mm-result-card">
          <h2>🎉 Congratulations!</h2>
          <p style={{ marginTop: 6, fontWeight: 700 }}>You completed {level} level</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900 }}>{time}s</div>
              <div className="small">Time</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900 }}>{moves}</div>
              <div className="small">Moves</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900 }}>{stars}★</div>
              <div className="small">Rating</div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="mm-btn" onClick={() => resetGame(grid.rows, grid.cols)}>Play Again</button>
            <button className="mm-btn ghost" onClick={doneToGames}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mm-wrapper">
      {/* NOTE: Confetti UI removed; sound plays on win */}
      {/* 🎮 FIXED GAMES BUTTON */}
      <button className="mm-games-btn" onClick={doneToGames}>
        🎮 Games
      </button>

      <div className="mm-card">
        <header className="mm-header">
          <div>
            <div className="mm-title">Element Match</div>
            <div className="mm-sub">Match element name with its symbol</div>
          </div>
          <button className="mm-btn" onClick={() => resetGame()}>
            Restart
          </button>
        </header>

        <div className="mm-level-buttons">
          <button className="mm-btn" onClick={() => resetGame(4, 4)}>Easy</button>
          <button className="mm-btn" onClick={() => resetGame(6, 6)}>Medium</button>
          <button className="mm-btn" onClick={() => resetGame(6, 8)}>Advanced</button>
        </div>

        <div className="mm-stats">
          <div>⏱ {time}s</div>
          <div>🎯 Moves: {moves}</div>
          <div>✅ {matched.size}/{pairCount}</div>
        </div>

        <div className="mm-level">Level: {level}</div>

        <div
          className="mm-grid"
          style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)` }}
        >
          {cards.map((card, i) => {
            const isFlipped = flipped.includes(i) || matched.has(card.pairId);
            return (
              <button
                key={card.id}
                className={`mm-card-item ${isFlipped ? "flipped" : ""} ${wrong.includes(i) ? "wrong" : ""} ${matched.has(card.pairId) ? "correct" : ""}`}
                onClick={() => flipCard(i)}
              >
                <div className="mm-front">
                  {card.type === "symbol"
                    ? <div className="mm-symbol">{card.label}</div>
                    : <div className="mm-name">{card.label}</div>}
                </div>
                <div className="mm-back">?</div>
              </button>
            );
          })}
        </div>
      </div>

      {allMatched && <ResultOverlay />}
    </div>
  );
}