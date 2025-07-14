const connection = require("../../Services/connection");
const { getConnectedUsers } = require("../../socket");

const chatRequest = async (req, res, io) => {
  const { jobId, fromUserId, toUserId } = req.body;
  console.log(jobId, fromUserId, toUserId);
  const connectedUsers = getConnectedUsers();
  console.log(connectedUsers);

  const existingUserIndex = connectedUsers.findIndex(
    (user) => user.userId === toUserId
  );

  const existingFromUserIndex = connectedUsers.findIndex(
    (user) => user.userId === fromUserId
  );

  if (existingUserIndex < 0) {
    return res.status(404).json({ error: "Chat user not found" });
  }
  const targetSocket = connectedUsers[existingUserIndex].socketId;

  const fromUser = connectedUsers[existingFromUserIndex].socketId;

  const query = `
    INSERT INTO parttime_srilanka.notifications (type, from_user_id, to_user_id, job_id, status, is_read, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  const values = [
    "chat_request",
    fromUserId,
    toUserId,
    jobId,
    "pending",
    false,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting notification:", err);
      return res
        .status(500)
        .json({ error: "Database error while creating notification" });
    }

    if (targetSocket) {
      io.to(targetSocket).emit("new_notification", {
        socketId: fromUser,
        type: "chat_request",
        fromUserId,
        jobId,
        message: "New chat request received",
        notificationId: result.insertId.toString(),
      });
    }

    return res
      .status(200)
      .json({ success: true, notificationId: result.insertId });
  });
};

const getChatRequests = (req, res) => {
  const { to_user_id } = req.params;

  const query = `SELECT * FROM parttime_srilanka.notifications WHERE to_user_id = ?;`;
  connection.query(query, [to_user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

const acceptChatRequest = async (req, res, io) => {
  const updateQuery =
    "UPDATE parttime_srilanka.notifications SET status = 'accepted' WHERE id = ?;";

  const { id } = req.params;
  const socketId = req.body;

  const roomId = id;

  console.log(id, socketId.socketId);

  connection.query(updateQuery, [id], (err, data) => {
    if (err) return res.json(err);

    if (socketId) {
      io.to(socketId.socketId).emit("accept_notification", {
        roomId: roomId,
        socketId: socketId,
      });
    }

    return res.json("Status updated successfully");
  });
};

module.exports = { chatRequest, getChatRequests, acceptChatRequest };
