const router = require("express").Router();
const {
  addSkills,
  addTimeAvailability,
  addReview,
} = require("../../Functions/JobSeeker/JobSeekerProfile");

router.put("/job-seeker/add-skills", ...addSkills);
router.put("/job-seeker/add-time-availability", ...addTimeAvailability);
router.post("/job-seeker/add-review", ...addReview);

module.exports = router;
