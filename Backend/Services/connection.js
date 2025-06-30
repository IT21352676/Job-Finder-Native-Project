const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB,
  // ssl: {
  //   rejectUnauthorized: true,
  // },
});

connection.connect(function (err) {
  if (err) {
    console.log("Error connecting to Database" + err);
    return;
  } else {
    console.log("Connected to the database");
  }
});

module.exports = connection;
