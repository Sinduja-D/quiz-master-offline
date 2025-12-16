import React from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import "../CertificatePage.css"; // reuse your existing styles

const PublicCertificatePage = () => {
  const [params] = useSearchParams();

  const name = params.get("name");
  const school = params.get("school");
  const place = params.get("place");
  const date = params.get("date");

  if (!name) {
    return (
      <div style={{ textAlign: "center", padding: 30 }}>
        ❌ Invalid Certificate Link
      </div>
    );
  }

  const downloadCertificate = async () => {
    const cert = document.getElementById("public-certificate");
    if (!cert) return;

    const canvas = await html2canvas(cert, {
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

      <div
        id="public-certificate"
        className="certificate-card realistic"
      >
        <div className="certificate-ribbon">VigyaanXpo</div>

        <div className="certificate-header">
          <h1>CERTIFICATE OF ACHIEVEMENT</h1>
          <p className="subtitle">
            This certificate is proudly presented to
          </p>
        </div>

        <div className="student-name">{name}</div>

        <div className="student-details">
          <p><strong>School:</strong> {school}</p>
          <p><strong>Place:</strong> {place}</p>
          <p><strong>Date:</strong> {date}</p>
        </div>

        <p className="certificate-text">
          for successfully participating in the
          <strong> VigyaanXpo Science Quiz</strong>.
        </p>

        <div className="certificate-footer">
          <div className="signature">
            <p><strong>Dr. K.A. Mohamed Junaid</strong></p>
            <p>Principal</p>
            <span>R.M.K. Engineering College</span>
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

export default PublicCertificatePage;
