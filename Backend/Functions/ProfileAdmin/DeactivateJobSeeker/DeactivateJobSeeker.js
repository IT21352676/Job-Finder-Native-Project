const connection = require("../../../Services/connection");

async function deactivateJobseeker(req, res) {
  console.log("Hello")
  const sql = "UPDATE `parttime_srilanka`.`job_seeker` SET `ActiveStatus` = 0 WHERE (`UserId` = ?);";
console.log(req.params.id)
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("error activate user.");
    } else {
      console.log(result)
      return res.status(200).json("user activated.");
    }
  });
}

module.exports = deactivateJobseeker;