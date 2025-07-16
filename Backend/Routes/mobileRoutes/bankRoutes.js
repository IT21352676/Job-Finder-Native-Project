const router = require("express").Router();
const {
  createBankAcc,
  withdrawal,
} = require("../../Functions/Mobile/bank_controller");
const { verifyToken } = require("../../middleware/verify_user");
// DESC: CREATE BANK
router.post("/bank/create/:seeker_id", verifyToken, createBankAcc);

// DESC: WITHDRAW
router.post("/withdraw/:wallet_id", verifyToken, withdrawal);

module.exports = router;
