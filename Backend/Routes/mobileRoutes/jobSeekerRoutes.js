const router = require("express").Router();
const {
  addSkills,
  addTimeAvailability,
  addReview,
  uploadProfilePicture,
  retrieveProfilePicture,
  updatePersonalInfo,
} = require("../../Functions/JobSeeker/JobSeekerProfile");

router.put("/job-seeker/upload-profile-picture", uploadProfilePicture);
router.get("/job-seeker/retrieve-profile-picture", retrieveProfilePicture);
router.put("/job-seeker/edit-personal-info", updatePersonalInfo);
router.put("/job-seeker/add-skills", ...addSkills);
router.put("/job-seeker/add-time-availability", ...addTimeAvailability);
router.post("/job-seeker/add-review", ...addReview);

module.exports = router;
