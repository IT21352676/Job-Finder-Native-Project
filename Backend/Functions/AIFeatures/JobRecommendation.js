const axios = require("axios");
const dotenv = require("dotenv");
const connection = require("../../Services/connection");

dotenv.config();

async function generateJobRecommendations(req, res) {
  const userContent = req.query.content;
  const { userId } = req.body;

  const jobList = await getJobsDetails();
  const userDetails = await getUserData(userId);

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are an intelligent and concise job recommendation assistant. Your task is to chat with user in professional tone and analyze the user's skills and behavioral traits, then recommend only the jobs from the given list that are highly suitable. For each recommended job, briefly explain *why* it matches the user's profile. Do not mention or refer to any jobs that are unsuitable.",
          },

          {
            role: "user",
            content: `User message : ${userContent}
            User Details :  ${userDetails}
            Jobs availble in the job list : ${jobList} `,
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
  const sql = "SELECT job_id, title, requirements FROM parttime_srilanka.job";

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
          `Job ID: ${row.job_id}, Title: ${row.title}, Requirements: ${row.requirements}`
      );

      resolve(list);
    });
  });
}

async function getUserData(userId) {
  const sql =
    "SELECT firstname, lastname, gender, skills, city, time_availability FROM parttime_srilanka.job_seeker WHERE seeker_id = ?";
  return new Promise((resolve, reject) => {
    connection.query(sql, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching job list:", err);
        return reject("Internal Server Error");
      }

      if (results.length === 0) {
        return resolve("No users found");
      }

      const list = results.map(
        (row) =>
          `User first name: ${row.firstname}, last name: ${row.lastname}, gender: ${row.gender}, skills: ${row.skills},city: ${row.city}, time_availability:${row.time_availability}`
      );

      resolve(list);
    });
  });
}
