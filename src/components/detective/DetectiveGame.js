import React, { useEffect, useState, useRef } from "react";
import { playCorrect, playWrong, startInvestigationAmbience, stopInvestigationAmbience } from "./detectiveSounds";

export default function DetectiveGame({ caseData, language, onFinish, onCancel }) {
  const totalQuestions = caseData.questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [remaining, setRemaining] = useState(18); // seconds per question
  const timerRef = useRef(null);

  const q = caseData.questions[index];
  const totalTime = 18;

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    // start ambient "investigation" sound while the quiz is active
    startInvestigationAmbience();
    return () => stopInvestigationAmbience();
  }, []);

  function startTimer() {
    clearInterval(timerRef.current);
    setRemaining(totalTime);
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timerRef.current);
          revealCorrect(null); // time out
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  }

  function revealCorrect(chosenIndex) {
    setSelected(chosenIndex);
    setShowFeedback(true);

    // play appropriate sound
    if (chosenIndex === q.answer) playCorrect();
    else playWrong();

    // After brief pause show correct and move to next
    setTimeout(() => {
      setShowFeedback(false);
      setSelected(null);
      if (index < totalQuestions - 1) {
        setIndex(index + 1);
      } else {
        onFinish();
      }
    }, 1200);
  }

  function handleChoose(idx) {
    if (showFeedback) return;
    clearInterval(timerRef.current);
    revealCorrect(idx);
  }

  const percent = Math.max(0, Math.round((remaining / totalTime) * 100));

  return (
    <div className="detective-container game-page">
      <div className="detective-card game-card">
        <div className="game-top">
          <div>
            <h3>🧩 Clue {index + 1} / {totalQuestions}</h3>
            <p className="detective-question">{q.q[language]}</p>
          </div>

          <div className="timer-column">
            <div className={`timer-circle ${percent <= 25 ? "urgent" : ""} ${percent <= 60 ? "pulse" : ""}`} style={{ ['--value']: percent }}>
              {remaining}s
            </div>
            <div className="timer-label">Time left</div>

            <div className="timer-bar" aria-hidden>
              <div className="fill" style={{ width: `${percent}%` }} />
            </div>

            <button className="cancel small" onClick={onCancel} style={{ marginTop: 10 }}>✖ Back to Cases</button>
          </div>
        </div>

        <div className="detective-options">
          {q.options.map((o, idx) => {
            let cls = "";
            if (showFeedback) {
              if (idx === q.answer) cls = "correct";
              else if (idx === selected) cls = "incorrect";
              else cls = "muted";
            }
            return (
              <button
                key={idx}
                className={`option-btn ${cls}`}
                onClick={() => handleChoose(idx)}
                disabled={showFeedback}
              >
                <span className={`option-index`}>{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{o}</span>
              </button>
            );
          })}
        </div>

        <div className="hint">💡 {q.hint[language]}</div>

        <div className="progress">
          <div className="dots">
            {Array.from({ length: totalQuestions }).map((_, ii) => (
              <div key={ii} className={`dot ${ii < index ? "done" : ii === index ? "active" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
