import React, { useState } from "react";
import DetectiveMenu from "./DetectiveMenu";
import DetectiveCaseIntro from "./DetectiveCaseIntro";
import DetectiveGame from "./DetectiveGame";
import DetectiveResult from "./DetectiveResult";
import cases from "./detectiveCases";
import "./Detective.css";
import "./DetectiveGame.css";
import "./DetectiveResult.css";

export default function DetectivePage({ language = "English", onClose }) {
  const [stage, setStage] = useState("menu"); // menu, intro, game, result
  const [currentCase, setCurrentCase] = useState(null);

  function openCase(c) {
    setCurrentCase(c);
    setStage("intro");
  }

  return (
    <>
      {stage === "menu" && (
        <DetectiveMenu
          cases={cases}
          language={language}
          onSelect={openCase}
          onClose={onClose} /* forward onClose so menu Back works */
        />
      )}

      {stage === "intro" && currentCase && (
        <DetectiveCaseIntro
          caseData={currentCase}
          language={language}
          onStart={() => setStage("game")}
          onBack={() => setStage("menu")}
        />
      )}

      {stage === "game" && currentCase && (
        <DetectiveGame
          caseData={currentCase}
          language={language}
          onFinish={() => setStage("result")}
          onCancel={() => setStage("menu")}
        />
      )}

      {stage === "result" && currentCase && (
        <DetectiveResult
          caseData={currentCase}
          language={language}
          onBack={() => setStage("menu")}
        />
      )}
    </>
  );
}
