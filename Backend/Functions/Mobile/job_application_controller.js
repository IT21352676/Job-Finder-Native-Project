const connection = require("../../Services/connection");

// DESC: APPLY FOR A JOB
const applyForAJob = async (req, res) => {
  const { job_id, seeker_id, poster_id } = req.body;

  console.log(job_id, seeker_id, poster_id);

  if (!job_id || !seeker_id || !poster_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO parttime_srilanka.job_application (job_id, seeker_id, status, apply_date, poster_id)
    VALUES (?, ?, 'Pending', NOW(),?)
  `;
  const values = [job_id, seeker_id, poster_id];

  connection.query(query, values, (err) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res
      .status(201)
      .json({ message: "Job application posted successfully!" });
  });
};

// DESC: DISPLAY ACCEPTED JOBS
const displayAcceptedJobs = async (req, res) => {
  const { seeker_id } = req.params;

  if (!seeker_id) {
    return res.status(400).json({ error: "Seeker is undefined" });
  }

  const query = `
    SELECT * FROM parttime_srilanka.job_application
    WHERE status = 'Accepted' AND seeker_id = ?
  `;
  const values = [seeker_id];

  connection.query(query, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(200).json({ data });
  });
};

// DESC: DISPLAY PENDING JOBS
const displayPendingJobs = async (req, res) => {
  const { seeker_id } = req.params;

  if (!seeker_id) {
    return res.status(400).json({ error: "Seeker is undefined" });
  }

  const query = `
    SELECT * FROM parttime_srilanka.job_application
    WHERE status = 'Pending' AND seeker_id = ?
  `;
  const values = [seeker_id];

  connection.query(query, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(200).json({ data });
  });
};

// DESC: DISPLAY REJECTED JOBS
const displayRejectedJobs = async (req, res) => {
  const { seeker_id } = req.params;

  if (!seeker_id) {
    return res.status(400).json({ error: "Seeker is undefined" });
  }

  const query = `
    SELECT * FROM parttime_srilanka.job_application
    WHERE status = 'Rejected' AND seeker_id = ?
  `;
  const values = [seeker_id];

  connection.query(query, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(200).json({ data });
  });
};

// DESC: ACCEPT A CLIENT REQUEST
const acceptJobRequest = async (req, res) => {
  const { application_id } = req.params;

  if (!application_id) {
    return res.status(400).json({ error: "Application ID is undefined" });
  }

  const query = `
    UPDATE parttime_srilanka.job_application
    SET status = 'Accepted'
    WHERE application_id = ?
  `;
  const values = [application_id];

  connection.query(query, values, (err) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(200).json({ message: "Application accepted!" });
  });
};

// DESC: DECLINE A CLIENT REQUEST
const rejectJobRequest = async (req, res) => {
  const { application_id } = req.params;

  if (!application_id) {
    return res.status(400).json({ error: "Application ID is undefined" });
  }

  const query = `
    UPDATE parttime_srilanka.job_application
    SET status = 'Rejected'
    WHERE application_id = ?
  `;
  const values = [application_id];

  connection.query(query, values, (err) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(200).json({ message: "Application rejected!" });
  });
};

// DESC: VIEW JOB SEEKER PROFILE DATA
const viewJobSeekerData = async (req, res) => {
  const { seeker_id } = req.params;

  if (!seeker_id) {
    return res.status(400).json({ error: "Seeker ID is undefined" });
  }

  const query = `
    SELECT * FROM parttime_srilanka.job_seeker
    WHERE seeker_id = ?
  `;
  const values = [seeker_id];

  connection.query(query, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(200).json({ data });
  });
};

// DESC: DISPLAY JOBS
const displayApplications = async (req, res) => {
  const { poster_id } = req.params;
  console.log(poster_id);
  if (!poster_id) {
    return res.status(400).json({ error: "Poster is undefined" });
  }

  const query = `
    SELECT * FROM parttime_srilanka.job_application
    WHERE poster_id = ?
  `;
  const values = [poster_id];

  connection.query(query, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Something went wrong: ${err}` });
    }
    return res.status(200).json({ data });
  });
};

module.exports = {
  applyForAJob,
  displayAcceptedJobs,
  displayRejectedJobs,
  displayPendingJobs,
  acceptJobRequest,
  rejectJobRequest,
  viewJobSeekerData,
  displayApplications,
};
