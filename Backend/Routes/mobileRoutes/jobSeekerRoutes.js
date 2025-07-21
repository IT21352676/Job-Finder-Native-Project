const router = require("express").Router();
const {
  addSkills,
  addTimeAvailability,
  addReview,
  uploadProfilePicture,
  retrieveProfilePicture,
  updatePersonalInfo,
  getUserDetails,
  updatePersonalInfoHandler,
  uploadProfilePictureHandler,
} = require("../../Functions/JobSeeker/JobSeekerProfile");

router.put("/job-seeker/upload-profile-picture", uploadProfilePictureHandler);
router.get(
  "/job-seeker/retrieve-profile-picture/:seeker_id",
  retrieveProfilePicture
);
router.put("/job-seeker/edit-personal-info", updatePersonalInfoHandler);
router.put("/job-seeker/add-skills", ...addSkills);
router.put("/job-seeker/add-time-availability", ...addTimeAvailability);
router.post("/job-seeker/add-review", ...addReview);

router.get("/job-seeker/get-details/:seeker_id", getUserDetails);

module.exports = router;
