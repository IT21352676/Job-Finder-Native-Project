const getForecast = require("../../Functions/AIFeatures/FinancialForecast");
const generateJobRecommendations = require("../../Functions/AIFeatures/JobRecommendation");
const generateUserRecommendations = require("../../Functions/AIFeatures/UserRecommendation");
const router = require("express").Router();
router.post("/job-recommandation", (req, res) => {
  generateJobRecommendations(req, res);
});

router.post("/user-recommandation", (req, res) => {
  generateUserRecommendations(req, res);
});
router.post("/financial-forecast", (req, res) => {
  getForecast(req, res);
});

module.exports = router;
