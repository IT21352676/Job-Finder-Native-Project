const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM admins');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  try {
    await db.query('UPDATE admins SET isActive = ? WHERE id = ?', [isActive, id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
