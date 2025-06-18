const connection = require("../../../Services/connection");

async function countJobHandlingRequest(req, res) {
  const sql =
    "SELECT COUNT(*) AS jobhandlingrequest FROM parttime_srilanka.job_cancel WHERE approved = '0' ;";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error Getting Data.");
    } else {
      const JobHandlingRequest = result[0].jobhandlingrequest;
      return res.status(200).json({ JobHandlingRequest });
    }
  });
}

module.exports = countJobHandlingRequest;
