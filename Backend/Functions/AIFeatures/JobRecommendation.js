const axios = require("axios");
const dotenv = require("dotenv");
const connection = require("../../Services/connection");

dotenv.config();

module.exports = getJobRecomendations = {
  async generateJobRecommendations(req, res) {
    const content = req.query.content;
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "user",
              content: content,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      res.status(200).json(response.data?.choices[0].message);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      res
        .status(400)
        .json({ error: error.response ? error.response.data : error.message });
    }
  },

  async getJobsDetails(req, res) {
    const sql = "select * from temporary_jobs;";
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching job list:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "No jobs found" });
      }
      console.log(results);
      res.status(200).json(results);
    });
  },

  // async function GetAdminList(req, res) {
  //   try {
  //     const sql =
  //       "SELECT FirstName, LastName, Email, AdminRole, status FROM parttime_srilanka.admins";
  //     connection.query(sql, (err, results) => {
  //       if (err) {
  //         console.error("Error fetching admin list:", err);
  //         return res.status(500).json({ error: "Internal Server Error" });
  //       }

  //       if (results.length === 0) {
  //         return res.status(404).json({ error: "No admins found" });
  //       }

  //       res.status(200).json(results);
  //     });
  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }
};
