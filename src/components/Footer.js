import React from 'react';

const Footer = ({ language }) => (
  <footer>
    <p>{language === 'English' ? '© 2025 Quiz Master App' : '© 2025 வினா மாஸ்டர் பயன்பாடு'}</p>
    <p>{language === 'English' ? 'RMKEC IT DEPARTMENT 2027' : 'RMKEC தொழில்நுட்பத் துறை 2027'}</p>
  </footer>
);

export default Footer;