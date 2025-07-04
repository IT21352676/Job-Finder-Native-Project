const { authenticateToken } = require("../Middlewares/TokenAuth");
const connection = require("./../../Services/connection");

const addSkillsHandler = async (req, res) => {
  const updateQuery =
    "UPDATE parttime_srilanka.job_seeker SET skills = ? WHERE seeker_id = ?;";

  const values = [req.body.skills, req.body.seeker_id];

  if (!req.body.skills || !req.body.seeker_id) {
    return res.status(400).json({ error: "Skills and seeker_id are required" });
  }

  connection.query(updateQuery, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Skills updated successfully");
  });
};

const addSkills = [authenticateToken, addSkillsHandler];

const addTimeAvailabilityHandler = async (req, res) => {
  const updateQuery =
    "UPDATE parttime_srilanka.job_seeker SET time_availability = ? WHERE seeker_id = ?;";

  const values = [req.body.time_availability, req.body.seeker_id];

  if (!req.body.time_availability || !req.body.seeker_id) {
    return res
      .status(400)
      .json({ error: "Time availability and seeker_id are required" });
  }

  connection.query(updateQuery, values, (err, data) => {
    1;
    if (err) return res.json(err);
    return res.json("Time availability updated successfully");
  });
};

const addTimeAvailability = [authenticateToken, addTimeAvailabilityHandler];

const addReviewHandler = async (req, res) => {
  const insertQuery =
    "INSERT INTO parttime_srilanka.job_seeker_reviews (seeker_id, job_id, rating, review) VALUES (?, ?, ?, ?);";

  const values = [
    req.body.seeker_id,
    req.body.job_id,
    req.body.rating,
    req.body.review,
  ];

  if (
    !req.body.seeker_id ||
    !req.body.job_id ||
    !req.body.rating ||
    !req.body.review
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  connection.query(insertQuery, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Review added successfully");
  });
};

const addReview = [authenticateToken, addReviewHandler];
module.exports = {
  addSkills,
  addTimeAvailability,
  addReview,
};
