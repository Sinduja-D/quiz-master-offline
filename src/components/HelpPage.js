// src/components/HelpPage.jsx
import React from 'react';

const HelpPage = ({ language }) => {
  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'Help & Support' : 'உதவி மற்றும் ஆதரவு'}</h2>
      <p>
        {language === 'English' 
          ? '1. Select your preferred difficulty level to start a quiz.'
          : '1. வினாத்திட்டத்தைத் தொடங்க உங்களுக்கு விருப்பமான சிரம நிலையைத் தேர்ந்தெடுக்கவும்.'}
      </p>
      <p>
        {language === 'English' 
          ? '2. Answer questions to earn points and track your progress.'
          : '2. புள்ளிகள் பெறவும் உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும் கேள்விகளுக்கு பதிலளிக்கவும்.'}
      </p>
      <p>
        {language === 'English' 
          ? '3. Switch between languages using the toggle in the navigation bar.'
          : '3. வழிசெலுத்தல் பட்டியில் உள்ள டோகிளைப் பயன்படுத்தி மொழிகளுக்கு இடையே மாறவும்.'}
      </p>
    </div>
  );
};

export default HelpPage;