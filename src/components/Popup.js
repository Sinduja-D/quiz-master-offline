import React from 'react';
import './Popup.css';


const Popup = ({ message, onClose, timer }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{message}</h2>
        {timer > 0 && <div className="timer">{timer}</div>}
        {timer === 0 && <button className="popup-button" onClick={onClose}>Start Quiz</button>}
      </div>
    </div>
  );
};

export default Popup;