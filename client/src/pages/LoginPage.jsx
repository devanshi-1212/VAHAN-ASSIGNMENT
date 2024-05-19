import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const navigate = Navigate();

  const handleSubmit = () => {
    console.log(username);
    console.log(email);
    console.log(password);
  };

  return (
    <div>
      <h1>Register</h1>

      <h4>Username (this will be your database name)</h4>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <h4>Email</h4>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <h4>Password</h4>
      <input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button onClick={() => handleSubmit()}>Register</button>
    </div>
  );
};

export default LoginPage;
