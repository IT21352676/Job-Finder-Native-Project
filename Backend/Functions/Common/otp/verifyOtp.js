const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');

module.exports = async function verifyOtp(req, res) {
    try {
        const query = 'SELECT * FROM parttime_srilanka.otp WHERE user=?;';
        const { email, otp } = req.body;

        let resp = await queryAsync(query, [email]);

        if (resp.length === 0) {
            return res.status(400).json({ error: 'Invalid OTP or email' });
        }

        const { otp: storedOtp } = resp[0];
        const isValidOtp = await bcrypt.compare(otp, storedOtp);

        if (isValidOtp) {
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.log(error);
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
