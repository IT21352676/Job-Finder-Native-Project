const connection = require("../../../Services/connection");

async function countJPDeclinedJobs(req, res) {
  const sql =
    "SELECT COUNT(*) AS declinedAccountCount FROM parttime_srilanka.job_poster WHERE ApprovedStatus = 'declined' ;";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error Getting Data.");
    } else {
      const declinedJPAccountCount = result[0].declinedAccountCount;
      return res.status(200).json({ declinedJPAccountCount });
    }
  });
}

module.exports = countJPDeclinedJobs;
