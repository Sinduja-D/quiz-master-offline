// src/components/RiddleQuiz.js
import React, { useState, useEffect, useRef } from "react";
import "./RiddleQuiz.css";
import { ScienceQuestions } from "../data/RiddleDatas.js";

const RiddleQuestions = ({ language }) => {
  const [shuffledRiddles, setShuffledRiddles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  
  // Use a ref to track if we've initialized the questions
  const initializedRef = useRef(false);
  
  // Get language key (lowercase)
  const langKey = language.toLowerCase();
  
  // Initialize 10 random questions only once
  useEffect(() => {
    if (initializedRef.current) return;
    
    // Create a copy of all questions
    const allQuestions = [...ScienceQuestions];
    
    // Shuffle and select 10 unique questions
    const shuffled = [];
    while (shuffled.length < 10 && allQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      shuffled.push(allQuestions.splice(randomIndex, 1)[0]);
    }
    
    setShuffledRiddles(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    initializedRef.current = true;
  }, []);
  
  const currentRiddle = shuffledRiddles[currentIndex] || {};
  
  // Generate options whenever currentIndex, shuffledRiddles, or language changes
  useEffect(() => {
    if (shuffledRiddles.length > 0) {
      generateOptions();
    }
  }, [currentIndex, shuffledRiddles, language]);
  
  const generateOptions = () => {
    if (!shuffledRiddles.length) return;
    
    // Get the correct answer in the current language
    const correctAnswerText = currentRiddle.options[currentRiddle.correctAnswer][langKey];
    setCorrectAnswer(correctAnswerText);
    
    // Get all options in the current language
    const optionTexts = currentRiddle.options.map(opt => opt[langKey]);
    
    // Shuffle the options
    const shuffledOptions = [...optionTexts].sort(() => 0.5 - Math.random());
    setOptions(shuffledOptions);
    setSelectedOption(null);
    setShowResult(false);
  };
  
  const handleOptionSelect = (option) => {
    if (showResult) return;
    setSelectedOption(option);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setAttempts((prev) => prev + 1);
    if (correct) setScore((prev) => prev + 1);
  };
  
  const handleNext = () => {
    if (currentIndex < shuffledRiddles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Reset quiz after 10 questions
      initializedRef.current = false;
      const allQuestions = [...ScienceQuestions];
      const shuffled = [];
      while (shuffled.length < 10 && allQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        shuffled.push(allQuestions.splice(randomIndex, 1)[0]);
      }
      
      setShuffledRiddles(shuffled);
      setCurrentIndex(0);
      setScore(0);
      setAttempts(0);
    }
  };
  
  // Return loading state if no riddles available
  if (!shuffledRiddles.length) {
    return <div>Loading riddles...</div>;
  }
  
  return (
    <div className="multiple-choice-container">
      <div className="game-header">
        <h2>{language === "English" ? "Riddle Challenge" : "புதிர் சவால்"}</h2>
        <div className="score-board">
          <div className="score-item">
            <span>{language === "English" ? "Score" : "மதிப்பெண்"}:</span>
            <span className="score-value">
              {score}/{attempts}
            </span>
          </div>
        </div>
      </div>
      
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
            <p>{currentRiddle.question[langKey]}</p>
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
                {language === "English" ? "Submit Answer" : "பதிலை சமர்ப்பி"}
              </button>
            </div>
          ) : (
            <div className={`result-section ${isCorrect ? "correct" : "incorrect"}`}>
              <div className="result-header">
                <div className={`result-icon ${isCorrect ? "correct-icon" : "incorrect-icon"}`}>
                  {isCorrect ? "✓" : "✗"}
                </div>
                <div className="result-message">
                  {isCorrect
                    ? language === "English"
                      ? "Correct! Well done!"
                      : "சரியான பதில்! நன்றாக செய்தீர்கள்!"
                    : language === "English"
                    ? "Not Right Answer"
                    : "சரியான பதில் இல்லை"}
                </div>
              </div>
              
              <div className="answer-comparison">
                <div className="answer-row">
                  <span className="answer-label">
                    {language === "English" ? "Your Answer:" : "உங்கள் பதில்:"}
                  </span>
                  <span className="user-answer">{selectedOption}</span>
                </div>
                <div className="answer-row">
                  <span className="answer-label">
                    {language === "English" ? "Correct Answer:" : "சரியான பதில்:"}
                  </span>
                  <span className="correct-answer">{correctAnswer}</span>
                </div>
              </div>
              
              <button className="next-btn" onClick={handleNext}>
                {currentIndex === shuffledRiddles.length - 1
                  ? language === "English"
                    ? "Start New Quiz"
                    : "புதிய வினாடியைத் தொடங்கு"
                  : language === "English"
                  ? "Next Question"
                  : "அடுத்த கேள்வி"}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentIndex + 1) / shuffledRiddles.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="progress-text">
          {language === "English" ? "Progress" : "முன்னேற்றம்"}: {currentIndex + 1}/
          {shuffledRiddles.length}
        </div>
      </div>
    </div>
  );
};

export default RiddleQuestions;