const connectedUsers = [];

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("register", (userId, userType) => {
      const checkUserInPool = connectedUsers.findIndex(
        (user) => user.userId === userId && user.userType === userType
      );
      if (checkUserInPool !== -1) {
        connectedUsers[checkUserInPool].socketId = socket.id;
        console.log(`User ID ${userId} socket ID updated to ${socket.id}`);
      } else {
        connectedUsers.push({ userId, userType, socketId: socket.id });
        console.log(`User ID ${userId} registered with socket ID ${socket.id}`);
      }
      console.log("Current connectedUsers list:", connectedUsers);
    });

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room_${roomId}`);
    });

    socket.on("send_message", ({ roomId, message, senderId, userType }) => {
      io.to(roomId).emit("receive_message", {
        message,
        senderSocketId: socket.id,
        senderId,
        userType,
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
