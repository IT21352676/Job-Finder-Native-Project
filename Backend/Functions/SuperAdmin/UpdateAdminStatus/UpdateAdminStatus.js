const connection = require('../../../Services/connection'); // Adjust path as per your setup

async function UpdateAdminStatus(req, res) {
    const { status, email } = req.body;

  try {
    const sql = 'UPDATE admins SET Status = ? WHERE Email = ?';
    connection.query(sql, [status, email], (err, result) => {
      if (err) {
        console.error('Error updating admin status:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      res.status(200).json({ message: 'Admin status updated successfully' });
    });
  } catch (error) {
    console.error('Error updating admin status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = UpdateAdminStatus;
