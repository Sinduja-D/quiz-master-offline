import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import "./CertificatePage.css";

const CertificateCard = ({ user }) => {

  // ✅ Public certificate URL (must be deployed)
  const certificateUrl = `https://694115ea4a2f12036dc406e4--soft-taiyaki-37c5d5.netlify.app/certificate/${user.id}`;

  // ✅ Download certificate as image (WORKS ON MOBILE)
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
    link.download = "VigyaanExpo_Certificate.png";
    link.click();
  };

  return (
    <div className="certificate-container">

      {/* CERTIFICATE (Captured for download) */}
      <div
        id="certificate-download"
        className="certificate-card realistic"
      >

        {/* Top Ribbon */}
        <div className="certificate-ribbon">
          VIGYAAN EXPO
        </div>

        {/* Header */}
        <div className="certificate-header">
          <h1>CERTIFICATE OF ACHIEVEMENT</h1>
          <p className="subtitle">
            This certificate is proudly presented to
          </p>
        </div>

        {/* Student Name */}
        <div className="student-name">
          {user.username}
        </div>

        {/* Student Details */}
        <div className="student-details">
          <p><strong>School:</strong> {user.schoolName}</p>
          <p><strong>Place:</strong> {user.memberPlace}</p>
        </div>

        {/* Main Text */}
        <p className="certificate-text">
          for successfully participating and demonstrating enthusiasm and
          excellence in science quizzes conducted as part of the
          <strong> VigyaanExpo Science Quiz</strong>.
        </p>

        {/* Achievements */}
        <div className="achievement-box">
          Achievements Earned: {user.achievements.length}
        </div>

        {/* Footer */}
        <div className="certificate-footer">

          {/* Principal */}
          <div className="signature">
            <div className="signature-text">
              Dr. K.A. Mohamed Junaid
            </div>
            <div className="line"></div>
            <p>Principal</p>
            <span>R.M.K. Engineering College</span>
          </div>

          {/* QR */}
          <div className="qr-section">
            <p className="qr-text">
              Scan to view / download
            </p>
            <QRCodeCanvas
              value={certificateUrl}
              size={130}
              level="H"
            />
          </div>

          {/* Chairman */}
          <div className="signature">
            <div className="signature-text">
              Thiru. R.S. Munirathinam
            </div>
            <div className="line"></div>
            <p>Founder & Chairman</p>
            <span>R.M.K. Engineering College</span>
          </div>

        </div>
      </div>

      {/* DOWNLOAD BUTTON (MANDATORY FOR MOBILE) */}
      <button
        className="download-btn"
        onClick={downloadCertificate}
      >
        📥 Download Certificate
      </button>

    </div>
  );
};

export default CertificateCard;
