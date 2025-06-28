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
            content:
              "You are an intelligent and concise job recommendation assistant. Your task is to analyze the user's skills and behavioral traits, then recommend only the jobs from the given list that are highly suitable. For each recommended job, briefly explain *why* it matches the user's profile. Do not mention or refer to any jobs that are unsuitable.",
          },
          {
            role: "user",
            content: `### Job List:\n${jobList}\n\n### User Profile (Skills & Behaviors):\n${userContent}\n\n### Instructions:\n- Recommend only the most relevant jobs.\n- For each job, provide a short explanation of the match.\n- Format the response as a markdown list:\n\n**Example Output Format:**\n\n- **Job Title 1**: Explanation why it's suitable.\n- **Job Title 2**: Explanation why it's suitable.\n\nBegin.`,
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
