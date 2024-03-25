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
    
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={ <SignInScreen />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </AuthProvider>
     
  );
}

export default App;
