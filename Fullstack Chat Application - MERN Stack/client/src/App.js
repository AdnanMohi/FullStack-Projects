import React from "react";
import LoginPage from "./components/LoginPage";
import { Routes,Route } from "react-router-dom"; 
import InputPage from "./chat/UserInputField";
import ChatRoomPage  from "./chat/chat-room";

function App() {
  return (
    
    <Routes>
    <Route path="/" element={<LoginPage />} />
     <Route path="/LoginPage" element={<LoginPage />} />
     <Route path="/chat/InputPage" element={<InputPage />} />
     <Route path="/chat/ChatRoomPage/:username" element={<ChatRoomPage />} />
  
    </Routes>
   
  );
}

export default App;
