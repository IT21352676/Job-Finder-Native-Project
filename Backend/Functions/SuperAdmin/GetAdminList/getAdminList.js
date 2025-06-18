const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');

// Fetch all admin profile data
async function GetAdminList(req, res) {
    try {
        const sql = 'SELECT FirstName, LastName, Email, AdminRole, status FROM parttime_srilanka.admins';
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching admin list:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'No admins found' });
            }

            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = GetAdminList;
