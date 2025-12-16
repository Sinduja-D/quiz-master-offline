// src/components/QuizReview.js

import React, { useState } from 'react';
import './QuizReview.css';

const QuizReview = ({ questions, userAnswers, language, onBack }) => {
  const [showConcepts, setShowConcepts] = useState({});

  const toggleConcept = (index) => {
    setShowConcepts(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const t = (language, eng, tam) => (language === "English" ? eng : tam);

  const mapCorrectOption = (correctOption) => {
    const optionMap = {
      '1': 'optionA',
      '2': 'optionB',
      '3': 'optionC',
      '4': 'optionD'
    };
    return optionMap[String(correctOption)] || correctOption;
  };

  const getQuestionDisplay = (question) => {
    // Support both shapes: { question, correctAnswer } and the Quiz shape with
    // englishQuestion/engOpt1/... and correctOption (1-4)
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

    // New shape (from Quiz): choose language fields
    if (language === 'Tamil') {
      return {
        text: question.tamilQuestion || question.question || question.englishQuestion,
        options: {
          optionA: question.tamOpt1 || question.opt1,
          optionB: question.tamOpt2 || question.opt2,
          optionC: question.tamOpt3 || question.opt3,
          optionD: question.tamOpt4 || question.opt4,
        },
        correctKey: mapCorrectOption(question.correctOption),
        correctText: (question[`tamOpt${question.correctOption}`] || question[`opt${question.correctOption}`] || ''),
      };
    }

    // English
    return {
      text: question.englishQuestion || question.question,
      options: {
        optionA: question.engOpt1 || question.opt1,
        optionB: question.engOpt2 || question.opt2,
        optionC: question.engOpt3 || question.opt3,
        optionD: question.engOpt4 || question.opt4,
      },
      correctKey: mapCorrectOption(question.correctOption),
      correctText: (question[`engOpt${question.correctOption}`] || question[`opt${question.correctOption}`] || ''),
    };
  };

  // --- மிக முக்கியமான பிரிவு ---
  // உலாவி கன்சோலில் (F12) 'questions' என்ன வருகிறது என்று பார்க்க
  console.log("QuizReview component received 'questions':", questions);

  // 'questions' ஒரு வரிசையா (array) இல்லையென்றால், பிழைச் செய்தியைக் காட்டு
  if (!questions || !Array.isArray(questions)) {
    return (
      <div className="review-container">
        <div className="review-card">
          <h2>{t(language, "Review Your Answers", "உங்கள் பதில்களை மதிப்பாய்வு செய்யுங்கள்")}</h2>
          <p style={{ textAlign: 'center', color: '#dc3545' }}>
            {t(language, "Error: Questions data is not available.", "பிழை: கேள்வி தரவு கிடைக்கவில்லை.")}
          </p>
          <p style={{ textAlign: 'center', color: '#555', fontSize: '0.9rem' }}>
            {t(language, "Please check the browser console (F12) for more details.", "மேலும் விவரங்களுக்கு உலாவி கன்சோலைப் (F12) பார்க்கவும்.")}
          </p>
          <button className="back-btn" onClick={onBack}>
            {t(language, "Back to Results", "முடிவுகளுக்குத் திரும்பு")}
          </button>
        </div>
      </div>
    );
  }

  // 'questions' சரியாக இருந்தால் மட்டுமே இந்தப் பகுதி இயங்கும்
  return (
    <div className="review-container">
      <div className="review-card">
        <h2>{t(language, "Review Your Answers", "உங்கள் பதில்களை மதிப்பாய்வு செய்யுங்கள்")}</h2>
        
        {questions.map((question, index) => {
          const userAnswer = userAnswers && userAnswers[index];
          const disp = getQuestionDisplay(question);

          // Determine a normalized key for user's answer (optionA..optionD) when possible
          const normalizeUserAnswerKey = () => {
            if (!userAnswer) return null;
            // If userAnswer is already an option key like 'optionB'
            if (typeof userAnswer === 'string' && disp.options[userAnswer]) return userAnswer;
            // If userAnswer is a numeric index (0/1/2/3)
            if (typeof userAnswer === 'number') return `option${String.fromCharCode(65 + userAnswer)}`;
            // If userAnswer is '1'..'4' (string) map using mapCorrectOption
            if (typeof userAnswer === 'string' && ['1','2','3','4'].includes(userAnswer)) return mapCorrectOption(userAnswer);
            return null;
          };

          const userKey = normalizeUserAnswerKey();
          const correctKey = disp.correctKey;

          // Build display texts
          const userDisplay = (() => {
            if (!userAnswer) return t(language, 'Not answered', 'பதிலளிக்கப்படவில்லை');
            if (userKey && disp.options[userKey]) return disp.options[userKey];
            return userAnswer;
          })();

          const correctDisplay = disp.correctText || (correctKey && disp.options[correctKey]) || '';

          const isCorrect = userKey ? userKey === correctKey : String(userDisplay).trim() === String(correctDisplay).trim();

          return (
            <div key={question.id || index} className={`question-item ${isCorrect ? 'correct' : 'wrong'}`}>
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
                      : t(language, "Show Concept", "கருத்தைக் காட்டு")
                    }
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