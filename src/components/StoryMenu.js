// src/components/StoryMenu.js (corrected)
import React from "react";
import storiesIndex from "../data/index.json";
import "./StoryMenu.css";

// Only import motion if framer-motion is available
let motion;
try {
  const framerMotion = require("framer-motion");
  motion = framerMotion.motion;
} catch (error) {
  console.warn("Framer Motion not found. Animations disabled.");
}

const StoryMenu = ({ language, onStorySelect, completedStories }) => {
  return (
    <div className="story-menu-container">
      <h2>
        {language === "English" ? "Choose Your Escape Room" : "உங்கள் தப்பித்தல் அறையைத் தேர்ந்தெடுக்கவும்"}
      </h2>
      
      <div className="stories-grid">
        {storiesIndex.map((story) => {
          const Card = motion ? motion.div : 'div';
          return (
            <Card
              key={story.id}
              className={`story-card ${completedStories.includes(story.id) ? 'completed' : ''}`}
              {...(motion ? {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 }
              } : {})}
              onClick={() => onStorySelect(story)}
            >
              <div className="story-icon">{story.icon}</div>
              <h3>{story.title[language]}</h3>
              <p>{story.description[language]}</p>
              <div className="story-difficulty">
                {language === "English" ? "Difficulty: " : "சிரமம்: "}
                {story.difficulty[language]}
              </div>
              {completedStories.includes(story.id) && (
                <div className="completed-badge">
                  {language === "English" ? "✓ Completed" : "✓ முடிந்தது"}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StoryMenu;