import React from "react";
import detectiveCases from "../../data/detectiveCases";
import "./Detective.css";


export default function DetectiveMenu({ onSelect }) {
return (
<div className="detective-container">
<h2>🕵️ Science Detective</h2>
{detectiveCases.map(c => (
<div key={c.id} className="detective-card" onClick={() => onSelect(c)}>
<h3>{c.title}</h3>
<p>{c.subject} | {c.level}</p>
</div>
))}
</div>
);
}