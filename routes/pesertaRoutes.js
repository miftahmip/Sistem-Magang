const express = require('express');
const router = express.Router();
const { verifyToken, isPeserta } = require('../middlewares/authMiddleware');

// Halaman dashboard peserta
router.get('/Absensi', verifyToken, isPeserta, (req, res) => {
  res.render('absensi', { user: req.user });
});

module.exports = router;