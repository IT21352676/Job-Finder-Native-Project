const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../../../Services/connection');

const router = express.Router();

router.post('/verifyEmail', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const query = 'SELECT * FROM parttime_srilanka.otp WHERE user = ?';
    const result = await queryAsync(query, [email]);

    if (result.length === 0) {
      return res.status(400).json({ error: 'OTP not found' });
    }

    const { otp: hashedOtp } = result[0];
    const isMatch = await bcrypt.compare(otp, hashedOtp);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    return res.status(200).json({ message: 'OTP verified' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/saveUser', async (req, res) => {
  try {
    const { firstName, lastName, email, adminRole, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO parttime_srilanka.users (firstName, lastName, email, adminRole, password) VALUES (?, ?, ?, ?, ?)';
    await queryAsync(query, [firstName, lastName, email, adminRole, hashedPassword]);

    return res.status(200).json({ message: 'User saved successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

module.exports = router;
