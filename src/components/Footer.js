// src/components/Footer.js
import React from "react";

const Footer = ({ language }) => (
  <footer style={styles.footer}>
    {language === "English"
      ? "Designed & Developed by R.M.K. Engineering College | IT Department 2027"
      : "ஆர்.எம்.கே. பொறியியல் கல்லூரியால் வடிவமைத்து உருவாக்கப்பட்டது | தொழில்நுட்பத் துறை 2027"}
  </footer>
);

const styles = {
  footer: {
    background: "#f8faff",
    borderTop: "4px solid transparent",
    borderImage: "linear-gradient(to right, #4f8cff, #9ec9ff) 1", // matches navbar
    boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.05)",
    padding: "12px 25px",
    textAlign: "center",
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#1a2a6c",
    borderRadius: "12px 12px 0 0",
    fontFamily: "'Noto Sans', 'Noto Sans Tamil', Arial, sans-serif",
    whiteSpace: "nowrap",         // keeps everything on one line
  },
};

export default Footer;
