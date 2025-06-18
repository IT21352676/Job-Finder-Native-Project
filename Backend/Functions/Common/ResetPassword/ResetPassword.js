const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');

module.exports = async function resetPassword(req, res) {
    try {
        const query1 = 'UPDATE parttime_srilanka.admins SET password = ? WHERE Email = ?;';
        const query2 = 'DELETE FROM parttime_srilanka.otp WHERE user = ?;';
        const { email, password } = req.body;

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        await queryAsync("START TRANSACTION");

        await queryAsync(query1, [hashedPassword, email]);
        await queryAsync(query2, [email]);

        await queryAsync("COMMIT");

        return res.status(200).json({ message: 'Password changed successfully' });
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
