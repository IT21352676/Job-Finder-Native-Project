const router = require("express").Router();
const {
  acceptJobRequest,
  applyForAJob,
  displayAcceptedJobs,
  displayPendingJobs,
  displayRejectedJobs,
  rejectJobRequest,
  viewJobSeekerData,
  displayApplications,
} = require("../../Functions/Mobile/job_application_controller");

router.post("/application/post", applyForAJob);
router.get("/application/accept/:seeker_id", displayAcceptedJobs);
router.get("/application/pending/:seeker_id", displayPendingJobs);
router.get("/application/reject/:seeker_id", displayRejectedJobs);
router.put("/application/accept-application/:application_id", acceptJobRequest);
router.put("/application/reject-application/:application_id", rejectJobRequest);
router.get("/application/view-seeker/:seeker_id ", viewJobSeekerData);
router.get("/applications/job-poster/:poster_id", displayApplications);
module.exports = router;
