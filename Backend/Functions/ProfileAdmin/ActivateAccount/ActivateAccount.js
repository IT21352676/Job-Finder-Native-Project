const connection = require("../../../Services/connection");

async function activateAccount(req, res) {
  const sql =
    "UPDATE `parttime_srilanka`.`job_poster` SET `ActiveStatus` = 1 WHERE (`poster_id` = ?);";

  connection.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("error activate user.");
    } else {
      return res.status(200).json("user activated.");
    }
  });
}

module.exports = activateAccount;
