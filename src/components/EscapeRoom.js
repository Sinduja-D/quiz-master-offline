// src/components/EscapeRoom.jsx
import React, { useState, useEffect } from 'react';
import './EscapeRoom.css';
// Import stories separately
import lab from '../data/lab.json';
import space from '../data/space.json';
import jungle from '../data/jungle.json';

// Story mapping
const storyMap = { lab, space, jungle };

// Background colors for each story (fallbacks)
const backgroundColors = {
  lab: {
    intro: '#2c3e50',
    transition1: '#34495e',
    ending: '#3498db'
  },
  space: {
    intro: '#0f0c29',
    transition1: '#24243e',
    ending: '#0f3460'
  },
  jungle: {
    intro: '#1a5f3f',
    transition1: '#2d8659',
    ending: '#27ae60'
  }
};

// Image paths - using placeholder images for now
const imagePaths = {
  lab: {
    intro: "/assets/images/lab_intro.jpg",
    transition1: "/assets/images/lab_transition.jpg",
    ending: "/assets/images/lab_ending.jpg"
  },
  space: {
    intro: "/assets/images/space_intro.jpg",
    transition1: "/assets/images/space_transition.jpg",
    ending: "/assets/images/space_ending.jpg"
  },
  jungle: {
    intro: "/assets/images/jungle_intro.jpg",
    transition1: "/assets/images/jungle_transition.jpg",
    ending: "/assets/images/jungle_ending.jpg"
  }
};

const EscapeRoom = ({ language, storyId, onBack, onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [imageError, setImageError] = useState({});
  
  // Load the correct story
  const story = storyMap[storyId];
  const scenes = story ? story.scenes : [];
  const currentSceneData = scenes[currentScene];
  
  // Handle image loading errors
  const handleImageError = (sceneId) => {
    setImageError(prev => ({
      ...prev,
      [sceneId]: true
    }));
  };
  
  // Handle scene transitions for intro/transition
  useEffect(() => {
    if (currentSceneData && 
       (currentSceneData.type === "intro" || currentSceneData.type === "transition")) {
      const timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
      }, currentSceneData.duration || 4000);
      return () => clearTimeout(timer);
    }
  }, [currentSceneData]);
  
  // Handle riddle answers
  const handleAnswer = (option) => {
    setSelectedOption(option);
    const isAnswerCorrect = option === currentSceneData.answer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setTimeout(() => {
        setCurrentScene(prev => prev + 1);
        setIsCorrect(null);
        setSelectedOption(null);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedOption(null);
      }, 1500);
    }
  };
  
  // Handle story completion
  useEffect(() => {
    if (currentScene === scenes.length - 1 && currentSceneData?.type === "ending") {
      const timer = setTimeout(() => {
        onComplete(storyId);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentScene, scenes.length, onComplete, storyId, currentSceneData]);
  
  // Render current scene
  const renderScene = () => {
    if (!currentSceneData) return null;
    
    // 🎬 Intro / Transition scenes
    if (currentSceneData.type === "intro" || currentSceneData.type === "transition") {
      const backgroundColor = backgroundColors[storyId]?.[currentSceneData.id] || '#333';
      const imageUrl = imagePaths[storyId]?.[currentSceneData.id];
      const hasError = imageError[currentSceneData.id];
      
      return (
        <div className="scene-container">
          <div 
            className="scene-image-container"
            style={{ 
              backgroundImage: hasError ? 'none' : `url(${imageUrl})`,
              backgroundColor
            }}
          >
            {hasError && (
              <div className="image-error-message">
                {language === "English" ? "Image not available" : "படம் இல்லை"}
              </div>
            )}
            
            <div className="scene-text">
              {currentSceneData.text[language]}
            </div>
          </div>
        </div>
      );
    }
    
    // ❓ Riddle scene
    if (currentSceneData.type === "riddle") {
      return (
        <div className="riddle-container">
          <h2 className="riddle-question">
            {currentSceneData.question[language]}
          </h2>
          
          <div className="options-container">
            {currentSceneData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.English)}
                className={`option-button ${
                  selectedOption === option.English 
                    ? (isCorrect ? 'correct' : 'incorrect') 
                    : ''
                }`}
                disabled={selectedOption !== null}
              >
                {option[language]}
              </button>
            ))}
          </div>
          
          {selectedOption && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              <div 
                className="feedback-image"
                style={{ backgroundColor: isCorrect ? '#4CAF50' : '#F44336' }}
              >
                {isCorrect ? '✓' : '✗'}
              </div>
              <p>
                {isCorrect 
                  ? (language === "English" ? "Correct!" : "சரியான பதில்!")
                  : (language === "English" ? "Try Again!" : "மீண்டும் முயற்சிக்கவும்!")}
              </p>
            </div>
          )}
        </div>
      );
    }
    
    // 🏆 Ending scene
    if (currentSceneData.type === "ending") {
      const backgroundColor = backgroundColors[storyId]?.[currentSceneData.id] || '#333';
      const imageUrl = imagePaths[storyId]?.[currentSceneData.id];
      const hasError = imageError[currentSceneData.id];
      
      return (
        <div className="scene-container">
          <div 
            className="ending-image-container"
            style={{ 
              backgroundImage: hasError ? 'none' : `url(${imageUrl})`,
              backgroundColor
            }}
          >
            {hasError && (
              <div className="image-error-message">
                {language === "English" ? "Image not available" : "படம் இல்லை"}
              </div>
            )}
            
            <h1 className="ending-title">
              {currentSceneData.text[language]}
            </h1>
            <p className="fun-fact">
              {currentSceneData.funFact[language]}
            </p>
            <button
              onClick={() => onComplete(storyId)}
              className="complete-button"
            >
              {language === "English" ? "Complete" : "முடிக்க"}
            </button>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="escape-room">
      <button onClick={onBack} className="back-button">
        {language === "English" ? "Back" : "திரும்ப"}
      </button>
      
      <div className="scene-container">
        {renderScene()}
      </div>
    </div>
  );
};

export default EscapeRoom;