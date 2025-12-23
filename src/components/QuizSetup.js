// src/components/QuizSetup.js
import React, { useEffect, useMemo, useState } from "react";
import "./QuizSetup.css";

const t = (language, eng, tam) => (language === "English" ? eng : tam);
// Local metadata so this component works standalone
const LEVELS_META = {
  beginner: {
    id: "beginner",
    icon: "🐣",
    color: "#22c55e",
    name: { English: "Beginner", Tamil: "தொடக்கநிலை" },
    gradeText: { English: "Grades 6–7", Tamil: "6–7 ஆம் வகுப்பு" },
    grades: [6, 7],
  },
  intermediate: {
    id: "intermediate",
    icon: "👨🏻‍💻",
    color: "#f59e0b",
    name: { English: "Intermediate", Tamil: "இடைநிலை" },
    gradeText: { English: "Grades 8–10", Tamil: "8–10 ஆம் வகுப்பு" },
    grades: [8, 9, 10],
  },
  // NOTE: DB uses "advance" (not "advanced")
  advance: {
    id: "advance",
    icon: "🧑🏼‍🎓",
    color: "#3b82f6",
    name: { English: "Advance", Tamil: "உயர்நிலை" },
    gradeText: { English: "Grades 11–12", Tamil: "11–12 ஆம் வகுப்பு" },
    grades: [11, 12],
  },
};

const SUBJECTS = {
  Physics: {
    name: { English: "Physics", Tamil: "இயற்பியல்" },
    icon: "🧲",
    levels: ["beginner", "intermediate", "advance"],
  },
  Chemistry: {
    name: { English: "Chemistry", Tamil: "வேதியியல்" },
    icon: "🧪",
    levels: ["beginner", "intermediate", "advance"],
  },
  Biology: {
    name: { English: "Biology", Tamil: "உயிரியல்" },
    icon: "🧬",
    levels: ["beginner", "intermediate"],
  },
  Botany: {
    name: { English: "Botany", Tamil: "தாவரவியல்" },
    icon: "🌿",
    levels: ["advance"],
  },
  Zoology: {
    name: { English: "Zoology", Tamil: "விலங்கியல்" },
    icon: "🦋",
    levels: ["advance"],
  },
};

export default function QuizSetup({
  language = "English",
  level, // optional: full level object (with .id, .icon, .color, etc.)
  startQuiz, // function(numberOfQuestions, subject, grade, difficulty)
  onBack, // function()
}) {
  // resolve difficulty from props or sessionStorage
  const [difficultyId, setDifficultyId] = useState(
    level?.id || sessionStorage.getItem("selectedDifficulty") || ""
  );
  // derived meta for the current difficulty
  const meta = useMemo(
    () => (difficultyId ? LEVELS_META[difficultyId] : null),
    [difficultyId]
  );
  // local UI state
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isStarting, setIsStarting] = useState(false);
  
  // When level prop changes, sync difficultyId
  useEffect(() => {
    if (level?.id && level.id !== difficultyId) {
      setDifficultyId(level.id);
    }
  }, [level, difficultyId]);
  
  // If difficulty changes, reset subject/grade
  useEffect(() => {
    setSelectedGrade("");
    setSelectedSubject("");
  }, [difficultyId]);
  
  // Available subjects for the chosen difficulty
  const availableSubjects = useMemo(() => {
    if (!difficultyId) return [];
    return Object.keys(SUBJECTS).filter((s) =>
      SUBJECTS[s].levels.includes(difficultyId)
    );
  }, [difficultyId]);
  
  const handleStart = async () => {
    if (!difficultyId) {
      alert(
        t(
          language,
          "Please choose a difficulty on the previous page.",
          "முந்தைய பக்கத்தில் இருந்து சிரம நிலையைத் தேர்ந்தெடுக்கவும்."
        )
      );
      return;
    }
    if (!selectedGrade || !selectedSubject) {
      alert(
        t(
          language,
          "Please select both grade and subject!",
          "தயவுசெய்து வகுப்பு மற்றும் பாடம் இரண்டையும் தேர்ந்தெடுக்கவும்!"
        )
      );
      return;
    }
    setIsStarting(true);
    try {
      // Call parent's startQuiz handler
      await startQuiz(
        numberOfQuestions,
        selectedSubject, // subject (must match DB names exactly)
        selectedGrade, // grade (number/string okay)
        difficultyId // difficulty: beginner | intermediate | advance
      );
    } catch (e) {
      console.error("Failed to start quiz:", e);
      alert(
        t(
          language,
          "Failed to start quiz. Please try again.",
          "வினாவைத் தொடங்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
        )
      );
    } finally {
      setIsStarting(false);
    }
  };
  
  // If difficulty is missing, gently guide user back
  if (!difficultyId || !meta) {
    return (
      <div className="quiz-setup-container">
        <div className="quiz-setup-card">
          {/* Header with back button on top */}
          <div className="setup-header">
            <div className="header-top">
            </div>
            <h2>{t(language, "Quiz Setup", "வினா அமைப்பு")}</h2>
          </div>
          
          <div className="error-message">
            {t(
              language,
              "No difficulty selected. Please go back and choose a level.",
              "சிரம நிலை தேர்ந்தெடுக்கப்படவில்லை. தயவுசெய்து திரும்பி ஒரு நிலையைத் தேர்ந்தெடுக்கவும்."
            )}
          </div>
          
          <div className="start-button-container">
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="quiz-setup-container">
      <div className="quiz-setup-card">
        {/* Header with back button on top */}
        <div className="setup-header">
          <h2>{t(language, "Quiz Setup", "வினா அமைப்பு")}</h2>
        </div>
        
        {/* Content */}
        <div className="setup-content">
          {/* Difficulty Info */}
          <div className="setup-info">
            <div className="info-item">
              <span className="info-label">
                {t(language, "Difficulty Level:", "சிரம நிலை:")}
              </span>
              <div
                className="difficulty-badge"
                style={{ backgroundColor: meta.color }}
              >
                <span className="level-icon">{meta.icon}</span>
                <span className="level-name">
                  {t(language, meta.name.English, meta.name.Tamil)}
                </span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-label">
                {t(language, "Grades:", "வகுப்புகள்:")}
              </span>
              <span>
                {t(language, meta.gradeText.English, meta.gradeText.Tamil)}
              </span>
            </div>
          </div>
          
          {/* Subject Selector */}
          <div className="subject-selector">
            <label>
              {t(language, "Select Subject:", "பாடத்தைத் தேர்ந்தெடுக்கவும்:")}
            </label>
            <div className="subject-options">
              {availableSubjects.map((subj) => (
                <button
                  key={subj}
                  className={`subject-option ${
                    selectedSubject === subj ? "active" : ""
                  }`}
                  onClick={() => setSelectedSubject(subj)}
                  type="button"
                >
                  <span className="subject-icon">{SUBJECTS[subj].icon}</span>
                  <span className="subject-name">
                    {t(
                      language,
                      SUBJECTS[subj].name.English,
                      SUBJECTS[subj].name.Tamil
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Grade Selector */}
          <div className="grade-selector">
            <label htmlFor="grade-select">
              {t(language, "Select Grade:", "வகுப்பைத் தேர்ந்தெடுக்கவும்:")}
            </label>
            <select
              id="grade-select"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="grade-select"
            >
              <option value="">
                {t(language, "-- Select Grade --", "-- வகுப்பைத் தேர்ந்தெடுக்கவும் --")}
              </option>
              {meta.grades.map((g) => (
                <option key={g} value={g}>
                  {t(language, `Grade ${g}`, `${g}ஆம் வகுப்பு`)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Number of Questions */}
          <div className="question-selector">
            <label htmlFor="question-range">
              {t(language, "Number of Questions:", "கேள்விகளின் எண்ணிக்கை:")}
            </label>
            <input
              id="question-range"
              type="range"
              min="1"
              max="30"
              step="1"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value, 10))}
              className="question-slider"
            />
            <div className="question-count-display">{numberOfQuestions}</div>
          </div>
          
          {/* Start Button */}
          <div className="start-button-container">
            <button
              className="start-quiz-button"
              onClick={handleStart}
              disabled={!selectedGrade || !selectedSubject || isStarting}
              type="button"
            >
              {isStarting
                ? t(language, "Starting...", "தொடங்குகிறது...")
                : t(language, "Start Quiz", "வினாத்திட்டத்தைத் தொடங்கு")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}