const connection = require("../../../Services/connection");

async function acceptJobPosterRequest(req, res) {
  const sql =
    "UPDATE `parttime_srilanka`.`job_poster` SET `ApprovedStatus` = 'approved' WHERE (`poster_id` = ?);";

  connection.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("error accepting request.");
    } else {
      return res.status(200).json("user approved.");
    }
  });
}

module.exports = acceptJobPosterRequest;
