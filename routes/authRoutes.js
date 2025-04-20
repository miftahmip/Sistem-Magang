const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login page
router.get('/', (req, res) => {
  res.render('login');
});

// Proses login
router.post('/login', authController.login);

module.exports = router;