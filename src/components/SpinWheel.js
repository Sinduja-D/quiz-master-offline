import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import "./SpinWheel.css";

const SpinWheel = ({ language = "English", onSpinComplete }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [spinBase, setSpinBase] = useState(0);
  const wheelRef = useRef(null);

  // Rewards in the exact CLOCKWISE order from the pointer (top)
  const rewards = [
    { id: "5_points", points: 5, label: { english: "5 Points", tamil: "5 புள்ளிகள்" } },
    { id: "10_points", points: 10, label: { english: "10 Points", tamil: "10 புள்ளிகள்" } },
    { id: "15_points", points: 15, label: { english: "15 Points", tamil: "15 புள்ளிகள்" } },
    { id: "20_points", points: 20, label: { english: "20 Points", tamil: "20 புள்ளிகள்" } },
    { id: "25_points", points: 25, label: { english: "25 Points", tamil: "25 புள்ளிகள்" } },
    { id: "30_points", points: 30, label: { english: "30 Points", tamil: "30 புள்ளிகள்" } },
    { id: "50_points", points: 50, label: { english: "50 Points", tamil: "50 புள்ளிகள்" } },
  ];

  // Colors in the same order
  const rainbowColors = [
    "#01356d", // 5
    "#016ca5", // 10
    "#0396c7", // 15
    "#04bbdf", // 20
    "#90e0ef", // 25
    "#beedf4", // 30
    "#051460", // 50
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset wheel at mount
  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
  }, []);

  const t = (eng, tam) => (language === "English" ? eng : tam);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);
    setShowConfetti(false);

    const segmentAngle = 360 / rewards.length; // 51.43° for 7 segments
    const randomRewardIndex = Math.floor(Math.random() * rewards.length);

    // Each segment center is offset by index * segmentAngle
    const targetAngle = randomRewardIndex * segmentAngle + segmentAngle / 2;

    // We want that center to align with the pointer at top (0°)
    const stopAngle = 360 - targetAngle;

    const extraSpins = 5;
    const newBase = spinBase + extraSpins;
    const totalRotation = newBase * 360 + stopAngle;

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
    }
    setSpinBase(newBase);

    setTimeout(() => {
      setResult(rewards[randomRewardIndex]);
      setSpinning(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 4000);
  };

  return (
    <div className="spin-wheel-container">
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={400}
        />
      )}

      <h3>{t("Spin the Wheel!", "சக்கரத்தை சுழற்றுங்கள்!")}</h3>

      <div className="wheel-wrapper">
        <div className="wheel-pointer"></div>
        <div
          ref={wheelRef}
          className="spin-wheel"
          onClick={!spinning && !result ? spinWheel : undefined}
        >
          {rewards.map((reward, index) => {
            const segmentAngle = 360 / rewards.length;
            const startAngle = index * segmentAngle - 90;
            const endAngle = startAngle + segmentAngle;

            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const points = [
              "50% 50%",
              `${50 + 50 * Math.cos(startRad)}% ${50 + 50 * Math.sin(startRad)}%`,
              `${50 + 50 * Math.cos(endRad)}% ${50 + 50 * Math.sin(endRad)}%`,
            ].join(", ");

            const midAngle = (startAngle + endAngle) / 2;
            const midRad = (midAngle * Math.PI) / 180;
            const textRadius = 35;
            const textX = 50 + textRadius * Math.cos(midRad);
            const textY = 50 + textRadius * Math.sin(midRad);

            return (
              <div
                key={reward.id}
                className="wheel-segment"
                style={{
                  backgroundColor: rainbowColors[index],
                  clipPath: `polygon(${points})`,
                }}
              >
                <div
                  className="segment-content"
                  style={{
                    left: `${textX}%`,
                    top: `${textY}%`,
                    transform: `translate(-50%, -50%) rotate(${midAngle + 90}deg)`,
                  }}
                >
                  <span className="segment-text">
                    {language === "English" ? reward.label.english : reward.label.tamil}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!spinning && !result && (
        <button className="spin-button" onClick={spinWheel}>
          {t("SPIN", "சுழற்று")}
        </button>
      )}

      {result && (
        <div className="spin-result">
          <h4>{t("You have received:", "நீங்கள் பெற்றுள்ளீர்கள்:")}</h4>
          <p className="reward-text">
            {language === "English" ? result.label.english : result.label.tamil}
          </p>
          <button className="continue-button" onClick={() => onSpinComplete?.(result)}>
            {t("Continue", "தொடரவும்")}
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
