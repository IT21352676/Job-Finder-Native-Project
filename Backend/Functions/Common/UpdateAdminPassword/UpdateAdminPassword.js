const connection = require('../../../Services/connection');
const bcrypt = require('bcrypt');



async function updateAdminPassword(req, res) {
    const { email, oldPassword, newPassword } = req.body;
    console.log(req.body)
    try {
        const query = 'SELECT Password FROM parttime_srilanka.admins WHERE Email = ?';
        connection.query(query, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Admin not found' });
            }

            const admin = result[0];
            const isMatch = await bcrypt.compare(oldPassword, admin.Password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Current password is incorrect' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            const updateQuery = 'UPDATE parttime_srilanka.admins SET Password = ? WHERE Email = ?';
            connection.query(updateQuery, [hashedPassword, email], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.status(200).json({ message: 'Password changed successfully' });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = updateAdminPassword;