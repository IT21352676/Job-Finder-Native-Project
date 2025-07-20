const {
  uploadProfilePicture,
  retrieveProfilePicture,
  updatePersonalInfo,
  getDetailsById,
} = require("../../Functions/JobPoster/JobPosterProfile");

const router = require("express").Router();

router.put("/job-poster/upload-profile-picture", uploadProfilePicture);
router.get(
  "/job-poster/retrieve-profile-picture/:poster_id",
  retrieveProfilePicture
);
router.put("/job-poster/edit-personal-info", updatePersonalInfo);
router.get("/job-poster/get-details/:poster_id", getDetailsById);

module.exports = router;
