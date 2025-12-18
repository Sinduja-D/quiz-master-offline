import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import "./CertificatePage.css";

const CertificateCard = ({ user }) => {
  // ✅ Updated QR points to your working Netlify certificate site
  const certificateUrl =
    "https://adorable-zuccutto-1c57cc.netlify.app/?" +
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
      <div id="certificate-download" className="certificate-card realistic">

        <div className="certificate-ribbon">VigyaanXpo</div>

        <div className="certificate-header">
          <h1>CERTIFICATE OF ACHIEVEMENT</h1>
          <p className="subtitle">This certificate is proudly presented to</p>
        </div>

        <div className="student-name">{user.username}</div>

        <div className="student-details">
          <p><strong>School:</strong> {user.schoolName}</p>
          <p><strong>Place:</strong> {user.memberPlace}</p>
          <p><strong>Date:</strong> {user.memberSince}</p>
        </div>

        <p className="certificate-text">
          for successfully participating and demonstrating enthusiasm and
          excellence in science quizzes conducted as part of the
          <strong> VigyaanXpo Science Quiz</strong>.
        </p>

        <div className="achievement-box">
          Achievements Earned: {user.achievements.length}
        </div>

        <div className="certificate-footer">
          <div className="signature">
            <p><strong>Dr. K.A. Mohamed Junaid</strong></p>
            <p>Principal</p>
            <span>R.M.K. Engineering College</span>
          </div>

          <div className="qr-section">
            <p className="qr-text">Scan to view / download</p>
            <QRCodeCanvas value={certificateUrl} size={130} level="L" />
          </div>

          <div className="signature">
            <p><strong>Thiru. R.S. Munirathinam</strong></p>
            <p>Founder & Chairman</p>
            <span>R.M.K Group of Institutions</span>
          </div>
        </div>
      </div>

      <button className="download-btn" onClick={downloadCertificate}>
        📥 Download Certificate
      </button>
    </div>
  );
};

export default CertificateCard;
