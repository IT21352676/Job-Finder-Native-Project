const connection = require("../../Services/connection");
const { getConnectedUsers } = require("../../socket");

const chatRequest = async (req, res, io) => {
  const { jobId, fromUserId, toUserId } = req.body;

  const connectedUsers = getConnectedUsers();

  const findPoster = connectedUsers.findIndex(
    (user) => user.userId === toUserId && user.userType === "Job Poster"
  );

  const findSeeker = connectedUsers.findIndex(
    (user) => user.userId === fromUserId && user.userType === "Job Seeker"
  );
  if (findPoster < 0 && findSeeker < 0) {
    return res
      .status(404)
      .json({ error: "Seeker and Poster not connected or offline" });
  } else if (findPoster < 0) {
    return res.status(404).json({ error: "Poster not connected or offline" });
  } else if (findSeeker < 0) {
    return res.status(404).json({ error: "Seeker not connected or offline" });
  }

  const posterSocketId = connectedUsers[findPoster].socketId;

  const seekerSocketId = connectedUsers[findSeeker].socketId;

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

    if (posterSocketId) {
      io.to(posterSocketId).emit("new_chat_notification", {
        seekerSocketId: seekerSocketId,
        posterSocketId: posterSocketId,
        type: "chat_request",
        seekerId: fromUserId,
        posterId: toUserId,
        jobId,
        message: "New chat request received",
        notificationId: result.insertId,
        roomId: `Room ${result.insertId}`,
      });
    }
    return res.status(200).json({
      success: true,
      notificationId: result.insertId,
      message: "Chat request sent successfully",
    });
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

  const { notification_id } = req.params;
  const response = req.body;

  connection.query(updateQuery, [notification_id], (err, data) => {
    if (err) return res.json(err);

    if (response.seekerSocketId) {
      io.to(response.seekerSocketId).emit("accepted_notification", {
        roomId: response.roomId,
        seekerSocketId: response.seekerSocketId,
        posterSocketId: response.posterSocketId,
      });
    }

    return res.json("Status updated successfully");
  });
};

module.exports = { chatRequest, getChatRequests, acceptChatRequest };
