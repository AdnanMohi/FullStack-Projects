import React, { useCallback, useState } from "react";
import { Input, Button, message } from "antd";
import "./styles.css";
import { useSignInUser } from "../../hooks/mutation/user";
import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router";

const SignInScreen = () => {
  const { signIn, signOut, isAuthenticated } = useAuth();
  const { mutateAsync: signInUserAsync } = useSignInUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const {data} = await signInUserAsync({ email, password });
      
      // Direct navigation to the dashboard route
      navigate('/dashboard');
    } catch (error) {
      setError("Incorrect email or password.");
      message.error("Incorrect email or password.");
    }
  }, [email, password, signIn, signInUserAsync, navigate]);
   
  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };


  return (
    <div className="signin_container">
     
      {isAuthenticated ? ( // Render sign-out button if authenticated
        <Button onClick={handleSignOut}>Sign Out</Button>
      ) : (
        <form>
          <h2>Sign In</h2>
          <label htmlFor="email">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}

          />
          <label htmlFor="password">Password</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
          />
          <Button
            disabled={!password || !email}
            type="primary"
            onClick={handleFormSubmit}
          >
            Sign In
          </Button>
        </form>
      )}
    </div>
  );
};

export default SignInScreen;
