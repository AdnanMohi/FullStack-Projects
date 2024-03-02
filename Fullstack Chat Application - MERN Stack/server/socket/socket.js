const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    transports: ["websocket", "polling"]
  });

  const users = {};

  io.on("connection", (client) => {
    try {
      console.log(`User connected: ${client.id}`);
      
      client.on("username", (username) => {
        const user = {
          name: username,
          id: client.id
        };
        users[client.id] = user;
        io.emit("connected", user);
        io.emit("users", Object.values(users));
      });
    
      client.on("send", (message) => {
        const user = users[client.id];
        io.emit("message", {
          text: message,
          date: new Date().toISOString(),
          user: {
            name: user.name,
            id: user.id,
          },
        });
      });

      client.on("disconnect", () => {
        const user = users[client.id];
        if (user) {
          console.log(`${user.name} disconnected`);
          delete users[client.id];
          io.emit("disconnected", client.id);
        }
      });
    } catch (error) {
      console.error('Socket.IO event handling error:', error);
    }
  });

  console.log("Socket.IO server initialized");

  return io;
};

module.exports = initializeSocket;
