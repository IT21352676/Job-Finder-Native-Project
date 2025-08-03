const connection = require("../../../Services/connection");

async function getJobPosterAvgRatings(req, res) {
  const sql = `
    SELECT 
      jp.firstname,
      jp.lastname,
      jp.emailAddress,
      ROUND(AVG(pr.rating), 1) AS average_rating
    FROM 
      job_poster jp
    JOIN 
      seeker_reviews pr ON jp.poster_id = pr.poster_id
    GROUP BY 
      jp.firstname, jp.lastname, jp.emailAddress;
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

module.exports = getJobPosterAvgRatings;
