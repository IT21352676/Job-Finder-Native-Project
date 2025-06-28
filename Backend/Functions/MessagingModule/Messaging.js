const { getIO } = require("../../socket");

function messaging(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ roomId, message, sender }) => {
      io.to(roomId).emit("receiveMessage", {
        message,
        sender,
        timestamp: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

function sending(req, res) {
  const { roomId, message, sender } = req.body;
  const io = getIO();

  io.to(roomId).emit("receiveMessage", {
    message,
    sender,
    timestamp: new Date(),
  });

  res.send({ status: "Message emitted via HTTP POST" });
}

module.exports = { messaging, sending };
