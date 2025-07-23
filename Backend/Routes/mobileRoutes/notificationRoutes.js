const {
  chatRequest,
  getChatRequests,
  acceptChatRequest,
  applyJob,
  acceptJob,
  declineJob,
  paymentApprove,
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

  router.post("/notification/payment-approve", (req, res) => {
    paymentApprove(req, res, io);
  });

  router.post("/notification/apply-job", (req, res) => {
    applyJob(req, res, io);
  });
  router.post("/notification/accept-job", (req, res) => {
    acceptJob(req, res, io);
  });
  router.post("/notification/decline-job", (req, res) => {
    declineJob(req, res, io);
  });

  return router;
};
