const connection = require("../../../Services/connection");

async function adminCount(req, res) {
  const sql =
    "SELECT count(*) as adminCount FROM parttime_srilanka.admins;";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error Getting Data.");
    } else {
      const adminCount = result[0].adminCount;
      return res.status(200).json({ adminCount });
    }
  });
}

module.exports = adminCount;