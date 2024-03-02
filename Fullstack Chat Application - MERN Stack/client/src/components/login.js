import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './login.css';

const LoginUser = () => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState();


 const handleLogin = async (e) => {
  e.preventDefault();

  if (usernameInput.trim() !== '' && passwordInput.trim() !== '') {
    try {
      const response = await fetch('http://localhost:3017/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await response.json();
      console.log('Response:', response);
      console.log('Response data:', data);

      if (response.ok) {
        console.log('Login logged on the server successfully');

        // Store the token in localStorage
        localStorage.setItem('token', data.token);

        // Redirect to a protected route
        // You can replace '/dashboard' with the route you want to redirect to
        navigate('/chat/InputPage');
      } else {
        console.error('Failed to log in on the server');
        setError('Incorrect email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error while making the server request:', error);
      setError('An error occurred. Please try again.');
    }
  } else {
    // Add logging for validation failure
    console.error('Validation failed. Please provide valid email and password.');
    setError('Please provide valid email and password.');
  }
}

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login Page</h1>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <br />
        <button type="submit">Log in</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginUser;
