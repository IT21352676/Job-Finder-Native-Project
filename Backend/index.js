const express = require('express')
const dotenv = require('dotenv')
const app = express();
<<<<<<< HEAD
const cors = require('cors');
=======
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");
const routes = require("./Routes/routes");
const { messaging } = require("./Functions/MessagingModule/Messaging");
const { initSocket } = require("./socket");
>>>>>>> 76c8193bda0e0c17369d49288009c1a30bd2ed05

dotenv.config()

app.use(express.json());
<<<<<<< HEAD
app.use(cors({
    origin : process.env.CORS_ORIGIN
}))
const routes = require('./Routes/routes');
=======
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
app.use(cors({ origin: "*" }));
>>>>>>> 76c8193bda0e0c17369d49288009c1a30bd2ed05

app.use('/', routes);

app.use("/mobile/auth", require("./Routes/mobileRoutes/authentication"));
app.use("/mobile/otp", require("./Routes/mobileRoutes/otp"));

app.listen(process.env.PORT, () => {
    console.log("Server started in port: ", process.env.PORT)
})