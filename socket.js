const { Server } = require("socket.io");

let io; // Declare the io variable

// Initialize the Socket.IO server
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected User:", socket.id);

    // Example event listener
    socket.on("newPost", (post) => {
      console.log("New post received:", post);
      io.emit("newPost", post);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

// Export the initializer and the io instance
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initSocket, getIO };
