const connection = require("../../../Services/connection");

async function countJSApprovedJobs(req, res) {
  const sql =
    "SELECT COUNT(*) AS activeAccountCount FROM parttime_srilanka.job_seeker WHERE status = 'approved' && activeStatus = 1 ;";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json("Error Getting Data.");
    } else {
      const activeAccountCount = result[0].activeAccountCount;
      return res.status(200).json({ activeAccountCount });
    }
  });
}

module.exports = countJSApprovedJobs;
