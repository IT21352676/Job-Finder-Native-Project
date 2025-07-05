const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

const http = require("http");
const routes = require("./Routes/routes");
const { messaging } = require("./Functions/MessagingModule/Messaging");
const { initSocket } = require("./socket");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
app.use(cors({ origin: "*" }));

const server = http.createServer(app);
const io = initSocket(server);
messaging(io);

app.use("/", routes);

app.use("/mobile/auth", require("./Routes/mobileRoutes/authentication"));
app.use("/mobile/otp", require("./Routes/mobileRoutes/otp"));
app.use("/mobile/secured", require("./Routes/mobileRoutes/jobSeekerRoutes"));
app.use("/mobile/secured", require("./Routes/mobileRoutes/ReviewsRoutes"));
app.use("/mobile/secured", require("./Routes/mobileRoutes/jobPosterRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server started in port: ", process.env.PORT);
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`Socket Server running on port `, process.env.SOCKET_PORT);
});
