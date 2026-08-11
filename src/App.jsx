import React, { useState } from 'react';
import './App.css';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correct: 1
  },
  {
    id: 5,
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Fe", "Gd"],
    correct: 0
  },
  {
    id: 6,
    question: "Which continent is home to the Amazon Rainforest?",
    options: ["Africa", "Asia", "South America", "North America"],
    correct: 2
  },
  {
    id: 7,
    question: "How many elements are in the periodic table?",
    options: ["108", "112", "118", "120"],
    correct: 2
  },
  {
    id: 8,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: 2
  },
  {
    id: 9,
    question: "Which organ in the human body pumps blood?",
    options: ["Brain", "Lungs", "Heart", "Liver"],
    correct: 2
  },
  {
    id: 10,
    question: "What gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    correct: 2
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const current = QUESTIONS[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === current.correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        question: current.question,
        selected: current.options[index],
        correctAnswer: current.options[current.correct],
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setShowResults(false);
    setUserAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / QUESTIONS.length) * 100;
    if (percentage === 100) return { title: "Perfect Score! 🎉", desc: "You're a genius! Outstanding general knowledge." };
    if (percentage >= 80) return { title: "Great Job! 🌟", desc: "Impressive work! You really know your stuff." };
    if (percentage >= 50) return { title: "Good Attempt! 👍", desc: "Nice effort, but there's room for improvement." };
    return { title: "Keep Practicing! 💪", desc: "Don't give up! Try again to boost your score." };
  };

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>💡 General Knowledge Quiz</h1>
        <p>Test your trivia skills with 10 random questions</p>
      </header>

      {!showResults ? (
        <div className="quiz-card">
          <div className="quiz-meta">
            <span className="question-count">
              Question <strong>{currentQuestion + 1}</strong> of {QUESTIONS.length}
            </span>
            <span className="current-score">Score: {score}</span>
          </div>

          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <h2 className="question-text">{current.question}</h2>

          <div className="options-grid">
            {current.options.map((option, index) => {
              let btnClass = "option-btn";
              if (isAnswered) {
                if (index === current.correct) {
                  btnClass += " correct";
                } else if (index === selectedOption) {
                  btnClass += " incorrect";
                } else {
                  btnClass += " disabled";
                }
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleSelectOption(index)}
                  disabled={isAnswered}
                >
                  <span className="option-prefix">{String.fromCharCode(65 + index)}.</span>
                  <span className="option-label">{option}</span>
                  {isAnswered && index === current.correct && <span className="badge-icon">✓</span>}
                  {isAnswered && index === selectedOption && index !== current.correct && <span className="badge-icon">✗</span>}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="quiz-footer">
              <div className={`feedback-banner ${selectedOption === current.correct ? 'correct-bg' : 'wrong-bg'}`}>
                {selectedOption === current.correct 
                  ? "✨ Correct! Well done." 
                  : `❌ Incorrect! Correct answer was: ${current.options[current.correct]}`
                }
              </div>
              <button className="next-btn" onClick={handleNext}>
                {currentQuestion < QUESTIONS.length - 1 ? "Next Question ➔" : "See Final Results 🏆"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="results-card">
          <div className="trophy-icon">🏆</div>
          <h2>Quiz Completed!</h2>
          <div className="score-badge">
            <span className="big-score">{score}</span> / {QUESTIONS.length}
          </div>
          <p className="score-percentage">{Math.round((score / QUESTIONS.length) * 100)}% Accuracy</p>
          
          <div className="feedback-message">
            <h3>{getScoreMessage().title}</h3>
            <p>{getScoreMessage().desc}</p>
          </div>

          <div className="answers-summary">
            <h3>Question Summary</h3>
            <div className="summary-list">
              {userAnswers.map((ans, i) => (
                <div key={i} className={`summary-item ${ans.isCorrect ? 'item-correct' : 'item-wrong'}`}>
                  <div className="summary-q">
                    <strong>Q{i + 1}:</strong> {ans.question}
                  </div>
                  <div className="summary-a">
                    {ans.isCorrect ? (
                      <span className="ans-correct">✓ {ans.selected}</span>
                    ) : (
                      <span className="ans-wrong">
                        ✗ {ans.selected} <small>(Correct: {ans.correctAnswer})</small>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="restart-btn" onClick={handleRestart}>
            🔄 Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
