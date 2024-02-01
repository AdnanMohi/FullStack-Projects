import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import InputPage from './components/UserInputField';
import ChatRoomPage from './components/chat-room';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/chat/:username" element={<ChatRoomPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
