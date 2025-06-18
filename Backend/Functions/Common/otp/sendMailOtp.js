const connection = require('../../../Services/connection');
const otpGenerator = require('otp-generator');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

dotenv.config();

module.exports = async function sendMailOtp(req, res) {
    try {
        const queryAdmin = 'SELECT * FROM parttime_srilanka.admins WHERE Email = ?;';
        const querySelectOtp = 'SELECT * FROM parttime_srilanka.otp WHERE user = ?;';
        const queryUpdateOtp = 'UPDATE parttime_srilanka.otp SET otp = ? WHERE user = ?;';
        const queryInsertOtp = 'INSERT INTO parttime_srilanka.otp (user, otp) VALUES (?, ?);';

        const { email } = req.body;

        // Check if the admin exists
        let admin = await queryAsync(queryAdmin, [email]);

        if (admin.length === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const saltRound = 10;
        const encryptedOtp = await bcrypt.hash(otp, saltRound);

        await queryAsync("START TRANSACTION");

        let otpRecord = await queryAsync(querySelectOtp, [email]);

        if (otpRecord.length != 0) {
            await queryAsync(queryUpdateOtp, [encryptedOtp, email]);
        } else {
            const values = [email, encryptedOtp];
            await queryAsync(queryInsertOtp, values);
        }

        // Delete otp after 5 mins
        setTimeout(() => {
            const deleteQuery = 'DELETE FROM parttime_srilanka.otp WHERE user = ?;';
            connection.query(deleteQuery, email, (err) => {
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
            }
        });

        let parameters = {
            from: "Team JOBS",
            to: email,
            subject: "JOBS Admin Verification",
            html: `<center><h3><font color="#373737">Hello,</h3><h5>Thank you for using our service</h5><h4>Your OTP code,</h4></font><font color="#FE8235" size=20><h2>${otp}</h2></font><font size=1 color="#FF4122"><p>**The OTP will expire after 5 minutes</p></font><br/><font color="#373737"><h6>Team JOBS</h6></font></center>`
        }

        transporter.sendMail(parameters, async (err) => {
            if (err) {
                console.log(err);
                await queryAsync("ROLLBACK");
                return res.status(500).json({ error: 'Internal Server Error' });
            } else {
                await queryAsync("COMMIT");
                return res.status(200).json({ message: 'OTP sent successfully' });
            }
        })
    } catch (error) {
        console.log(error);
        await queryAsync("ROLLBACK");
        return res.status(500).json({ error: 'Internal Server Error' });
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
