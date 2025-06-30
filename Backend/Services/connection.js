<<<<<<< HEAD
const mysql = require('mysql')
const dotenv = require('dotenv')
=======
const mysql = require("mysql2");
const dotenv = require("dotenv");
>>>>>>> 76c8193bda0e0c17369d49288009c1a30bd2ed05

dotenv.config()

const connection = mysql.createConnection({
<<<<<<< HEAD
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD, 
    port: process.env.DB_PORT,
    database: process.env.DB
})
=======
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB,
  // ssl: {
  //   rejectUnauthorized: true,
  // },
});
>>>>>>> 76c8193bda0e0c17369d49288009c1a30bd2ed05

connection.connect(function(err){
    if(err) {
        console.log('Error connecting to Database'+err);
        return;
    }
    else{
    console.log("Connected to the database")}
})

module.exports = connection;