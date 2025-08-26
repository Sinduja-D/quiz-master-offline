// src/components/ContactPage.jsx
import React from 'react';

const ContactPage = ({ language }) => {
  return (
    <div className="page-content">
      <h2>{language === 'English' ? 'Contact Us' : 'எங்களை தொடர்பு கொள்ள'}</h2>
      <p>
        {language === 'English' 
          ? 'Email: science@quizmaster.com'
          : 'மின்னஞ்சல்: science@quizmaster.com'}
      </p>
      <p>
        {language === 'English' 
          ? 'Phone: 91+ 7823047037'
          : 'தொலைபேசி:  91+ 7823047037'}
      </p>
      <p>
        {language === 'English' 
          ? 'Address:R.M.K. ENGINEERING COLLEGE'
          : 'முகவரி: ஆர்.எம்.கே. பொறியியல் கல்லூரி'}
      </p>
    </div>
  );
};

export default ContactPage;