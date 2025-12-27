import React, { useState, useRef, useEffect } from "react";
import "./SpinWheel.css";
import spinSound from "../assets/sounds/spin.mp3";
import winSound from "../assets/sounds/win.mp3";


const SpinWheel = ({ language, onSpinComplete, user, updateUser }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spinBase, setSpinBase] = useState(0);
  const [winningIndex, setWinningIndex] = useState(null);
  const [displayPoints, setDisplayPoints] = useState(0);

  const wheelRef = useRef(null);
  const spinAudio = useRef(null);
  const winAudio = useRef(null);

  const rewards = [
    { id: "5", points: 5, label: { english: "5 Points", tamil: "5 புள்ளிகள்" } },
    { id: "10", points: 10, label: { english: "10 Points", tamil: "10 புள்ளிகள்" } },
    { id: "15", points: 15, label: { english: "15 Points", tamil: "15 புள்ளிகள்" } },
    { id: "20", points: 20, label: { english: "20 Points", tamil: "20 புள்ளிகள்" } },
    { id: "25", points: 25, label: { english: "25 Points", tamil: "25 புள்ளிகள்" } },
    { id: "30", points: 30, label: { english: "30 Points", tamil: "30 புள்ளிகள்" } },
    { id: "50", points: 50, label: { english: "50 Points", tamil: "50 புள்ளிகள்" } },
  ];

  /* 🎨 NEW COLOR PALETTE */
  const colors = [
   "#01356d",
    "#016ca5",
    "#0396c7",
    "#04bbdf",
    "#90e0ef",
    "#beedf4",
    "#051460",
  ];

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
  }, []);

  /* 🪙 Animated counter */
  useEffect(() => {
    if (!result) return;
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= result.points) {
        start = result.points;
        clearInterval(interval);
      }
      setDisplayPoints(start);
    }, 30);
    return () => clearInterval(interval);
  }, [result]);

  const spinWheel = () => {
    if (spinning) return;

    spinAudio.current.play();

    setSpinning(true);
    setResult(null);
    setWinningIndex(null);
    setDisplayPoints(0);

    const segmentAngle = 360 / rewards.length;
    const index = Math.floor(Math.random() * rewards.length);
    const stopAngle = 360 - (index * segmentAngle + segmentAngle / 2);

    const spins = spinBase + 5;
    const totalRotation = spins * 360 + stopAngle;

    wheelRef.current.style.transition =
      "transform 4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

    setSpinBase(spins);

    setTimeout(() => {
      const reward = rewards[index];
      setResult(reward);
      setWinningIndex(index);
      setSpinning(false);

      winAudio.current.play();

      if (user && updateUser) {
        const updatedUser = {
          ...user,
          totalPoints: (user.totalPoints || 0) + reward.points,
        };
        updateUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    }, 4000);
  };

  return (
    <div className="spin-wheel-container">

      {/* 🔊 Sounds */}
     <audio ref={spinAudio} src={spinSound} preload="auto" />
<audio ref={winAudio} src={winSound} preload="auto" />

    

      <h3>{language === "English" ? "Spin & Win" : "சுழற்றி வெல்லுங்கள்"}</h3>

      <div className="wheel-wrapper">
        <div className="wheel-pointer" />

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

            const clipPath = `polygon(
              50% 50%,
              ${50 + 50 * Math.cos(startRad)}% ${50 + 50 * Math.sin(startRad)}%,
              ${50 + 50 * Math.cos(endRad)}% ${50 + 50 * Math.sin(endRad)}%
            )`;

            const midAngle = (startAngle + endAngle) / 2;
            const midRad = (midAngle * Math.PI) / 180;
            const textRadius = 34;

            return (
              <div
                key={reward.id}
                className={`wheel-segment ${winningIndex === index ? "winner" : ""}`}
                style={{
                  background: colors[index],
                  clipPath,
                }}
              >
                <div
                  className="segment-content"
                  style={{
                    left: `${50 + textRadius * Math.cos(midRad)}%`,
                    top: `${50 + textRadius * Math.sin(midRad)}%`,
                    transform: `translate(-50%, -50%) rotate(${midAngle + 90}deg)`,
                  }}
                >
                  {language === "English"
                    ? reward.label.english
                    : reward.label.tamil}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!spinning && !result && (
        <button className="spin-btn" onClick={spinWheel}>
          {language === "English" ? "SPIN" : "சுழற்று"}
        </button>
      )}

      {spinning && <p className="status">Spinning...</p>}

      {result && (
        <div className="result-box">
          <p>You won</p>
          <strong>+{displayPoints} Points</strong>
          <button className="spin-btn" onClick={() => onSpinComplete(result)}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
