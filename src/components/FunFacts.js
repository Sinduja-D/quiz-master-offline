import React, { useState, useEffect } from 'react';
import './FunFacts.css';
import funFactsData from '../data/funFactsData';

const FunFacts = ({ language }) => {
  const [board, setBoard] = useState([]);
  const [selectedFact, setSelectedFact] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [usedIndices, setUsedIndices] = useState([]);

  // Initialize the board with random facts
  useEffect(() => {
    resetBoard();
  }, []);

  const resetBoard = () => {
    // If we've used all facts, reshuffle and reset used indices
    let newUsedIndices = [...usedIndices];
    if (newUsedIndices.length >= funFactsData.length) {
      newUsedIndices = [];
    }

    // Get 9 unique random facts
    const newFacts = [];
    while (newFacts.length < 9 && newUsedIndices.length < funFactsData.length) {
      const randomIndex = Math.floor(Math.random() * funFactsData.length);
      if (!newUsedIndices.includes(randomIndex)) {
        newFacts.push(funFactsData[randomIndex]);
        newUsedIndices.push(randomIndex);
      }
    }

    // Update used indices
    setUsedIndices(newUsedIndices);

    // If no facts available, end the game
    if (newFacts.length === 0) {
      setBoard([]);
      setGameCompleted(true);
      return;
    }

    // Create board with new facts
    const newBoard = newFacts.map((fact, index) => ({
      id: index,
      fact: fact,
      revealed: false,
      position: index + 1,
    }));

    setBoard(newBoard);
    setSelectedFact(null);
    setGameCompleted(false);
  };

  const handleSquareClick = (square) => {
    // Allow clicking on revealed squares
    if (square.revealed) {
      setSelectedFact(square.fact);
      return;
    }

    // Update the board to mark this square as revealed
    const updatedBoard = board.map((item) =>
      item.id === square.id ? { ...item, revealed: true } : item
    );
    setBoard(updatedBoard);
    setSelectedFact(square.fact);

    // Check if all squares are revealed
    const allRevealed = updatedBoard.every((item) => item.revealed);
    if (allRevealed) {
      setGameCompleted(true);
    }
  };

  const revealedCount = board.filter((item) => item.revealed).length;

  return (
    <div className="board-game-container">
      <div className="game-header">
        <h1>{language === 'English' ? 'Science Fact Explorer' : 'அறிவியல் உண்மை ஆய்வாளர்'}</h1>
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-value">{revealedCount}</span>
            <span>{language === 'English' ? 'Revealed' : 'திறப்பு'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{board.length}</span>
            <span>{language === 'English' ? 'Total' : 'மொத்தம்'}</span>
          </div>
        </div>
      </div>

      <div className="game-board">
        {board.map((square) => (
          <div
            key={square.id}
            className={`board-square ${square.revealed ? 'revealed' : ''}`}
            onClick={() => handleSquareClick(square)}
          >
            <div className="square-inner">
              <div className="square-front">
                <span className="square-number">{square.position}</span>
                <div className="square-icon">❓</div>
              </div>
              <div className="square-back">
                <div className="square-back-content">
                  <div className="fact-icon">💡</div>
                  <span className="fact-preview">
                    {language === 'English'
                      ? square.fact.en.substring(0, 30) + '...'
                      : square.fact.ta.substring(0, 30) + '...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFact && (
        <div className="fact-display">
          <div className="fact-card">
            <div className="fact-content">
              <p>{language === 'English' ? selectedFact.en : selectedFact.ta}</p>
            </div>
          </div>
        </div>
      )}

      {gameCompleted && (
        <div className="game-completed">
          <div className="completion-message">
            <h2>{language === 'English' ? 'Congratulations!' : 'வாழ்த்துக்கள்!'}</h2>
            <p>
              {language === 'English'
                ? "You've discovered all the science facts!"
                : 'நீங்கள் அனைத்து அறிவியல் உண்மைகளையும் கண்டறிந்தீர்கள்!'}
            </p>
          </div>
        </div>
      )}

      <div className="game-controls">
        <button onClick={resetBoard} className="reset-btn">
          {language === 'English' ? 'New Game' : 'புதிய விளையாட்டு'}
        </button>
      </div>
    </div>
  );
};

export default FunFacts;
