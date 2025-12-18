// src/components/EscapeRoom.js
import React, { useState, useEffect } from "react";
import "./EscapeRoom.css";

/* ---------- STORIES ---------- */
import lab from "../data/lab.json";
import space from "../data/space.json";
import jungle from "../data/jungle.json";
import ocean from "../data/ocean.json";
import desert from "../data/desert.json";
import forest from "../data/forest.json";
import pyramid from "../data/pyramid.json";
import castle from "../data/castle.json";
import arctic from "../data/arctic.json";
import volcano from "../data/volcano.json";
import cyber from "../data/cyber.json";
import haunted from "../data/haunted.json";
import underwater from "../data/underwater.json";
import sky from "../data/sky.json";
import time from "../data/time.json";

/* ---------- SOUNDS ---------- */
import correctSound from "../assets/sounds/correct.mp3";
import wrongSound from "../assets/sounds/wrong.mp3";

const storyMap = {
  lab, space, jungle, ocean, desert, forest,
  pyramid, castle, arctic, volcano, cyber, haunted,
  underwater, sky, time,
};

const EscapeRoom = ({ language, storyId, onBack, onComplete, setActivePage }) => {
  const story = storyMap[storyId];

  const [currentSceneId, setCurrentSceneId] = useState(story.startScene);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gaveWrong, setGaveWrong] = useState(false);

  const currentScene = story.scenes[currentSceneId];

  useEffect(() => {
    setCurrentSceneId(story.startScene);
    setSelectedOption(null);
    setIsCorrect(null);
    setGaveWrong(false);
  }, [storyId, story.startScene]);

  useEffect(() => {
    if (!currentScene) return;

    if (currentScene.type === "intro" || currentScene.type === "transition") {
      const t = setTimeout(
        () => setCurrentSceneId(currentScene.next),
        currentScene.duration || 2500
      );
      return () => clearTimeout(t);
    }
  }, [currentScene]);

  useEffect(() => {
    if (currentScene?.type === "ending") {
      const t = setTimeout(() => {
        let status = "partial";
        if (currentSceneId === "good" && !gaveWrong) status = "completed";
        onComplete(storyId, status);
        onBack();
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [currentScene]);

  const totalRiddles = Object.values(story.scenes).filter(
    s => s.type === "riddle"
  ).length;

  const solvedIndex = Object.keys(story.scenes).indexOf(currentSceneId);

  const progress =
    currentScene?.type === "ending"
      ? 100
      : Math.min((solvedIndex / totalRiddles) * 100, 100);

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.volume = 0.5;
    audio.play();
  };

  const handleAnswer = (option) => {
    setSelectedOption(option.English);
    const correct = option.English === currentScene.answer;
    setIsCorrect(correct);

    if (correct) {
      playSound(correctSound);
    } else {
      setGaveWrong(true);
      playSound(wrongSound);
    }

    setTimeout(() => {
      setCurrentSceneId(option.next);
      setSelectedOption(null);
      setIsCorrect(null);
    }, 600);
  };

  const handleExit = () => {
    let status = "partial";
    if (currentSceneId === "good" && !gaveWrong) status = "completed";
    onComplete(storyId, status);
    onBack();
  };

  const renderScene = () => {
    if (!currentScene) return null;

    if (currentScene.type === "intro" || currentScene.type === "transition") {
      return (
        <div className="scene-text">
          {currentScene.text[language]}
        </div>
      );
    }

    if (currentScene.type === "riddle") {
      return (
        <div className="riddle-container">
          <div className="riddle-question">
            {currentScene.question[language]}
          </div>

          <div className="options-container">
            {currentScene.options.map((opt, idx) => (
              <button
                key={idx}
                className={`option-button ${
                  selectedOption === opt.English
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                disabled={selectedOption !== null}
                onClick={() => handleAnswer(opt)}
              >
                {opt[language]}
              </button>
            ))}
          </div>

          {selectedOption && (
            <div className={`feedback ${isCorrect ? "ok" : "no"}`}>
              {isCorrect
                ? language === "English" ? "✔ Correct!" : "✔ சரி!"
                : language === "English" ? "✖ Wrong!" : "✖ தவறு!"}
            </div>
          )}
        </div>
      );
    }

    if (currentScene.type === "ending") {
      return (
        <div className="scene-container ending">
          <h1>{currentScene.text[language]}</h1>
          <div className="gift">{currentScene.gift}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`escape-room ${storyId}`}>
      
      {/* Fixed back button */}
      <button
        className="back-btn-games-fixed"
        onClick={() => setActivePage && setActivePage("games")}
      >
        <span className="back-icon">←</span>
        <span className="back-text">
          {language === "English" ? "Games" : "விளையாட்டுகள்"}
        </span>
      </button>

      <button className="back-btn-top-left" onClick={handleExit}>
        {language === "English" ? "← Exit Story" : "← கதை வெளியேறு"}
      </button>

      <div className="progress-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="scene-wrapper">
        {renderScene()}
      </div>
    </div>
  );
};

export default EscapeRoom;
