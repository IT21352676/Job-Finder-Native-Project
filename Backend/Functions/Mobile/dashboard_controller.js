const connection = require("../../Services/connection");

const displayAmount = async (req, res) => {
  try {
    const { seeker_id } = req.params;

    if (!seeker_id) {
      return res.status(400).json({ error: "Seeker ID not exists" });
    }

    const query =
      "SELECT earnings FROM parttime_srilanka.seeker_wallet WHERE seeker_id = ?";

    connection.query(query, [seeker_id], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(201).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

const displayJobsCount = async (req, res) => {
  try {
    const { poster_id } = req.params;

    if (!poster_id) {
      return res.status(400).json({ error: "Poster ID not exists" });
    }
    const query =
      "SELECT COUNT(title) AS count FROM parttime_srilanka.job WHERE poster_id = ?";

    connection.query(query, [poster_id], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(201).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

const displayApplicationsCount = async (req, res) => {
  try {
    const { poster_id } = req.params;

    if (!poster_id) {
      return res.status(400).json({ error: "Poster ID not exists" });
    }
    const query =
      "SELECT COUNT(job_id) AS count FROM parttime_srilanka.job_application WHERE poster_id = ?";

    connection.query(query, [poster_id], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(201).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { displayAmount, displayJobsCount, displayApplicationsCount };
