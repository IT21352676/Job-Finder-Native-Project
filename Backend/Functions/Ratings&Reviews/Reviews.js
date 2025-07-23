const connection = require("../../Services/connection");
const { authenticateToken } = require("../Middlewares/TokenAuth");

const addJobReviewHandler = (req, res) => {
  const addQuery = `INSERT INTO parttime_srilanka.job_reviews (job_id, user_id, rating, review) VALUES (?, ?, ?, ?)`;
  const { job_id, user_id, rating, review } = req.body;
  if (!job_id || !user_id || !rating || !review) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const values = [job_id, user_id, rating, review];
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
  const { user_id } = req.params;
  const query = `SELECT * FROM parttime_srilanka.job_reviews WHERE user_id = ?`;

  connection.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(results);
  });
};

const getJobReviewsByUserId = [authenticateToken, getJobReviewsByUserIdHandler];

const getJobReviewsByJobIdHandler = (req, res) => {
  const { job_id } = req.params;
  const query = `SELECT * FROM parttime_srilanka.job_reviews WHERE job_id = ?`;

  connection.query(query, [job_id], (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(results);
  });
};
const getJobReviewsByJobId = [authenticateToken, getJobReviewsByJobIdHandler];

const addSeekerReviewHandler = (req, res) => {
  const addQuery = `INSERT INTO parttime_srilanka.seeker_reviews (review_id, poster_id, seeker_id, rating, review) VALUES (?, ?, ?, ?, ?)`;
  const { review_id, poster_id, seeker_id, rating, review } = req.body;
  if (!review_id || !poster_id || !seeker_id || !rating || !review) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const values = [review_id, poster_id, seeker_id, rating, review];
  connection.query(addQuery, values, (err, result) => {
    if (err) {
      console.error("Error adding review:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      return res.status(201).json({ message: "Review added successfully" });
    }
  });
};

const addSeekerReview = [authenticateToken, addSeekerReviewHandler];

const getSeekerReviewsByPosterIdHandler = (req, res) => {
  const { poster_id } = req.params;
  const query = `SELECT * FROM parttime_srilanka.seeker_reviews WHERE poster_id = ?`;
  connection.query(query, [poster_id], (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(results);
  });
};

const getSeekerReviewsByPosterId = [
  authenticateToken,
  getSeekerReviewsByPosterIdHandler,
];

const getSeekerReviewsBySeekerIdHandler = (req, res) => {
  const { seeker_id } = req.params;
  const query = `SELECT * FROM parttime_srilanka.seeker_reviews WHERE seeker_id = ?`;
  connection.query(query, [seeker_id], (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(results);
  });
};

const getSeekerReviewsBySeekerId = [
  authenticateToken,
  getSeekerReviewsBySeekerIdHandler,
];

module.exports = {
  addJobReview,
  getJobReviewsByUserId,
  getJobReviewsByJobId,
  addSeekerReview,
  getSeekerReviewsByPosterId,
  getSeekerReviewsBySeekerId,
  addJobReviewHandler,
  getJobReviewsByUserIdHandler,
};
