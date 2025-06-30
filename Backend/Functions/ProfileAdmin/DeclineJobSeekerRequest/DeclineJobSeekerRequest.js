const connection = require("../../../Services/connection");

async function declineJobSeekerRequest(req, res) {
  const sql =
    "UPDATE `parttime_srilanka`.`job_seeker` SET `status` = 'declined' WHERE (`seeker_id` = ? );";

  connection.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("error decline request.");
    } else {
      return res.status(200).json("user declined.");
    }
  });
}

module.exports = declineJobSeekerRequest;
