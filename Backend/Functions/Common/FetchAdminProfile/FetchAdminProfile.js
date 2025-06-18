const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');

// Fetch admin profile data
async function FetchAdminProfile(req, res) {
    const { email } = req.query;
    try {
        const sql = 'SELECT FirstName, LastName, Email, AdminRole FROM parttime_srilanka.admins WHERE Email = ?';
        connection.query(sql, email, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Admin not found' });
            }

            const admin = result[0];
            res.status(200).json(admin);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = FetchAdminProfile;