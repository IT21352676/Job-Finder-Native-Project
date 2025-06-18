const connection = require("../../../Services/connection");

async function jobCount(req, res) {
  const sql =
    "SELECT count(*) AS jobCount FROM parttime_srilanka.job;";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error Getting Data.");
    } else {
      const jobCount = result[0].jobCount;
      return res.status(200).json({ jobCount });
    }
  });
}

module.exports = jobCount;