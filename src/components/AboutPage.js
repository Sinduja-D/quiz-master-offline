// src/components/AboutPage.jsx
import React from 'react';

const AboutPage = ({ language }) => {
  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'About Us' : 'எங்களைப் பற்றி'}</h2>
      <p>
        {language === 'English' 
          ? '🚀 Quiz Master makes learning fun! We bring science alive through interactive quizzes in Tamil & English, helping every student learn with joy and confidence.'
          : '🚀வினா மாஸ்டர் கற்றலை சுவாரஸ்யமாக்குகிறது! அறிவியலை தமிழ் & ஆங்கிலம் வழியாக விளையாட்டுப் பாணியில் கற்றுத்தருகிறது, ஒவ்வொரு மாணவரும் மகிழ்ச்சியுடன் நம்பிக்கையுடன் கற்க உதவுகிறது.'}
      </p>
    </div>
  );
};

export default AboutPage;