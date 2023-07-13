import React, { useState } from 'react';
import Login from './layout/login';
import Quiz from './layout/quiz'; 
import Result from './layout/result';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const totalQuestions = 5; 

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleRestart = () => {
    setLoggedIn(false);
    setUsername('');
    setShowResult(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
  };

  return (
    <div className='container'>
      {!loggedIn && <Login onLogin={handleLogin} />}
      {loggedIn && !showResult && (
        <Quiz
          username={username}
          setShowResult={setShowResult}
          setCorrectAnswers={setCorrectAnswers}
          setWrongAnswers={setWrongAnswers}
          totalQuestions={totalQuestions}
        />
      )}
      {loggedIn && showResult && (
        <Result
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          totalQuestions={totalQuestions}
        />
      )}
      {loggedIn && showResult && (
        <button className='restart' onClick={handleRestart}>Restart Quiz</button>
      )}
    </div>
  );
};

export default App;
