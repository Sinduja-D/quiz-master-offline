import React from "react";
import CertificateCard from "./CertificateCard";
import "./CertificatePage.css";

const CertificatePage = ({ user, setActivePage }) => {
  if (!user || user.quizHistory.length === 0) return null;

  return (
    <div className="certificate-page">
  
  <button
    className="back-btn"
    onClick={() => setActivePage("profile")}
  >
    ← Back to Profile
  </button>


      <CertificateCard user={user} />
    </div>
  );
};

export default CertificatePage;
