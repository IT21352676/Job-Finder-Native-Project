const connectedUsers = [];

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      const existingUserIndex = connectedUsers.findIndex(
        (user) => user.userId === userId
      );

      if (existingUserIndex !== -1) {
        connectedUsers[existingUserIndex].socketId = socket.id;
        console.log(`User ID ${userId} socket ID updated to ${socket.id}`);
      } else {
        connectedUsers.push({ userId, socketId: socket.id });
        console.log(`User ID ${userId} registered with socket ID ${socket.id}`);
      }

      console.log("Current connectedUsers list:", connectedUsers);
    });

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room_${roomId}`);
    });

    socket.on("send_message", ({ roomId, message, sender }) => {
      console.log("Receive", message, roomId, socket.id);
      io.to(roomId).emit("receive_message", {
        message,
        sender: socket.id,
        timestamp: new Date(),
      });
    });

    socket.on("disconnect", () => {
      const index = connectedUsers.findIndex(
        (user) => user.socketId === socket.id
      );
      if (index !== -1) {
        console.log(`Removing user ${connectedUsers[index].userId}`);
        connectedUsers.splice(index, 1);
      }
    });
  });
};

const getConnectedUsers = () => connectedUsers;

module.exports = {
  setupSocket,
  getConnectedUsers,
};
