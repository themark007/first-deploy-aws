const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], () => {
    res.redirect('/login');
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (results.length && await bcrypt.compare(password, results[0].password)) {
      req.session.userId = results[0].id;
      res.redirect('/tasks');
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
