const connection = require("../../../Services/connection");

async function countJSDeclinedJobs(req, res) {
  const sql =
    "SELECT COUNT(*) AS declinedAccountCount FROM parttime_srilanka.job_seeker WHERE status = 'declined' ;";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error Getting Data.");
    } else {
      const declinedJSAccountCount = result[0].declinedAccountCount;
      return res.status(200).json({ declinedJSAccountCount });
    }
  });
}

module.exports = countJSDeclinedJobs;
