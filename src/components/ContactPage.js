import React from 'react';

const ContactPage = ({ language }) => {
  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'Contact Us' : 'எங்களைத் தொடர்பு கொள்ள'}</h2>
      <p>
        {language === 'English' 
          ? 'Have questions or feedback? We would love to hear from you!'
          : 'கேள்விகள் அல்லது கருத்துகள் உள்ளதா? உங்களைப் பற்றி கேட்க நாங்கள் விரும்புகிறோம்!'}
      </p>
      <p>
        {language === 'English' 
          ? 'Email: contact@quizmaster.com'
          : 'மின்னஞ்சல்: contact@quizmaster.com'}
      </p>
      <p>
        {language === 'English' 
          ? 'Phone: +1 (123) 456-7890'
          : 'தொலைபேசி: +1 (123) 456-7890'}
      </p>
    </div>
  );
};

export default ContactPage;