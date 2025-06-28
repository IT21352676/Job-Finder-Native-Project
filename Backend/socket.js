const { Server } = require("socket.io");
let io = null;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
}

module.exports = { initSocket, getIO };
