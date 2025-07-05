const connection = require("../../Services/connection");
const { authenticateToken } = require("../Middlewares/TokenAuth");

const addJobReviewHandler = (req, res) => {
  const addQuery = `INSERT INTO parttime_srilanka.job_reviews (review_id, job_id, user_id, rating, review) VALUES (?, ?, ?, ?, ?)`;
  const { review_id, job_id, user_id, rating, review } = req.body;
  if (!review_id || !job_id || !user_id || !rating || !review) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const values = [review_id, job_id, user_id, rating, review];
  connection.query(addQuery, values, (err, result) => {
    if (err) {
      console.error("Error adding review:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      return res.status(201).json({ message: "Review added successfully" });
    }
  });
};

const addJobReview = [authenticateToken, addJobReviewHandler];

const getJobReviewsByUserIdHandler = (req, res) => {
  const { userId } = req.params;
  const query = `SELECT * FROM parttime_srilanka.job_reviews WHERE user_id = ?`;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(results);
  });
};

const getJobReviewsByUserId = [authenticateToken, getJobReviewsByUserIdHandler];

const getJobReviewsByJobIdHandler = (req, res) => {
  const { jobId } = req.params;
  const query = `SELECT * FROM parttime_srilanka.job_reviews WHERE job_id = ?`;

  connection.query(query, [jobId], (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(results);
  });
};
const getJobReviewsByJobId = [authenticateToken, getJobReviewsByJobIdHandler];

module.exports = {
  addJobReview,
  getJobReviewsByUserId,
  getJobReviewsByJobId,
};
