// InputPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'; // Import socket.io-client

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
});

const InputPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleJoinChat = () => {

    // Validate username if needed
    if (username.trim()) {
        socket.emit('username', username)
      navigate(`/chat/${username}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-4 mb-4">
          <h6>Enter your username</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username"
            />
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleJoinChat}
                disabled={!username.trim()}
              >
                Join Chat
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
