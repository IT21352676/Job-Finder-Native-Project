const axios = require("axios");
const dotenv = require("dotenv");
async function getForecast(req, res) {
  const { incomeData } = req.body;
  const { revenueData } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are a financial forecasting assistant. Based on the income and revenue data provided, generate a brief analysis and forecast for the next 7 days, next month, and the remainder of the year. Include helpful trends, estimated projections, and identify any anomalies or opportunities.",
          },
          {
            role: "user",
            content: `
Here is the current financial data:

Income:
- Total Today: $${incomeData.total_today}
- Total This Month: $${incomeData.total_month}
- Total This Year: $${incomeData.total_year}

Revenue:
- Total Today: $${revenueData.total_today}
- Total This Month: $${revenueData.total_month}
- Total This Year: $${revenueData.total_year}

Please generate:
1. A short summary of the current financial performance.
2. Forecasts for income and revenue for the next 7 days, next month, and the rest of the year.
3. Insights or trends worth noting (e.g., growth, decline, unusual spikes).
`,
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

module.exports = getForecast;
