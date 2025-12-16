// src/components/TransitionOverlay.jsx
import "./EscapeRoom.css";

export default function TransitionOverlay({ show }) {
  return <div className={`fade-overlay ${show ? "show" : ""}`} />;
}
