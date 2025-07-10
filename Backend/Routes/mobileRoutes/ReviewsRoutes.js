const router = require("express").Router();

router.post(
  "/add-job-review",
  require("../../Functions/Ratings&Reviews/Reviews").addJobReview
);
router.get(
  "/get-job-reviews-by-user/:user_id",
  require("../../Functions/Ratings&Reviews/Reviews").getJobReviewsByUserId
);
router.get(
  "/get-job-reviews-by-job/:job_id",
  require("../../Functions/Ratings&Reviews/Reviews").getJobReviewsByJobId
);

router.post(
  "/add-seeker-review",
  require("../../Functions/Ratings&Reviews/Reviews").addSeekerReview
);
router.get(
  "/get-seeker-reviews-by-poster/:poster_id",
  require("../../Functions/Ratings&Reviews/Reviews").getSeekerReviewsByPosterId
);
router.get(
  "/get-seeker-reviews-by-seeker/:seeker_id",
  require("../../Functions/Ratings&Reviews/Reviews").getSeekerReviewsBySeekerId
);
module.exports = router;
