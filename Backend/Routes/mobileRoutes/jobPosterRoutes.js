const {
  uploadProfilePicture,
  retrieveProfilePicture,
  updatePersonalInfo,
} = require("../../Functions/JobPoster/JobPosterProfile");

const router = require("express").Router();

router.put("/job-poster/upload-profile-picture", uploadProfilePicture);
router.get("/job-poster/retrieve-profile-picture", retrieveProfilePicture);
router.put("/job-poster/edit-personal-info", updatePersonalInfo);

module.exports = router;
