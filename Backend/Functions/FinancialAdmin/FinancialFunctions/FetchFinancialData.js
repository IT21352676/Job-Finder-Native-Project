const { HttpStatusCode } = require("axios");
const connection = require("../../../Services/connection");

module.exports = async function fetchFinancialData(req, res) {
  try {
    const query1 = `
      SELECT * 
      FROM parttime_srilanka.payment 
      INNER JOIN parttime_srilanka.job  
      ON parttime_srilanka.payment.job_id = parttime_srilanka.job.job_id
    `;

    const query2 = `
      SELECT * 
      FROM parttime_srilanka.job_poster 
      WHERE poster_id = ?
    `;

    const data1 = await queryAsync(query1);
    const returnData = [];

    if (data1 && data1.length > 0) {
      for (const job of data1) {
        const user = await queryAsync(query2, [job.poster_id]);

        if (user.length > 0) {
          job.posterName = user[0].firstname + " " + user[0].lastname;
        } else {
          job.posterName = "Unknown Poster";
        }

        returnData.push(job);
      }
      return res.status(HttpStatusCode.Ok).json(returnData);
    } else {
      return res.status(HttpStatusCode.NotFound).json("Ads not found");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatusCode.InternalServerError)
      .json("Internal Server Error");
  }
};

// Helper function
function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
