import React, { useEffect, useState } from "react";

const Quiz = ({
  setShowResult,
  setCorrectAnswers,
  setWrongAnswers,
  totalQuestions,
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900);

  useEffect(() => {
    const fetchQuestions = async () => {
      const BASE_URL = "https://opentdb.com/api.php";
      const amount = 5;
      const difficulty = "easy";
      const type = "multiple";

      try {
        const response = await fetch(
          `${BASE_URL}?amount=${amount}&difficulty=${difficulty}&type=${type}`
        );
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    if (timeRemaining === 0) {
      setIsQuizOver(true);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining]);

  // Time
  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  };

  // Option
  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    const currentQuestionObj = questions[currentQuestion];

    if (option === currentQuestionObj.correct_answer) {
      setScore(score + 1);
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    } else {
      setWrongAnswers((prevWrongAnswers) => prevWrongAnswers + 1);
    }

    setSelectedAnswer(option);

    setTimeout(() => {
      setSelectedOption("");
      setSelectedAnswer(null);
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);

      if (currentQuestion === questions.length - 1) {
        setIsQuizOver(true);
      }
    }, 1000);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    if (!question) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="quiz">
        <div className="question">
          <h3>{question.question}</h3>
          <div>{question.incorrect_answers.map((option, index) => (
              <div key={index}>
                <button
                  className={`option ${
                    selectedAnswer === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== ""}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (isQuizOver) {
    setShowResult(true);
    return null;
  }
  return (
    <div>
      <h2>Quiz</h2>
      <div className="quiz-info">
        <p>Question {currentQuestion + 1} of {totalQuestions}</p>
        <div className="quiz-time">
          <img src={require("../images/clock.png")} alt="" />
          {convertTime(timeRemaining)}
        </div>
      </div>
      {renderQuestion()}
    </div>
  );
};

export default Quiz;
