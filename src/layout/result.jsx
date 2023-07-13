import React from "react";

const Result = ({ totalQuestions, correctAnswers }) => {
  const score = (correctAnswers / totalQuestions) * 100;

  return (
    <div className="result">
      <h1>Quiz Result</h1>
      <div className="result-quiz">
        <img src={require("../images/result.png")} alt="" />
        <p>Correct Answers: {correctAnswers}</p>
        <h2>Score: {score}</h2>
      </div>
    </div>
  );
};

export default Result;
