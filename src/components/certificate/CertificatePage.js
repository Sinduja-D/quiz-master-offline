import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import "./CertificatePage.css";

// Logos import
import appLogo from "../../assets/app-logo2.png";
import rmkLogo from "../../assets/rmk.gif";
import tnLogo from "../../assets/tamil-nadu-logo.png";

// Minimal SVG icons for professional look
const SchoolIcon = () => (
  <svg width="16" height="16" fill="#1e40af" viewBox="0 0 24 24">
    <path d="M12 2L1 9l11 7 11-7-11-7zm0 9v11h-4v-7H8v-4l4-2 4 2v4h-.5v7h-4V11z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" fill="#1e40af" viewBox="0 0 24 24">
    <path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" fill="#1e40af" viewBox="0 0 24 24">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" fill="#fbbf24" viewBox="0 0 24 24">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.87 1.434 8.3L12 18.896l-7.37 4.68 1.434-8.3-6.064-5.87 8.332-1.151z"/>
  </svg>
);

const CertificateCard = ({ user }) => {
  const certificateUrl =
    "https://vigyaanxpo-certificate.netlify.app/?" +
    `name=${encodeURIComponent(user.username)}` +
    `&school=${encodeURIComponent(user.schoolName || "")}` +
    `&place=${encodeURIComponent(user.memberPlace || "")}` +
    `&date=${encodeURIComponent(user.memberSince || "")}` +
    `&points=${encodeURIComponent(user.achievements.length)}`;

  const downloadCertificate = async () => {
    const certificate = document.getElementById("certificate-download");
    if (!certificate) return;

    const canvas = await html2canvas(certificate, {
      scale: 2,
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "VigyaanXpo_Certificate.png";
    link.click();
  };

  return (
    <div className="certificate-container">
      <div id="certificate-download" className="certificate-card professional">

        {/* LOGO ROW */}
        <div className="certificate-logos">
          <img src={tnLogo} alt="Tamil Nadu Logo" className="logo-left" />
         {/* <img src={appLogo} alt="App Logo" className="logo-center" /> */}
          <img src={rmkLogo} alt="RMK Logo" className="logo-right" />
        </div>

        {/* HEADER */}
        <div className="certificate-header">
          <h1>CERTIFICATE OF ACHIEVEMENT</h1>
          <p className="subtitle">
            This certificate is proudly presented to
          </p>
        </div>

        {/* STUDENT NAME */}
        <div className="student-name">{user.username}</div>

        {/* DETAILS */}
        <div className="student-details">
          <p><SchoolIcon /> {user.schoolName}</p>
          <p><LocationIcon /> {user.memberPlace}</p>
          <p><CalendarIcon /> {user.memberSince}</p>
        </div>

        {/* CERTIFICATE BODY */}
        <p className="certificate-text">
          for successfully participating and demonstrating excellence in
          science quizzes conducted as part of the
          <strong> VigyaanXpo Science Quiz Programme</strong>.
        </p>

        {/* ACHIEVEMENTS */}
        <div className="achievement-box">
          <StarIcon /> Achievements Earned: {user.achievements.length}
        </div>

        {/* FOOTER */}
        <div className="certificate-footer">
          <div className="signature">
            <p><strong>Dr. K.A. Mohamed Junaid</strong></p>
            <p>Principal</p>
            <span>R.M.K. Engineering College</span>
          </div>

          <div className="qr-section">
            <QRCodeCanvas value={certificateUrl} size={100} />
            <p className="qr-text">Verify Certificate</p>
          </div>

          <div className="signature">
            <p><strong>Thiru. R.S. Munirathinam</strong></p>
            <p>Founder & Chairman</p>
            <span>R.M.K Group of Institutions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
