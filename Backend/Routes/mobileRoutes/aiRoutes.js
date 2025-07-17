const generateJobRecommendations = require("../../Functions/AIFeatures/JobRecommendation");
const generateUserRecommendations = require("../../Functions/AIFeatures/UserRecommendation");
const router = require("express").Router();
router.post("/job-recommandation", (req, res) => {
  generateJobRecommendations(req, res);
});

router.post("/user-recommandation", (req, res) => {
  generateUserRecommendations(req, res);
});

module.exports = router;
