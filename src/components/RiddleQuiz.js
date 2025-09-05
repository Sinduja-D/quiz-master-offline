import React, { useState, useEffect } from "react";
import './RiddleQuiz.css';
import riddlesEnglish from "../data/riddlesEnglish.json";
import riddlesTamil from "../data/riddlesTamil.json";

const MultipleChoiceRiddle = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [options, setOptions] = useState([]);
  
  // Pick riddles based on language
  const riddles = language === "English" ? riddlesEnglish : riddlesTamil;
  
  if (!riddles.length) return <div>No riddles found!</div>;
  
  const currentRiddle = riddles[currentIndex];
  
  // Generate multiple choice options
  useEffect(() => {
    generateOptions();
  }, [currentIndex, language]);
  
  const generateOptions = () => {
    // Get correct answer
    const correctAnswer = currentRiddle.answer;
    
    // Get incorrect answers from other riddles
    const incorrectAnswers = riddles
      .filter(r => r.id !== currentRiddle.id)
      .map(r => r.answer)
      .filter(answer => answer !== correctAnswer);
    
    // Shuffle and take 3 incorrect answers
    const shuffled = [...incorrectAnswers].sort(() => 0.5 - Math.random());
    const selectedIncorrect = shuffled.slice(0, 3);
    
    // Combine and shuffle all options
    const allOptions = [correctAnswer, ...selectedIncorrect];
    const shuffledOptions = [...allOptions].sort(() => 0.5 - Math.random());
    
    setOptions(shuffledOptions);
    setSelectedOption(null);
    setShowResult(false);
  };
  
  const handleOptionSelect = (option) => {
    if (showResult) return; // Prevent changing after submission
    setSelectedOption(option);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === currentRiddle.answer;
    setIsCorrect(correct);
    setShowResult(true);
    setAttempts(attempts + 1);
    
    if (correct) {
      setScore(score + 1);
    }
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % riddles.length);
  };
  
  return (
    <div className="multiple-choice-container">
      <div className="game-header">
        <h2>{language === "English" ? "Riddle Challenge" : "புதிர் சவால்"}</h2>
        <div className="score-board">
          <div className="score-item">
            <span>{language === "English" ? "Score" : "மதிப்பெண்"}:</span>
            <span className="score-value">{score}/{attempts}</span>
          </div>
        </div>
      </div>
      
      <div className="riddle-card">
        <div className="riddle-header">
          <div className="riddle-number">
            {language === "English" ? "Riddle #" : "புதிர் #"}{currentIndex + 1}
          </div>
          <div className="riddle-category">
            {language === "English" ? "Multiple Choice" : "பல தேர்வு"}
          </div>
        </div>
        
        <div className="riddle-content">
          <div className="riddle-question">
            <p>{currentRiddle.riddle}</p>
          </div>
          
          {!showResult ? (
            <div className="options-section">
              <div className="options-grid">
                {options.map((option, index) => (
                  <div 
                    key={index}
                    className={`option-card ${selectedOption === option ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="option-text">
                      {option}
                    </div>
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
            <div className={`result-section ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-header">
                <div className={`result-icon ${isCorrect ? 'correct-icon' : 'incorrect-icon'}`}>
                  {isCorrect ? '✓' : '✗'}
                </div>
                <div className="result-message">
                  {isCorrect 
                    ? (language === "English" ? "Correct! Well done!" : "சரியான பதில்! நன்றாக செய்தீர்கள்!")
                    : (language === "English" ? "Not quite right" : "சரியான பதில் இல்லை")
                  }
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
                  <span className="correct-answer">{currentRiddle.answer}</span>
                </div>
              </div>
              
              <div className="explanation-box">
                <div className="explanation-title">
                  {language === "English" ? "Explanation" : "விளக்கம்"}
                </div>
                <p>{currentRiddle.explanation}</p>
              </div>
              
              <button className="next-btn" onClick={handleNext}>
                {language === "English" ? "Next Riddle" : "அடுத்த புதிர்"}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / riddles.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {language === "English" ? "Progress" : "முன்னேற்றம"}: {currentIndex + 1}/{riddles.length}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceRiddle;