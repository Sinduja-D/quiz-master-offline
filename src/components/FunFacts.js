// src/components/FunFacts.js
import React, { useState } from 'react';
import './FunFacts.css';

const FunFacts = ({ language }) => {
  const facts = [
    { en: "Bananas are berries, but strawberries are not!", ta: "வாழைப்பழம் பேரிக்காய், ஆனால் ஸ்ட்ராபெரி அல்ல!" },
    { en: "Lightning is five times hotter than the Sun’s surface.", ta: "மின்னல் சூரியன் மேற்பரப்பை விட ஐந்து மடங்கு சூடானது." },
    { en: "Your DNA could stretch from the Earth to the Sun and back 600 times!", ta: "உங்கள் டி.என்.ஏ. பூமியிலிருந்து சூரியன் வரை சென்று 600 முறை திரும்ப முடியும்!" },
    { en: "Sharks existed before trees appeared on Earth.", ta: "பூமியில் மரங்கள் தோன்றுவதற்கு முன் சுறாக்கள் இருந்தன." },
    { en: "Octopuses have three hearts and blue blood.", ta: "ஒட்டகச்சிவிங்கிகளுக்கு மூன்று இதயங்கள் மற்றும் நீல இரத்தம் உள்ளது." },
    { en: "The Eiffel Tower can grow taller in summer because metal expands with heat.", ta: "வெயிலில் உலோகம் விரிவடைவதால் ஐஃபல் கோபுரம் உயரமாகும்." },
    { en: "Water can boil and freeze at the same time (called the triple point).", ta: "தண்ணீர் ஒரே நேரத்தில் கொதித்து உறையக்கூடும் (அதை 'டிரிபிள் பாயிண்ட்' என்பர்)." },
    { en: "A teaspoon of honey is the lifetime work of 12 bees.", ta: "ஒரு தேக்கரண்டி தேனுக்கு 12 தேனீக்களின் வாழ்நாள் உழைப்பு தேவை." },
    { en: "An ostrich’s eye is bigger than its brain.", ta: "ஒரு நெருப்புக்கோழியின் கண் அதன் மூளை விட பெரியது." },
    { en: "If you could fold paper 42 times, it would reach the Moon.", ta: "நீங்கள் ஒரு காகிதத்தை 42 மடங்கு மடித்தால், அது நிலவுக்கு சென்று சேரும்." }
  ];

  const [currentFact, setCurrentFact] = useState(
    facts[Math.floor(Math.random() * facts.length)]
  );

  const showAnotherFact = () => {
    let newFact;
    do {
      newFact = facts[Math.floor(Math.random() * facts.length)];
    } while (newFact.en === currentFact.en); // avoid same fact
    setCurrentFact(newFact);
  };

  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'Fun Science Facts' : 'அறிவியல் சுவாரஸ்யங்கள்'}</h2>
      <div className="fun-fact-box">
        <p>{language === 'English' ? currentFact.en : currentFact.ta}</p>
      </div>
      <button onClick={showAnotherFact} className="feature-btn">
        {language === 'English' ? 'Show Another Fact' : 'மற்றொரு சுவாரஸ்யம்'}
      </button>
    </div>
  );
};

export default FunFacts;
