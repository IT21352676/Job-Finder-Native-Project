const nodemailer = require("nodemailer");
require("dotenv").config();
// const connection = require("../../Services/connection");

// Promisify the MySQL connection.query
// const query = util.promisify(connection.query).bind(connection);

//Send Verification Code Email
const sendEmailVerificationCode = async (req, res) => {
  const email = req.body.email;
  const verificationCode = generate4DigitOtp();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_HOST,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: email,
    subject: "Verify Your Account",
    html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #007BFF;">Welcome to Job Finder!</h2>
                <p>Dear User,</p>
                <p>Thank you for signing up with Job Finder. To complete your registration, please verify your email address using the following verification code:</p>
                <p style="font-size: 18px; font-weight: bold; color: #007BFF;">${verificationCode}</p>
                <p>This code will expire in 10 minutes. If you did not request this code, please ignore this email.</p>
                <p>If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:support@jobfiner.com">support@jobfiner.com</a>.</p>
                <p>Thank you for choosing Job Finder!</p>
                <p>Best regards,</p>
                <p><strong>The Job Finder Team</strong></p>
                <hr>
                <p style="font-size: 12px; color: #777;">
                    This is an automated message. Please do not reply to this email.
                </p>
            </div>
        `,
  };

  try {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await transporter.sendMail(mailOptions);

    const otpInsertQuery =
      "INSERT INTO parttime_srilanka.otp (email,otp,exp_date) VALUES (?,?,?)";

    const otpData = [email, verificationCode, expiresAt];

    connection.query(otpInsertQuery, otpData);

    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error sending email",
      error: error.message,
    });
  }
};

// Verify OTP
const otpVerifications = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const dataexists = connection.query(`SELECT * FROM parttime_srilanka.otp 
WHERE email = ? AND otp = ? 
ORDER BY exp_date DESC 
LIMIT 1`);

    if (!dataexists || dataexists.length < 0) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const record = dataexists[0];
    const now = new Date();

    if (new Date(record.expires_at) < now) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // OTP is valid
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Server error during OTP verification:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const generate4DigitOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Range: 1000–9999
};

module.exports = { sendEmailVerificationCode, otpVerifications };
