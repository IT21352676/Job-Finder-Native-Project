const router = require("express").Router();
const {
  jobPosterRegistrationController,
  jobSeekerRegistrationController,
  jobPosterLoginController,
  jobSeekerLoginController,
} = require("../../Functions/Mobile/authentication");

// DESC: JOB POSTER ROUTES
router.post("/job-poster-signup", jobPosterRegistrationController);
router.post("/job-poster-signin", jobPosterLoginController);

//DESC: JOB SEEKER ROUTES
router.post("/job-seeker/signup", jobSeekerRegistrationController);
router.post("/job-seeker-signin", jobSeekerLoginController);

module.exports = router;
