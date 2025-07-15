const {
  chatRequest,
  getChatRequests,
  acceptChatRequest,
} = require("../../Functions/Notifications/Notifications");

const express = require("express");

module.exports = (io) => {
  const router = express.Router();

  router.post("/notification/chat-request", (req, res) => {
    chatRequest(req, res, io);
  });

  router.get("/notification/chat-request/:to_user_id", getChatRequests);

  router.post("/notification/:notification_id/accept", (req, res) => {
    acceptChatRequest(req, res, io);
  });

  return router;
};
