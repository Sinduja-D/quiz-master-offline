import React, { useState } from "react";
import './RiddleQuiz.css';

// Import JSON data
import riddlesEnglish from "../data/riddlesEnglish.json";
import riddlesTamil from "../data/riddlesTamil.json";

const RiddleQuiz = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Pick riddles based on language
  const riddles = language === "English" ? riddlesEnglish : riddlesTamil;

  if (!riddles.length) return <div>No riddles found!</div>;

  const currentRiddle = riddles[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % riddles.length);
  };

  return (
    <div className="riddle-container">
      <h2>{language === "English" ? "Riddle" : "புதிர்"} {currentIndex + 1}</h2>
      <p>{currentRiddle.riddle}</p>

      {!showAnswer ? (
        <button onClick={() => setShowAnswer(true)}>
          {language === "English" ? "Show Answer" : "பதில் காண்பி"}
        </button>
      ) : (
        <div className="answer-box">
          <p><strong>{language === "English" ? "Answer" : "பதில்"}:</strong> {currentRiddle.answer}</p>
          <p><strong>{language === "English" ? "Explanation" : "விளக்கம்"}:</strong> {currentRiddle.explanation}</p>
          <button onClick={handleNext}>
            {language === "English" ? "Next Riddle" : "அடுத்த புதிர்"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RiddleQuiz;
