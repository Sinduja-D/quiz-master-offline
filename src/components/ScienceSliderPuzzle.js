import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ScienceSliderPuzzle.css";
const words = [
  "Atom",
  "Molecule",
  "Cell",
  "Tissue",
  "Organ",
  "System",
  "Organism",
  "Ecosystem",
];

export default function SciencePuzzle({ size = 3, onBack }) {
  const total = size * size;

  function createBoard() {
    const arr = [];
    for (let i = 1; i < total; i++) arr.push(i);
    arr.push(null);
    return shuffle(arr);
  }

  function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(createBoard());
  }, []);

  function moveTile(index) {
    const empty = board.indexOf(null);
    const r1 = Math.floor(index / size);
    const c1 = index % size;
    const r2 = Math.floor(empty / size);
    const c2 = empty % size;

    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
      const copy = [...board];
      [copy[index], copy[empty]] = [copy[empty], copy[index]];
      setBoard(copy);
    }
  }

  const isSolved = board.every(
    (v, i) => v === (i + 1 === total ? null : i + 1)
  );

  return (
    <div className="puzzle-wrapper">
      <div className="puzzle-card">
        <h2>🧪 Science Puzzle</h2>

        <p className="how">
          Arrange the tiles in correct order (1 → 8).  
          Click a tile next to the empty box.
        </p>

        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {board.map((v, i) => (
  <button
    key={i}
    className={`tile ${v === null ? "empty" : ""}`}
    onClick={() => v !== null && moveTile(i)}
  >
    {v && (
      <div className="tile-content">
        <div className="num">{v}</div>
        <div className="word">{words[v - 1]}</div>
      </div>
    )}
  </button>
))}

        </div>

        {isSolved && <div className="win">🎉 You Solved It!</div>}

        <div className="actions">
          <button onClick={() => setBoard(createBoard())}>Restart</button>
          <button className="ghost" onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}