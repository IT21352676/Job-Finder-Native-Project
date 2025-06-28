const axios = require("axios");
const dotenv = require("dotenv");
const connection = require("../../Services/connection");

dotenv.config();

async function generateJobRecommendations(req, res) {
  const userContent = req.query.content;
  const jobList = await getJobsDetails();
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are a helpful job recommendation assistant. Based on the user's skills and behavior, recommend suitable jobs from the provided job list. For each recommended job, explain why it matches the user's profile. If other jobs are unmatching with users skill dont mention about those unsuitable jobs, only output suitable jobs`,
          },
          {
            role: "user",
            content: `Here is the available job list:
${jobList}

Here are the user's skills and behaviors:
${userContent}

Please only recommend the most suitable jobs for this.`,
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
}

module.exports = generateJobRecommendations;

async function getJobsDetails() {
  const sql =
    "SELECT job_id, title, category, requirements FROM parttime_srilanka.job";

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching job list:", err);
        return reject("Internal Server Error");
      }

      if (results.length === 0) {
        return resolve("No jobs found");
      }

      const list = results.map(
        (row) =>
          `Job ID: ${row.job_id}, Title: ${row.title}, Category: ${row.category}, Requirements: ${row.requirements}`
      );

      resolve(list);
    });
  });
}
