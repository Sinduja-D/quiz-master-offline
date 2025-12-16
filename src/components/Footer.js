import React from "react";
import "./Footer.css";

const Footer = ({ language }) => {
  return (
    <footer className="footer">
      {language === "English"
        ? "Designed & Compiled by R.M.K. Engineering College | Department of Information Technology | © Copyrights 2025"
        : "ஆர்.எம்.கே. பொறியியல் கல்லூரியால் வடிவமைத்து உருவாக்கப்பட்டது | தகவல் தொழில்நுட்பத் துறை | © பதிப்புரிமை 2025"}
    </footer>
  );
};

export default Footer;
