import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from 'react-router-dom';


const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"]
});

const ChatRoomPage = () => {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('username', username);
    });
  
    const handleConnect = () => {
      socket.emit('username', username);
    };
  
    socket.once('connect', handleConnect);
  
    socket.on('users', (receivedUsers) => {
      const uniqueUsers = Array.from(new Set(receivedUsers.map(user => user.id)))
        .map(id => receivedUsers.find(user => user.id === id));
  
      setUsers(uniqueUsers);
    });
  
    socket.on('message', (receivedMessage) => {
      console.log('Received Message:', receivedMessage);
      setMessages((prevMessages) => {
        const newMessage = {
          user: {
            id: receivedMessage.user && receivedMessage.user.id ? receivedMessage.user.id : null,
            name: receivedMessage.user && receivedMessage.user.name ? receivedMessage.user.name : 'Unknown Sender',
          },
          date: receivedMessage.date,
          text: receivedMessage.text
        };
    
        console.log('New Message:', newMessage);
    
        return [...prevMessages, newMessage];
      });
    });
    
    
    
    
  
    socket.on('disconnected', (disconnectedUserId) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== disconnectedUserId));
    });
   
  
    socket.on('disconnected', (disconnectedUserId) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== disconnectedUserId));
    });
  
    return () => {
      socket.off('users');
      socket.off('message');
      socket.off('connected');
      socket.off('disconnected');
      socket.off('connect', handleConnect);
    };
  }, [username, socket]);
  
  const handleSubmitMessage = (event) => {
    event.preventDefault();
    socket.emit('send', message);
    setMessage('');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-4 mb-4">
          <h6>Hello {username}</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h6>Messages</h6>
          <div id="messages" className="message-container">
            {messages.map(({ user, date, text }, index) => (
              <div key={index} className="message-row">
                <div style={{ flex: '1', fontWeight: 'bold' }}>{username}</div>
                <div style={{ flex: '2', marginRight: '10px' }}>{text}</div>
                <div style={{ flex: '3', textAlign: 'right' }}>{moment(date).format('h:mm:ss a')}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmitMessage} id="form">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}
                id="text"
              />
              <span className="input-group-btn">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-primary"
                  disabled={!message.trim()}
                >
                  Send
                </button>
              </span>
            </div>
          </form>
        </div>
        <div className="col-md-4">
        <h6>Users</h6>
        <ul id="users">
        {users &&
    Array.isArray(users) &&
    users.map((user) => {
      // Check if the user object is defined and has the 'name' property
      if (user && user.name) {
        return <li key={user.id}>{user.name}</li>;
      } else {
        // Log the problematic user object to the console for debugging
        console.error('Invalid user object:', user);
        return null;
    }
})}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;