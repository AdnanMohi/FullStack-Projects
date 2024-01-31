import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import React from "react";
import  ReactDOM  from "react-dom";
import { useEffect, useState } from "react";
import moment from "moment";

const username = prompt("what is your username");

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"]
});

export const ChatRoom = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", username);
    });

    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });

    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });

    return () => {
      // Clean up socket event listeners
      socket.off("users");
      socket.off("message");
      socket.off("connected");
      socket.off("disconnected");
    };
  }, []);

  const submit = event => {
    event.preventDefault();
    socket.emit("send", message);
    setMessage("");
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
        <div style={{ flex: '1', fontWeight: 'bold' }}>{user.name}</div>
      <div style={{ flex: '2', marginRight: '10px' }}>{text}</div>
      <div style={{flex: '3', textAlign: 'right' }}>{moment(date).format("h:mm:ss a")}</div>
    </div>
        ))}
</div>

      <form onSubmit={submit} id="form">
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
        {users.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

ReactDOM.render(<ChatRoom />, document.getElementById("root"));