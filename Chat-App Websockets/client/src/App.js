import { Routes, Route } from "react-router-dom"
import './App.css';
import InputPage from "./components/UserInputField";
import ChatRoomPage  from "./components/chat-room";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/chat/:username" element={<ChatRoomPage/>} />
      <Route path="/" element={<InputPage/>} />
        
      </Routes>
    </div>
    
  );
}

export default App;
