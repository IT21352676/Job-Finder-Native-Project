const connection = require("../../Services/connection");

// DESC: POST A NEW JOB
const postANewJob = async (req, res) => {
  const jobInsertQuery = `
    INSERT INTO parttime_srilanka.job 
    (poster_id, title, description, gender, status, work_hours, posted_date, job_date, start_date, amount_of_seekers, hourly_title, location, requirements)
    VALUES (?, ?, ?, ?, 'open', ?, NOW(), ?, ?, ?, ?, ?, ?)
  `;

  const {
    poster_id,
    title,
    description,
    gender,
    work_hours,
    job_date,
    start_date,
    amount_of_seekers,
    hourly_title,
    location,
    requirements,
  } = req.body;

  // Validate required fields
  if (
    !poster_id ||
    !title ||
    !description ||
    !gender ||
    !work_hours ||
    !job_date ||
    !start_date ||
    !amount_of_seekers ||
    !hourly_title ||
    !location
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const values = [
    poster_id,
    title,
    description,
    gender,
    work_hours,
    job_date,
    start_date,
    amount_of_seekers,
    hourly_title,
    location,
    requirements,
  ];

  connection.query(jobInsertQuery, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(201).json({ message: "Job posted successfully!" });
  });
};

//DESC: EDIT EXISTING POST
const editJobPost = async (req, res) => {
  const findExistJob = `SELECT * FROM parttime_srilanka.job WHERE job_id = ?`;
  const jobId = req.params;

  if (!jobId) {
    return res.status(400).json({ error: "job_id is required" });
  }

  connection.query(findExistJob, [jobId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    const {
      title,
      description,
      gender,
      work_hours,
      job_date,
      start_date,
      amount_of_seekers,
      hourly_title,
      location,
      requirements,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !gender ||
      !work_hours ||
      !job_date ||
      !start_date ||
      !amount_of_seekers ||
      !hourly_title ||
      !location
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updateQuery = `
      UPDATE parttime_srilanka.job 
      SET title=?, description=?, gender=?, work_hours=?, job_date=?, start_date=?, 
          amount_of_seekers=?, hourly_title=?, location=?, posted_date=NOW(), status='open', requirements=?
      WHERE job_id=?
    `;

    const values = [
      title,
      description,
      gender,
      work_hours,
      job_date,
      start_date,
      amount_of_seekers,
      hourly_title,
      location,
      requirements,
      jobId,
    ];

    connection.query(updateQuery, values, (error, data) => {
      if (error) {
        return res
          .status(500)
          .json({ error: `Error while updating job: ${error}` });
      }

      return res.status(200).json({ message: "Job updated successfully" });
    });
  });
};

//DESC: DELETE EXISTING JOBS
const deleteJob = async (req, res) => {
  const { job_id } = req.params;

  if (!job_id) {
    return res.status(400).json({ error: "job_id is required" });
  }

  const deleteQuery = "DELETE FROM parttime_srilanka.job WHERE job_id = ?";

  connection.query(deleteQuery, [job_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: `Database error: ${err.message}` });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "No job found with the given job_id" });
    }

    return res.status(200).json({ message: "Job deleted successfully" });
  });
};

//DESC: GET ALL ACTIVE JOBS
const getAllOpenJobs = async (req, res) => {
  const getAllQuery =
    "SELECT * FROM parttime_srilanka.job WHERE status = 'open'";

  connection.query(getAllQuery, [], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server error: " + err.message });
    }

    return res.status(200).json({ data });
  });
};
//DESC: GET ALL JOBS BY USER
const getAllJobsByUserId = async (req, res) => {
  const getQuery = "SELECT * FROM parttime_srilanka.job WHERE poster_id=?";

  const { poster_id } = req.params;

  if (!poster_id) {
    return res.status(400).json({ error: "Job poster id required" });
  }

  connection.query(getQuery, [poster_id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server error: " + err.message });
    }

    if (!data || data.length == 0) {
      return res.status.json({ message: "No jobs available" });
    }

    return res.status(200).json({ data });
  });
};

//DESC: SEARCH AND FILTER JOBS BY SKILL, CATEGORY AND LOCATION
const searchAndFilterJob = async (req, res) => {
  const { title, requirements, location } = req.body;

  const filterQuery = `
    SELECT * FROM parttime_srilanka.job j 
    WHERE (? IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', ?, '%')))
      AND (? IS NULL OR LOWER(j.requirements) LIKE LOWER(CONCAT('%', ?, '%')))
      AND (? IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', ?, '%')))
  `;

  const values = [
    title || null,
    title || null,
    requirements || null,
    requirements || null,
    location || null,
    location || null,
  ];

  connection.query(filterQuery, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Server error: ${err.message}` });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No jobs available" });
    }

    return res.status(200).json({ data });
  });
};

module.exports = {
  postANewJob,
  editJobPost,
  deleteJob,
  getAllJobsByUserId,
  getAllOpenJobs,
  searchAndFilterJob,
};
