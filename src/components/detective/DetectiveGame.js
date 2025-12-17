import React, { useState } from "react";
import DetectiveResult from "./DetectiveResult";
import "./Detective.css";


export default function DetectiveGame({ caseData, onExit }) {
const [index, setIndex] = useState(0);
const [score, setScore] = useState(0);
const [finished, setFinished] = useState(false);


const q = caseData.questions[index];


function handleAnswer(i) {
if (i === q.answer) setScore(score + 10);
if (index + 1 < caseData.questions.length) {
setIndex(index + 1);
} else {
setFinished(true);
}
}


if (finished) {
return <DetectiveResult score={score} caseData={caseData} onExit={onExit} />;
}


return (
<div className="detective-container">
<h3>🕵️ Case File: {caseData.title}</h3>


<div className="story">{caseData.story}</div>


<div className="detective-question">🔍 Clue {index + 1}: {q.q}</div>


<div className="detective-options">
{q.options.map((op, i) => (
<button key={i} onClick={() => handleAnswer(i)}>{op}</button>
))}
</div>


<div className="hint">💡 Hint: {q.hint}</div>
<div className="progress">Progress: {index + 1} / {caseData.questions.length}</div>
</div>
);
}