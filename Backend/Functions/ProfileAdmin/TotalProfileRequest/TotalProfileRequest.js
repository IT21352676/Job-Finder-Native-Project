const connection = require("../../../Services/connection");

async function totalrequestCount(req, res) {
  const sqlJobSeekers = "SELECT COUNT(*) AS requestJobSeekerCount FROM parttime_srilanka.job_seeker WHERE status = 'pending';";
  const sqlJobPosters = "SELECT COUNT(*) AS requestJobPosterCount FROM parttime_srilanka.job_poster WHERE ApprovedStatus = 'pending';";

  try {
    const [jobSeekersResult] = await new Promise((resolve, reject) => {
      connection.query(sqlJobSeekers, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    const [jobPostersResult] = await new Promise((resolve, reject) => {
      connection.query(sqlJobPosters, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    
    const requestJobSeekerCount = jobSeekersResult.requestJobSeekerCount;
    
    const requestJobPosterCount = jobPostersResult.requestJobPosterCount;
    const totalrequestCount = requestJobSeekerCount + requestJobPosterCount;

    return res.status(200).json({ totalrequestCount });
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json("Error Getting Data.");
  }
}

module.exports = totalrequestCount;
