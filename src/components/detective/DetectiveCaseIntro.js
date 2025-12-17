import React from "react";

export default function DetectiveCaseIntro({
  caseData,
  language,
  onStart,
  onBack
}) {
  return (
    <div className="detective-container">
      <div className="detective-card intro-card fade-in" style={{ padding: 36 }}>
        <h2 style={{ fontSize: 28 }}>{caseData.title[language]}</h2>
        <p className="lead" style={{ fontSize: 16, marginTop: 8 }}>{caseData.intro[language]}</p>

        <div className="instruction" style={{ marginTop: 18 }}>
          <strong style={{ fontSize: 16 }}>{caseData.instruction[language]}</strong>
          <p style={{ marginTop: 12, color: "#3b5560" }}>
            {language === "English"
              ? "Solve the 3 clue-questions. Each question has a hint. Get ready!"
              : "3 குறிப்புகளை தீர்க்குங்கள். ஒவ்வொரு கேள்வியுக்கும் உதவி குறிப்பும் உள்ளது."}
          </p>
        </div>

        <div className="intro-actions" style={{ marginTop: 22 }}>
          <button className="start-btn" onClick={onStart}>🔍 Start Investigation</button>
          {/* added intro-back-btn class to avoid being overridden by generic .back-btn rules */}
          <button className="back-btn small intro-back-btn" onClick={onBack}>← Back to Cases</button>
        </div>
      </div>
    </div>
  );
}
