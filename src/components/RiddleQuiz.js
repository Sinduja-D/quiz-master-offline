import React, { useState } from "react";
import riddlesData from "../data/riddles.json";
import './RiddleQuiz.css'; // just import CSS, no variable needed
 // adjust path if needed

const RiddleQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const riddles = riddlesData; // your JSON array

  if (!riddles || riddles.length === 0) {
    return <div>No riddles found!</div>;
  }

  const currentRiddle = riddles[currentIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % riddles.length);
  };

  return (
    <div className="riddle-container">
      <h2>Riddle {currentIndex + 1}</h2>
      <p>{currentRiddle.riddle}</p>

      {!showAnswer && (
        <button onClick={() => handleOptionClick(currentRiddle.answer)}>
          Show Answer
        </button>
      )}

      {showAnswer && (
        <div className="answer-box">
          <p>
            <strong>Answer:</strong> {currentRiddle.answer}
          </p>
          <p>
            <strong>Explanation:</strong> {currentRiddle.explanation}
          </p>
          <button onClick={handleNext}>Next Riddle</button>
        </div>
      )}
    </div>
  );
};

export default RiddleQuiz;
