const router = require("express").Router();
const {
  sendEmailVerificationCode,
  otpVerifications,
} = require("../../Functions/Mobile/otp_controller");

// DESC: OTP ROUTES
router.post("/send-otp", sendEmailVerificationCode);
router.post("/verify-otp", otpVerifications);

module.exports = router;
