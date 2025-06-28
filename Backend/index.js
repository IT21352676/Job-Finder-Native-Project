const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
const routes = require("./Routes/routes");

app.use("/", routes);

app.use("/mobile/auth", require("./Routes/mobileRoutes/authentication"));
app.use("/mobile/otp", require("./Routes/mobileRoutes/otp"));

app.listen(process.env.PORT, () => {
  console.log("Server started in port: ", process.env.PORT);
});
