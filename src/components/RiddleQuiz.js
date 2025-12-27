import React, { useEffect, useState } from "react";
import "./RiddleQuiz.css";
import { ScienceQuestions } from "../data/RiddleDatas";

const STORAGE_KEY = "riddle_progress";

const RiddleQuiz = ({ language, setActivePage }) => {
  const langKey = language.toLowerCase();

  const [riddles, setRiddles] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY); // clear old student data

    const shuffled = [...ScienceQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    setRiddles(shuffled);
  }, []);

  if (!riddles.length) return null;

  const current = riddles[index];
  const options = current.options.map(o => o[langKey]);
  const correct = current.options[current.correctAnswer][langKey];

  const submitAnswer = () => {
    setCorrectAnswer(correct);
    setShowResult(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowResult(false);
    if (index < riddles.length - 1) setIndex(i => i + 1);
  };

  return (
    <div className="riddle-screen">

      <button
        className="back-btn-games-fixed"
        onClick={() => setActivePage("games")}
      >
        🎮Games
      </button>

      <div className="riddle-box">

        <div className="riddle-header">
          <h3>🧩 Riddle Challenge</h3>
          <span>{index + 1} / {riddles.length}</span>
        </div>

        <div className="riddle-question">
          {current.question[langKey]}
        </div>

        <div className="riddle-options">
          {options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${selected === opt ? "selected" : ""}`}
              onClick={() => setSelected(opt)}
              disabled={showResult}
            >
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`result-box ${selected === correct ? "correct" : "wrong"}`}>
            {selected === correct ? "✔ Correct Answer" : "✖ Wrong Answer"}
            <div className="correct-text">
              Correct: {correct}
            </div>
          </div>
        )}

        <div className="riddle-footer">
          {!showResult ? (
            <button className="submit-btn" disabled={!selected} onClick={submitAnswer}>
              Submit
            </button>
          ) : (
            <button className="submit-btn" onClick={nextQuestion}>
              Next
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default RiddleQuiz;
