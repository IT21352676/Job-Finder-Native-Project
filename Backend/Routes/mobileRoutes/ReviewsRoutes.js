const router = require("express").Router();

router.post(
  "/add-job-review",
  require("../../Functions/Ratings&Reviews/Reviews").addJobReview
);
router.get(
  "/get-job-reviews-by-user/:userId",
  require("../../Functions/Ratings&Reviews/Reviews").getJobReviewsByUserId
);
router.get(
  "/get-job-reviews-by-job/:jobId",
  require("../../Functions/Ratings&Reviews/Reviews").getJobReviewsByJobId
);
module.exports = router;
