const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/verify_user");
const {
  deleteJob,
  editJobPost,
  getAllJobsByUserId,
  postANewJob,
  getAllOpenJobs,
} = require("../../Functions/Mobile/job_contoller");

//DESC: POST JOB ROUTE
router.post("/job-poster/post", verifyToken, postANewJob);

//DESC: EDIT A JOB
router.put("/job-poster/edit/:job_id", verifyToken, editJobPost);

//DEC: DELETE A JOB
router.delete("/job-poster/delete/:job_id", verifyToken, deleteJob);

//DESC: GET ALL JOBS BY USER
router.get("/job-poster/get/:poster_id", verifyToken, getAllJobsByUserId);

router.get("/job-poster/get-all-open", getAllOpenJobs);

module.exports = router;
