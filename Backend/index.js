const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

const http = require("http");
const routes = require("./Routes/routes");
// const { messaging } = require("./Functions/MessagingModule/Messaging");
// const { initSocket } = require("./socket");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
app.use(cors({ origin: "*" }));

app.use("/", routes);

app.use("/mobile/auth", require("./Routes/mobileRoutes/authentication"));
app.use("/mobile/otp", require("./Routes/mobileRoutes/otp"));

app.listen(process.env.PORT, () => {
  console.log("Server started in port: ", process.env.PORT);
});
