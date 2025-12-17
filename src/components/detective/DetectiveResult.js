import React, { useEffect } from "react";
import "./DetectiveResult.css";
import { playResult } from "./detectiveSounds";

export default function DetectiveResult({
  caseData,
  language,
  onBack
}) {
  useEffect(() => {
    playResult();
  }, []);

  return (
    <div className="result-fixed">

      {/* soft confetti */}
      <div className="confetti burst1" />
      <div className="confetti burst2" />

      <div className="result-card animated">

        <h2>
          🎉 {language === "English"
            ? "Case Solved!"
            : "வழக்கு தீர்க்கப்பட்டது!"}
        </h2>

        <p className="case-title">
          {caseData.title[language]}
        </p>

        <div className="badge">
          <div className="badge-icon">🏅</div>
          <div className="badge-text">
            {caseData.badge[language]}
          </div>
        </div>

        <div className="conclusion-box">
          <h3>
            {language === "English"
              ? "Conclusion"
              : "தீர்மானம்"}
          </h3>

          <p className="conclusion-text">
            {caseData.conclusion[language]}
          </p>
        </div>

        <p className="learning-note">
          {language === "English"
            ? "Nice work — you examined the clues and uncovered the science behind the case."
            : "நன்றாகச் செய்தீர்கள் — நீங்கள் குறிப்புகளை ஆய்வு செய்து வழக்கின் அறிவியலை கண்டறிந்தீர்கள்."}
        </p>

        {/* BACK TO CASE LIST */}
        <button className="back-btn" onClick={onBack}>
          ← {language === "English"
            ? "Back to Case Files"
            : "வழக்கு பட்டியலுக்கு திரும்பு"}
        </button>

      </div>
    </div>
  );
}
