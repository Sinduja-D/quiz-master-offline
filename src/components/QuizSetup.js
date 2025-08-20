/* src/components/QuizSetup.css */
.quiz-setup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex: 1;
}

.quiz-setup-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.quiz-setup-card h2 {
  color: #1a2a6c;
  margin-bottom: 25px;
  text-align: center;
  font-size: 2rem;
}

.setup-info {
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.info-label {
  font-weight: bold;
  color: #555;
}

.info-value {
  color: #1a2a6c;
  font-weight: 500;
}

.question-selector {
  margin-bottom: 30px;
}

.question-selector label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #555;
}

.question-slider {
  width: 100%;
  margin-bottom: 10px;
}

.question-count-display {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a2a6c;
}

.start-quiz-button {
  background: linear-gradient(135deg, #1a2a6c, #2a3a7c);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
}

.start-quiz-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(26, 42, 108, 0.3);
}
