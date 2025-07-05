const axios = require("axios");
const dotenv = require("dotenv");
const connection = require("../../Services/connection");

module.exports = getUserRecommendations = {};

async function generateUserRecommendations(req, res) {
  const jobContent = req.query.content;
  const userList = await getUsersDetails();
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are a smart and concise recruitment assistant. Your task is to analyze the job description and identify the most suitable candidates from the provided user list. For each recommended user, briefly explain *why* they are a good match for this job. Only list suitable users. Do not mention or evaluate unsuitable users.",
          },
          {
            role: "user",
            content: `### Job Description:\n${jobContent}\n\n### User List (Skills & Behaviors):\n${userList}\n\n### Instructions:\n- Recommend only the most relevant users.\n- For each user, provide a short explanation of the match.\n- Format the response as a markdown list:\n\n**Example Output Format:**\n\n- **User Name 1**: Explanation why they are suitable.\n- **User Name 2**: Explanation why they are suitable.\n\nBegin.`,
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

module.exports = generateUserRecommendations;

async function getUsersDetails() {
  const sql =
    "SELECT user_id, FirstName, LastName, skills FROM parttime_srilanka.user";

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching user list:", err);
        return reject("Internal Server Error");
      }

      if (results.length === 0) {
        return resolve("No users found");
      }

      const userDetails = results
        .map(
          (user) =>
            `**${user.FirsdtName} ${user.LastName}**: Skills - ${user.skills}, Behaviors - ${user.behaviors}`
        )
        .join("\n");

      resolve(userDetails);
    });
  });
}
