const router = require("express").Router();
const {
  createBankAcc,
  withdrawal,
  payment,
  getBankDetails,
} = require("../../Functions/Mobile/bank_controller");
const { verifyToken } = require("../../middleware/verify_user");
// DESC: CREATE BANK
router.post("/bank/create", verifyToken, createBankAcc);

// DESC: WITHDRAW
router.post("/withdraw/:wallet_id", verifyToken, withdrawal);

//DESC: PAYMENT DONE
router.post("/payment", verifyToken, payment);

router.get("/bank/details/:seeker_id", verifyToken, getBankDetails);

module.exports = router;
