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

const paymentApprove = (req, res, io) => {
  const { jobId, fromUserId, toUserId, amount } = req.body;

  const parsedtoUserId = parseInt(toUserId);

  const connectedUsers = getConnectedUsers();

  const findSeeker = connectedUsers.findIndex(
    (user) => user.userId === parsedtoUserId && user.userType === "Job Seeker"
  );

  const findPoster = connectedUsers.findIndex(
    (user) => user.userId === fromUserId && user.userType === "Job Poster"
  );

  if (findPoster < 0 && findSeeker < 0) {
    console.log("Seeker and Poster not connected or offline");
    return res
      .status(404)
      .json({ error: "Seeker and Poster not connected or offline" });
  } else if (findPoster < 0) {
    console.log("Poster not connected or offline");
    return res.status(404).json({ error: "Poster not connected or offline" });
  } else if (findSeeker < 0) {
    console.log("Seeker not connected or offline");
    return res.status(404).json({ error: "Seeker not connected or offline" });
  }

  const posterSocketId = connectedUsers[findPoster].socketId;

  const seekerSocketId = connectedUsers[findSeeker].socketId;

  const query = `
    INSERT INTO parttime_srilanka.notifications (type, from_user_id, to_user_id, job_id, status, is_read, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  const values = [
    "payment_approve",
    fromUserId,
    toUserId,
    jobId,
    "approved",
    false,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting notification:", err);
      return res
        .status(500)
        .json({ error: "Database error while creating notification" });
    }
  });

  if (seekerSocketId) {
    io.to(seekerSocketId).emit("new_payment_approve", {
      seekerSocketId: seekerSocketId,
      posterSocketId: posterSocketId,
      type: "payment_approve",
      seekerId: fromUserId,
      posterId: toUserId,
      jobId,
      amount,
      message: "Patment approved",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Payment approve notification sent successfully",
  });
};

const applyJob = (req, res, io) => {
  const { jobId, fromUserId, toUserId } = req.body;

  const connectedUsers = getConnectedUsers();

  const findPoster = connectedUsers.findIndex(
    (user) => user.userId === toUserId && user.userType === "Job Poster"
  );

  const findSeeker = connectedUsers.findIndex(
    (user) => user.userId === fromUserId && user.userType === "Job Seeker"
  );

  if (findPoster < 0 && findSeeker < 0) {
    console.log("Seeker and Poster not connected or offline");
    return res
      .status(404)
      .json({ error: "Seeker and Poster not connected or offline" });
  } else if (findPoster < 0) {
    console.log("Poster not connected or offline");
    return res.status(404).json({ error: "Poster not connected or offline" });
  } else if (findSeeker < 0) {
    console.log("Seeker not connected or offline");
    return res.status(404).json({ error: "Seeker not connected or offline" });
  }

  const posterSocketId = connectedUsers[findPoster].socketId;

  const seekerSocketId = connectedUsers[findSeeker].socketId;

  if (posterSocketId) {
    io.to(posterSocketId).emit("new_job_apply", {
      seekerSocketId: seekerSocketId,
      posterSocketId: posterSocketId,
      type: "job_apply",
      seekerId: fromUserId,
      posterId: toUserId,
      jobId,
      message: "Successfully appying for job",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Job apply notification sent successfully",
  });
};

const acceptJob = (req, res, io) => {
  const { jobId, fromUserId, toUserId } = req.body;

  const connectedUsers = getConnectedUsers();

  const findPoster = connectedUsers.findIndex(
    (user) => user.userId === fromUserId && user.userType === "Job Poster"
  );

  const findSeeker = connectedUsers.findIndex(
    (user) => user.userId === toUserId && user.userType === "Job Seeker"
  );

  if (findPoster < 0 && findSeeker < 0) {
    console.log("Seeker and Poster not connected or offline");
    return res
      .status(404)
      .json({ error: "Seeker and Poster not connected or offline" });
  } else if (findPoster < 0) {
    console.log("Poster not connected or offline");
    return res.status(404).json({ error: "Poster not connected or offline" });
  } else if (findSeeker < 0) {
    console.log("Seeker not connected or offline");
    return res.status(404).json({ error: "Seeker not connected or offline" });
  }

  const posterSocketId = connectedUsers[findPoster].socketId;

  const seekerSocketId = connectedUsers[findSeeker].socketId;

  if (seekerSocketId) {
    io.to(seekerSocketId).emit("job_application_accept", {
      seekerSocketId: seekerSocketId,
      posterSocketId: posterSocketId,
      type: "job_application_accepted",
      seekerId: fromUserId,
      posterId: toUserId,
      jobId,
      message: "Successfully accepted the job application",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Job application accepted notification sent successfully",
  });
};

const declineJob = (req, res, io) => {
  const { jobId, fromUserId, toUserId } = req.body;

  const connectedUsers = getConnectedUsers();

  const findPoster = connectedUsers.findIndex(
    (user) => user.userId === fromUserId && user.userType === "Job Poster"
  );

  const findSeeker = connectedUsers.findIndex(
    (user) => user.userId === toUserId && user.userType === "Job Seeker"
  );

  if (findPoster < 0 && findSeeker < 0) {
    console.log("Seeker and Poster not connected or offline");
    return res
      .status(404)
      .json({ error: "Seeker and Poster not connected or offline" });
  } else if (findPoster < 0) {
    console.log("Poster not connected or offline");
    return res.status(404).json({ error: "Poster not connected or offline" });
  } else if (findSeeker < 0) {
    console.log("Seeker not connected or offline");
    return res.status(404).json({ error: "Seeker not connected or offline" });
  }

  const posterSocketId = connectedUsers[findPoster].socketId;

  const seekerSocketId = connectedUsers[findSeeker].socketId;

  if (seekerSocketId) {
    io.to(seekerSocketId).emit("job_application_decline", {
      seekerSocketId: seekerSocketId,
      posterSocketId: posterSocketId,
      type: "job_application_declined",
      seekerId: fromUserId,
      posterId: toUserId,
      jobId,
      message: "Successfully declined the job application",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Job application declined notification sent successfully",
  });
};

module.exports = {
  chatRequest,
  getChatRequests,
  acceptChatRequest,
  paymentApprove,
  applyJob,
  acceptJob,
  declineJob,
};
