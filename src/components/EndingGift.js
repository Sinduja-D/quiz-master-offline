// src/components/EndingGift.jsx
export default function EndingGift({ gift, language }) {
  return (
    <div className="gift-box">
      <h2>
        {language === "English" ? "You Earned" : "நீங்கள் பெற்றது"}
      </h2>
      <div className="gift-item">{gift}</div>
    </div>
  );
}
