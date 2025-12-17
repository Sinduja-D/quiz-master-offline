import React from "react";
import "./Detective.css";


export default function DetectiveResult({ score, caseData, onExit }) {
return (
<div className="detective-container">
<h2>✅ Case Solved!</h2>
<p><b>Final Answer:</b> {caseData.finalAnswer}</p>
<p><b>Score:</b> {score}</p>
<button onClick={onExit}>Back to Cases</button>
</div>
);
}