import React from 'react';

const Footer = ({ language }) => (
  <footer>
    <p>{language === 'English' ? '© 2025 Quiz Master App' : '© 2025 வினா மாஸ்டர் பயன்பாடு'}</p>
  </footer>
);

export default Footer;