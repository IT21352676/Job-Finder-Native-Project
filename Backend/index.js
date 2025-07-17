const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const socketIo = require("socket.io");

const http = require("http");
const routes = require("./Routes/routes");
const { setupSocket } = require("./socket");
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

app.use("/", routes);

app.use("/mobile/auth", require("./Routes/mobileRoutes/authentication"));
app.use("/mobile/otp", require("./Routes/mobileRoutes/otp"));
app.use("/mobile/secured", require("./Routes/mobileRoutes/jobSeekerRoutes"));
app.use("/mobile/secured", require("./Routes/mobileRoutes/jobRoutes"));
app.use("/mobile/secured", require("./Routes/mobileRoutes/ReviewsRoutes"));
app.use("/mobile/secured", require("./Routes/mobileRoutes/jobPosterRoutes"));
app.use(
  "/mobile/secured",
  require("./Routes/mobileRoutes/job_applicationRoutes")
);
app.use("/mobile/secured", require("./Routes/mobileRoutes/bankRoutes"));
const notificationRoutes = require("./Routes/mobileRoutes/notificationRoutes")(
  io
);
app.use("/mobile/secured", notificationRoutes);

app.use("/mobile/secured", require("./Routes/mobileRoutes/aiRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server started in port: ", process.env.PORT);
});

setupSocket(io);

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`Socket Server running on port `, process.env.SOCKET_PORT);
});
