const router = require("express").Router();
const {
  displayAmount,
  displayApplicationsCount,
  displayJobsCount,
} = require("../../Functions/Mobile/dashboard_controller");

router.get("/dashboard/amount/:seeker_id", displayAmount);
router.get("/dashboard/applications/:poster_id", displayApplicationsCount);
router.get("/dashboard/jobs/:poster_id", displayJobsCount);
module.exports = router;
