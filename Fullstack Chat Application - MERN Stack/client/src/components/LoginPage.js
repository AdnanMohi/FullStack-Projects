// LoginPage.js
import React, { useState } from "react";
import LoginUser from "./login";
import SignUp from "./SignUp";
import "./login.css";

const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  console.log("Rendering LoginPage");
  return (
    <div className="login-container">
      {showSignUp ? (
        <SignUp />
      ) : (
        <div>
          <LoginUser />
          <div className="button-container">
            <button onClick={() => setShowSignUp(true)}>Sign Up</button>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
