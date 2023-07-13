import React, { useState } from "react";
import "../App.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username !== "") {
      onLogin(username);
    }
  };

  return (
    <div className="login">
      <img src={require("../images/login.png")} alt="" />
      <div className="login-input">
        <h2>Login</h2>
        <p>Enter your username to start the quiz.</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
