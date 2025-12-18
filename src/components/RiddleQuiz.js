import React, { useState, useEffect, useRef } from "react";
import "./RiddleQuiz.css";
import { ScienceQuestions } from "../data/RiddleDatas.js";

const RiddleQuiz = ({ language, setActivePage }) => {
  const [shuffledRiddles, setShuffledRiddles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const initializedRef = useRef(false);
  const langKey = language.toLowerCase();

  // Initialize quiz only once
  useEffect(() => {
    if (initializedRef.current) return;

    const allQuestions = [...ScienceQuestions];
    const shuffled = [];

    while (shuffled.length < 10 && allQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      shuffled.push(allQuestions.splice(randomIndex, 1)[0]);
    }

    setShuffledRiddles(shuffled);
    setCurrentIndex(0);
    setAttempts(0);
    initializedRef.current = true;
  }, []);

  const currentRiddle = shuffledRiddles[currentIndex] || {};

  // Generate options on question/language change
  useEffect(() => {
    if (shuffledRiddles.length > 0) {
      generateOptions();
    }
  }, [currentIndex, shuffledRiddles, language]);

  const generateOptions = () => {
    if (!currentRiddle.options) return;

    const correctText =
      currentRiddle.options[currentRiddle.correctAnswer][langKey];
    setCorrectAnswer(correctText);

    const optionTexts = currentRiddle.options.map(
      (opt) => opt[langKey]
    );

    setOptions([...optionTexts].sort(() => 0.5 - Math.random()));
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleOptionSelect = (option) => {
    if (!showResult) setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsCorrect(selectedOption === correctAnswer);
    setShowResult(true);
    setAttempts((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < shuffledRiddles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      initializedRef.current = false;
      const allQuestions = [...ScienceQuestions];
      const shuffled = [];

      while (shuffled.length < 10 && allQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        shuffled.push(allQuestions.splice(randomIndex, 1)[0]);
      }

      setShuffledRiddles(shuffled);
      setCurrentIndex(0);
      setAttempts(0);
    }
  };

  if (!shuffledRiddles.length) {
    return <div>Loading riddles...</div>;
  }

  return (
    <div className="multiple-choice-container">

      {/* Back Button */}
      <button
        className="back-btn-games-fixed"
        onClick={() => setActivePage("games")}
      >
        <span className="back-icon">←</span>
        <span className="back-text">
          {language === "English" ? "Games" : "விளையாட்டுகள்"}
        </span>
      </button>

      {/* Header */}
      <div className="game-header">
        <h2>{language === "English" ? "Riddle Challenge" : "புதிர் சவால்"}</h2>

        <div className="score-board">
          <div className="score-item">
            <span>{language === "English" ? "Score" : "மதிப்பெண்"}:</span>
            <span className="score-value">
              {attempts > 0 ? `${attempts - 1}/${attempts}` : "0/0"}
            </span>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="riddle-card">
        <div className="riddle-header">
          <div className="riddle-number">
            {language === "English" ? "Question #" : "கேள்வி #"}
            {currentIndex + 1}
          </div>
          <div className="riddle-category">
            {language === "English" ? "Multiple Choice" : "பல தேர்வு"}
          </div>
        </div>

        <div className="riddle-content">
          <div className="riddle-question">
            <p>{currentRiddle.question?.[langKey]}</p>
          </div>

          {!showResult ? (
            <div className="options-section">
              <div className="options-grid">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`option-card ${
                      selectedOption === option ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="option-text">{option}</div>
                  </div>
                ))}
              </div>

              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={selectedOption === null}
              >
                {language === "English"
                  ? "Submit Answer"
                  : "பதிலை சமர்ப்பு"}
              </button>
            </div>
          ) : (
            <div
              className={`result-section ${
                isCorrect ? "correct" : "incorrect"
              }`}
            >
              <div className="result-header">
                <div
                  className={`result-icon ${
                    isCorrect ? "correct-icon" : "incorrect-icon"
                  }`}
                >
                  {isCorrect ? "✓" : "✗"}
                </div>

                <div className="result-message">
                  {isCorrect
                    ? language === "English"
                      ? "Correct! Well done!"
                      : "சரியான பதில்! நன்றாக செய்து!"
                    : language === "English"
                    ? "Wrong Answer"
                    : "தவறான பதில்"}
                </div>
              </div>

              <div className="answer-comparison">
                <div className="answer-row">
                  <span className="answer-label">
                    {language === "English"
                      ? "Your Answer:"
                      : "உங்கள் பதில்:"}
                  </span>
                  <span className="user-answer">{selectedOption}</span>
                </div>

                <div className="answer-row">
                  <span className="answer-label">
                    {language === "English"
                      ? "Correct Answer:"
                      : "சரியான பதில்:"}
                  </span>
                  <span className="correct-answer">{correctAnswer}</span>
                </div>
              </div>

              <button className="next-btn" onClick={handleNext}>
                {currentIndex === shuffledRiddles.length - 1
                  ? language === "English"
                    ? "Start New Quiz"
                    : "புதிய வினாடி தொடங்கு"
                  : language === "English"
                  ? "Next Question"
                  : "அடுத்த கேள்வி"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentIndex + 1) / shuffledRiddles.length) * 100}%`,
            }}
          />
        </div>

        <div className="progress-text">
          {language === "English" ? "Progress" : "முன்னேற்ற"}:{" "}
          {currentIndex + 1}/{shuffledRiddles.length}
        </div>
      </div>
    </div>
  );
};

export default RiddleQuiz;
