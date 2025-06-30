const router = require("express").Router();
const {
  jobPosterRegistrationController,
  jobSeekerRegistrationController,
  jobPosterLoginController,
  jobSeekerLoginController,
} = require("../../Functions/Mobile/authentication");

const upload = require("../../middleware/file_middleware");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// DESC: JOB POSTER ROUTES
router.post(
  "/job-poster-signup",
  upload.fields([
    { name: "profileDoc_front", maxCount: 1 },
    { name: "profileDoc_back", maxCount: 1 },
  ]),
  jobPosterRegistrationController
);
router.post("/job-poster-signin", jobPosterLoginController);

//DESC: JOB SEEKER ROUTES
router.post(
  "/job-seeker-signup",
  upload.fields([
    { name: "profileDoc_front", maxCount: 1 },
    { name: "profileDoc_back", maxCount: 1 },
  ]),
  jobSeekerRegistrationController
);
router.post("/job-seeker-signin", jobSeekerLoginController);

module.exports = router;
