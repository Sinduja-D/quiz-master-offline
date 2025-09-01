// src/components/FunFacts.js
import React, { useState } from 'react';
import './FunFacts.css';
import funFactsData from '../data/funFactsData';

const FunFacts = ({ language }) => {
  const [currentFact, setCurrentFact] = useState(
    funFactsData[Math.floor(Math.random() * funFactsData.length)]
  );

  const showAnotherFact = () => {
    let newFact;
    do {
      newFact = funFactsData[Math.floor(Math.random() * funFactsData.length)];
    } while (newFact.en === currentFact.en); 
    setCurrentFact(newFact);
  };

  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'Fun Science Facts' : 'அறிவியல் சுவாரஸ்யங்கள்'}</h2>
      <div className="fun-fact-box">
        <p>{language === 'English' ? currentFact.en : currentFact.ta}</p>
      </div>
      <button onClick={showAnotherFact} className="another-btn">
        {language === 'English' ? 'Show Another Fact' : 'மற்றொரு சுவாரஸ்யம்'}
      </button>
    </div>
  );
};

export default FunFacts;
