import React from "react";
import storiesIndex from "../data/index.json";
import "./StoryMenu.css";

const StoryMenu = ({ language, onStorySelect, completedStories }) => {
  return (
    <div className="story-menu-container">
      
    <h2>
        {language === "English"
          ? "Choose Your Escape Room"
          : "உங்கள் தப்பித்தல் அறையைத் தேர்ந்தெடுக்கவும்"}
      </h2>
      <div className="stories-grid">
        {storiesIndex.map((story) => {
          // Determine completion state: "completed", "partial", or "incomplete"
          const completionState = completedStories[story.id] || "incomplete";

          return (
            <div
              key={story.id}
              className={`story-card ${completionState}`}
              onClick={() => onStorySelect(story)}
            >
              <div className="story-icon">{story.icon}</div>
              <h3>{story.title[language]}</h3>
              <p>{story.description[language]}</p>
              

              {completionState === "completed" && (
                <div className="completed-badge">
                  {language === "English" ? "✓ Completed" : "✓ முடிந்தது"}
                </div>
              )}

              {completionState === "partial" && (
                <div className="partial-badge">
                  {language === "English" ? "⚠ Partial" : "⚠ பகுதி முடிந்தது"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryMenu;
