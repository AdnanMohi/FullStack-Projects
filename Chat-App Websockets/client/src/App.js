import { Routes, Route } from "react-router-dom"
import './App.css';
import { ChatRoom } from "./components/chat-room";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ChatRoom/>} />
       
      </Routes>
    </div>
    
  );
}

export default App;
