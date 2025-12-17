import React from "react";

export default function DetectiveMenu({ cases, language, onSelect, onClose }) {
  return (
    <div className="detective-container menu-page">
      <div className="menu-card">
        {/* moved back button inside header so it doesn't create extra vertical siblings */}
        <header className="menu-header header-with-back">
          <div>
            <h2>🕵️ Detective Case Files</h2>
            <p className="lead">Pick a case to investigate — no scrolling, five files only.</p>
          </div>

          <div>
            <button
              className="menu-back-btn"
              onClick={() => {
                // preferred: use provided handler (parent should pass onClose to navigate to games menu)
                if (typeof onClose === "function") {
                  onClose();
                  return;
                }

                // fallback 1: dispatch a custom event your app can listen for
                window.dispatchEvent(new CustomEvent("detective:close"));

                // fallback 2: try history.back() as a last resort
                try {
                  if (window.history.length > 1) window.history.back();
                } catch (e) {
                  // ignore
                }
              }}
              aria-label="Back"
            >
              ← Back
            </button>
          </div>
        </header>

        <div className="case-grid" role="list">
          {cases.slice(0, 5).map((c) => (
            <div
              key={c.id}
              role="listitem"
              className="case-card fade-in"
              onClick={() => onSelect(c)}
            >
              <div className="case-title">{c.title[language]}</div>
              <div className="case-desc">{c.intro[language]}</div>
              <div className="case-badge">{c.badge[language]}</div>
            </div>
          ))}
        </div>

        <div className="menu-footer">
          <small>Each case has 3 clues. Solve all to reach the conclusion.</small>
        </div>
      </div>
    </div>
  );
}
