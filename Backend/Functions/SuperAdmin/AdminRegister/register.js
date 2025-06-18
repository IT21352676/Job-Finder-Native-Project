const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../../../Services/connection');

module.exports = async function adminRegister(req, res) {
  const { email, password, firstName, lastName, adminRole } = req.body;

  // Password validation
  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  if (!passwordValidation(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.' });
  }

  const duplicateCheckSql = 'SELECT * FROM admins WHERE Email = ?';

  connection.query(duplicateCheckSql, [email], async (duplicateCheckErr, duplicateCheckResult) => {
    if (duplicateCheckErr) {
      console.error('Error checking for duplicate records:', duplicateCheckErr);
      return res.status(500).send('Internal Server Error');
    }

    // If there are existing records, return an error
    if (duplicateCheckResult.length > 0) {
      return res.status(400).json({ error: 'User with the same details already exists.' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const values = [firstName, lastName, hashedPassword, email, adminRole];
      const sql = 'INSERT INTO `parttime_srilanka`.`admins` (`FirstName`, `LastName`, `Password`, `Email`, `AdminRole`) VALUES (?, ?, ?, ?, ?)';

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error during insertion:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Registration successful.' });
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};
