const router = require("express").Router();
const {
  addPersonalInfo,
} = require("../../Functions/JobSeeker/JobSeekerProfile");

router.get("/job-seeker-addInfo", ...addPersonalInfo);

module.exports = router;
