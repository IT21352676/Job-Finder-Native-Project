const connection = require("../../../Services/connection");

async function getJobSeekerAvgRatings(req, res) {
  const sql = `
    SELECT 
      js.firstname,
      js.lastname,
      js.email AS SeekerEmail,
      ROUND(AVG(sr.rating), 1) AS average_rating
    FROM 
      parttime_srilanka.job_seeker js
    JOIN 
      parttime_srilanka.seeker_reviews sr ON js.seeker_id = sr.seeker_id
    GROUP BY 
      js.firstname, js.lastname, js.email;
  `;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send("Error retrieving ratings");
    } else {
      res.status(200).json(result);
    }
  });
}

module.exports = getJobSeekerAvgRatings;
