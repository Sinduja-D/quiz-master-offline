// src/components/QuizReview.js

import React, { useState, useRef } from "react";
import "./QuizReview.css";

const QuizReview = ({ questions, userAnswers, language, onBack }) => {
  const [showConcepts, setShowConcepts] = useState({});
  const reviewRef = useRef(null);

  const toggleConcept = (index) => {
    setShowConcepts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  /* ---------------- SLIDE NAV LOGIC ---------------- */
  const scrollNext = () => {
    if (!reviewRef.current) return;
    reviewRef.current.scrollBy({
      left: reviewRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    if (!reviewRef.current) return;
    reviewRef.current.scrollBy({
      left: -reviewRef.current.clientWidth,
      behavior: "smooth",
    });
  };
  /* ------------------------------------------------ */

  const t = (language, eng, tam) => (language === "English" ? eng : tam);

  const mapCorrectOption = (correctOption) => {
    const optionMap = {
      "1": "optionA",
      "2": "optionB",
      "3": "optionC",
      "4": "optionD",
    };
    return optionMap[String(correctOption)] || correctOption;
  };

  const getQuestionDisplay = (question) => {
    const isLegacy = !!question.question || !!question.correctAnswer;

    if (isLegacy) {
      return {
        text: question.question,
        options: {
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
        },
        correctKey: question.correctAnswer,
        correctText: question.correctAnswer,
      };
    }

    if (language === "Tamil") {
      return {
        text:
          question.tamilQuestion ||
          question.question ||
          question.englishQuestion,
        options: {
          optionA: question.tamOpt1 || question.opt1,
          optionB: question.tamOpt2 || question.opt2,
          optionC: question.tamOpt3 || question.opt3,
          optionD: question.tamOpt4 || question.opt4,
        },
        correctKey: mapCorrectOption(question.correctOption),
        correctText:
          question[`tamOpt${question.correctOption}`] ||
          question[`opt${question.correctOption}`] ||
          "",
      };
    }

    return {
      text: question.englishQuestion || question.question,
      options: {
        optionA: question.engOpt1 || question.opt1,
        optionB: question.engOpt2 || question.opt2,
        optionC: question.engOpt3 || question.opt3,
        optionD: question.engOpt4 || question.opt4,
      },
      correctKey: mapCorrectOption(question.correctOption),
      correctText:
        question[`engOpt${question.correctOption}`] ||
        question[`opt${question.correctOption}`] ||
        "",
    };
  };

  console.log("QuizReview received questions:", questions);

  if (!questions || !Array.isArray(questions)) {
    return (
      <div className="review-container">
        <div className="review-card">
          <h2>{t(language, "Review Your Answers", "உங்கள் பதில்களை மதிப்பாய்வு செய்யுங்கள்")}</h2>

          <p style={{ textAlign: "center", color: "#dc3545" }}>
            {t(language, "Error: Questions data is not available.", "பிழை: கேள்வி தரவு கிடைக்கவில்லை.")}
          </p>

          <button className="back-btn" onClick={onBack}>
            {t(language, "Back to Results", "முடிவுகளுக்குத் திரும்பு")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container">
      {/* LEFT BUTTON */}
      <button className="slide-nav prev" onClick={scrollPrev}>
        &lt;
      </button>

      {/* RIGHT BUTTON */}
      <button className="slide-nav next" onClick={scrollNext}>
        &gt;
      </button>

      <div className="review-card" ref={reviewRef}>
        <h2>{t(language, "Review Your Answers", "உங்கள் பதில்களை மதிப்பாய்வு செய்யுங்கள்")}</h2>

        {questions.map((question, index) => {
          const userAnswer = userAnswers && userAnswers[index];
          const disp = getQuestionDisplay(question);

          const normalizeUserAnswerKey = () => {
            if (!userAnswer) return null;
            if (typeof userAnswer === "string" && disp.options[userAnswer])
              return userAnswer;
            if (typeof userAnswer === "number")
              return `option${String.fromCharCode(65 + userAnswer)}`;
            if (["1", "2", "3", "4"].includes(userAnswer))
              return mapCorrectOption(userAnswer);
            return null;
          };

          const userKey = normalizeUserAnswerKey();
          const correctKey = disp.correctKey;

          const userDisplay = userKey
            ? disp.options[userKey]
            : t(language, "Not answered", "பதிலளிக்கப்படவில்லை");

          const correctDisplay =
            disp.correctText || disp.options[correctKey];

          const isCorrect = userKey === correctKey;

          return (
            <div
              key={question.id || index}
              className={`question-item ${isCorrect ? "correct" : "wrong"}`}
            >
              <div className="question-text">
                {index + 1}. {disp.text}
              </div>

              <div className="answers">
                <div className="user-answer">
                  <h4>{t(language, "Your Answer:", "உங்கள் பதில்:")}</h4>
                  <p>{userDisplay}</p>
                </div>

                <div className="correct-answer">
                  <h4>{t(language, "Correct Answer:", "சரியான பதில்:")}</h4>
                  <p>{correctDisplay}</p>
                </div>
              </div>

              {question.concept && (
                <div className="concept-review">
                  <button
                    className="toggle-concept-btn"
                    onClick={() => toggleConcept(index)}
                  >
                    {showConcepts[index]
                      ? t(language, "Hide Concept", "கருத்தை மறை")
                      : t(language, "Show Concept", "கருத்தைக் காட்டு")}
                  </button>

                  {showConcepts[index] && (
                    <div className="concept-content">
                      {question.concept}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <button className="back-btn" onClick={onBack}>
          {t(language, "Back to Results", "முடிவுகளுக்குத் திரும்பு")}
        </button>
      </div>
    </div>
  );
};

export default QuizReview;
