const express = require("express");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const connection = require("../../../Services/connection");

dotenv.config();

module.exports = async function requestOtp(req, res) {
  try {
    const query1 = "SELECT * FROM parttime_srilanka.adminotp WHERE user=?;";
    const query2 =
      "UPDATE `parttime_srilanka`.`adminotp` SET `otp` = ? WHERE (`user` = ?);";
    const query3 =
      "INSERT INTO `parttime_srilanka`.`adminotp` (`user`, `otp`) VALUES (?, ?);";

    const { fName, lName, email } = req.body;

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const saltRound = 10;
    const encryptedOtp = await bcrypt.hash(otp, saltRound);

    await queryAsync("START TRANSACTION");

    let resp = await queryAsync(query1, [email]);

    if (resp.length != 0) {
      await queryAsync(query2, [encryptedOtp, email]);
    } else {
      const values = [email, encryptedOtp];
      await queryAsync(query3, values);
    }

    // Delete otp after 5 mins
    setTimeout(() => {
      const deleteQuery =
        "DELETE FROM `parttime_srilanka`.`adminotp` WHERE (`user` = ?);";
      connection.query(deleteQuery, [email], (err) => {
        if (err) {
          console.error(err);
        }
      });
    }, 5 * 60 * 1000);

    // Configure nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSCODE,
      },
    });

    let parameters = {
      from: "Team JOBS",
      to: email,
      subject: "JOBS User Verification",
      html: `<center><h3><font color="#373737">Hello<br/>${fName} ${lName},</h3><h5>Thank you for registering with us</h5><h4>Your OTP code,</h4></font><font color="#FE8235" size=20><h2>${otp}</h2></font><font size=1 color="#FF4122"><p>**The OTP will expire after 5 minutes</p></font><br/><font color="#373737"><h6>Team JOBS</h6></font></center>`,
    };

    transporter.sendMail(parameters, async (err) => {
      if (err) {
        console.log(err);
        await queryAsync("ROLLBACK");
        return res.status(500).json({ message: "Internal Server Error" });
      } else {
        await queryAsync("COMMIT");
        return res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    await queryAsync("ROLLBACK");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
