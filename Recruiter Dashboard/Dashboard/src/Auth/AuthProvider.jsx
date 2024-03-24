// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context; // Return the authentication context
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => {
    // Perform sign-in logic -- navigate to Dashboard
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const signOut = () => {
    // Perform sign-out logic
    setIsAuthenticated(false);
    // Redirect to the sign-in page after sign-out
    window.location.href = '/signin';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
