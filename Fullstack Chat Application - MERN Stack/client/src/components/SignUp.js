import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import './login.css';



const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if signupSuccess is true before triggering navigation
    if (signupSuccess) {
      console.log("Navigating to /LoginPage");
      navigate('/LoginPage');
    }
  }, [signupSuccess, navigate]);
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Send user data to the server
      const response = await fetch('http://localhost:3017/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName,lastName, email, password }), // Use the actual state values
      });

      const data = await response.json();
      console.log('Response data:', data);

 // Handle successful registration (e.g., redirect to login page)
 if (response.ok) {
  if (data && data.data && data.data._id) {
    setSignupSuccessMessage('Signup success');
    console.log('Signup success');
    
    // Redirect to the sign-in page
    setError('You have successfully signed up. Click here to login.');
    setSignupSuccess(true);
  } else {
    console.error('Unexpected response format - Missing _id property:', data);
    setError('Unexpected response format or missing _id property');
  }
} else {
  // Handle registration error
  console.error('Registration failed:', data.error);
  setError('Registration failed: ' + (data.error || 'Unknown error'));
}
} catch (error) {
setError('An error occurred during registration');
}
};
const handleLoginOptionClick = () => {
  // Navigate to the login page
  console.log('login button clicked')
  navigate('/LoginPage');
};

  return (
    <div>
      <h2>Sign Up</h2>
      {signupSuccessMessage && <p style={{ color: 'green' }}>{signupSuccessMessage}</p>}
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={handleLoginOptionClick}>Login</button>
        </div>
      )}

      <form onSubmit={handleSignUp}>
      <label>First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br/>
        <label>Last Name:
          <input type="emtextail" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br/>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
