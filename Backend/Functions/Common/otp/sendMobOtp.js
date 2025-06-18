const connection = require('../../../Services/connection');
const otpGenerator = require('otp-generator');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { HttpStatusCode, default: axios } = require('axios');

dotenv.config();

module.exports = async function sendMobOtp(req, res){
    try { 
        const query1 ='SELECT * FROM parttime_srilanka.otp WHERE user=?;';
        const query2 = 'UPDATE `parttime_srilanka`.`otp` SET `otp` = ? WHERE (`user` = ?);';
        const query3 = 'INSERT INTO `parttime_srilanka`.`otp` (`user`, `otp`) VALUES (?, ?);';

        const {fName, lName, mobNo} = req.body;

        const otp = otpGenerator.generate(4, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false});

        const saltRound = 10;
        const encryptedOtp = await bcrypt.hash(otp, saltRound);
        
        await queryAsync("START TRANSACTION");

        let resp = await queryAsync(query1, [mobNo]);

        if(resp.length != 0){
            await queryAsync(query2, [encryptedOtp, mobNo]);
        }else{
            const values = [mobNo, encryptedOtp];
            await queryAsync(query3, values);
        }

        //Delete otp after 5 mins
        setTimeout(() => {
            const deleteQuery = 'DELETE FROM `parttime_srilanka`.`otp` WHERE (`user` = ?);';
            connection.query(deleteQuery, mobNo, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }, 5 * 60 * 1000);

        const message = `Hi ${fName} ${lName}\n\nThank you for registering with us.\nYour OTP code: ${otp}\n\n**The OTP will be expired after 5 minutes\n\nThank You,\nTeam JOBS`;

        const key = process.env.SMS_API_KEY;
        const token = process.env.SMS_API_TOKEN;
        const sender = process.env.SENDER_ID;

        resp = await axios.post(`http://cloud.websms.lk/smsAPI?sendsms&apikey=${key}&apitoken=${token}&type=sms&from=${sender}&to=${mobNo}&text=${encodeURIComponent(message)}`);
        if(resp.data.status === "queued"){
            await queryAsync("COMMIT"); 
            return res.json(HttpStatusCode.Ok);
        }

        await queryAsync("ROLLBACK");

        return res.json(HttpStatusCode.InternalServerError);
    } catch (error) {
        console.log(error);
        await queryAsync("ROLLBACK");
        return res.json(HttpStatusCode.InternalServerError);
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

