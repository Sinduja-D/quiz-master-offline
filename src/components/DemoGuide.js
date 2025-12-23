import React, { useEffect, useState, useRef } from "react";
import "./DemoGuide.css";
import stepsData from "../data/demoSteps.json";

export default function DemoGuide({ language = "English", onCloseProp, user }) {
  const [steps] = useState(stepsData);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const overlayRef = useRef();

  useEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function updateRect() {
    const sel = steps[index]?.selector;
    if (!sel) {
      setRect(null);
      return;
    }
    // try to find element; if not found keep rect null so tooltip floats
    const el = document.querySelector(sel);
    if (!el) {
      setRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    setRect({
      top: r.top + window.scrollY,
      left: r.left + window.scrollX,
      width: r.width,
      height: r.height,
    });
  }

  function next() {
    if (index < steps.length - 1) setIndex(index + 1);
    else finish();
  }

  function skip() {
    finish();
  }

  function finish() {
    try {
      // store per-user flag; fallback to generic key if no user
      const key = user?.username ? `demoSeen_${user.username}` : "demoSeen";
      localStorage.setItem(key, "1");
    } catch (e) {
      // ignore
    }
    if (onCloseProp) onCloseProp();
  }

  const step = steps[index];
  if (!step) return null;

  const text = step.text[language] || step.text["English"];

  return (
    <div className="demo-overlay" ref={overlayRef} role="dialog" aria-modal="true">
      <div className="demo-backdrop" onClick={skip} />
      {rect && (
        <div
          className="demo-highlight"
          style={{
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
          }}
        />
      )}

      <div
        className="demo-tooltip"
        style={{
          top: rect ? rect.top + rect.height + 16 : "20vh",
          left: rect ? Math.min(rect.left, window.innerWidth - 360) : "50%",
          transform: rect ? "none" : "translateX(-50%)",
        }}
      >
        <div className="demo-step-title">{step.title?.[language] || step.title?.English || `Step ${index + 1}`}</div>
        <div className="demo-step-text">{text}</div>
        <div className="demo-controls">
          <button className="demo-skip" onClick={skip}>{language === "Tamil" ? "தவிர்க்க" : "Skip"}</button>
          <button className="demo-next" onClick={next}>
            {index < steps.length - 1 ? (language === "Tamil" ? "அடுத்து" : "Next") : (language === "Tamil" ? "முடி" : "Finish")}
          </button>
        </div>
      </div>
    </div>
  );
}