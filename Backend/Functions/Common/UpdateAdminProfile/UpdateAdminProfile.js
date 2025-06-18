const connection = require('../../../Services/connection');



async function UpdateAdminProfile(req, res) {
    const { email, firstName, lastName} = req.body;
    try {
        const sql = 'UPDATE parttime_srilanka.admins SET FirstName = ?, LastName = ? WHERE Email = ?';
        connection.query(sql, [firstName, lastName, email], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Profile updated successfully' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = UpdateAdminProfile;