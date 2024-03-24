import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignInScreen from './Pages/SignIn';
import Dashboard from './Pages/Dashboard/Dashboard';
import {  AuthProvider} from './Auth/AuthProvider';
import { Navigate } from 'react-router';

function App() {
  return (
    <AuthProvider>
    <Routes>
      {/* Set /signin as the default route */}
      <Route path="/" element={<Navigate to="/signin" />} />
      {/* Route for signing in */}
      <Route path="/signin" element={<SignInScreen />} />
      {/* Protected route for the dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </AuthProvider>
     
  );
}

export default App;
