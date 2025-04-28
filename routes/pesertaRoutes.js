const express = require('express');
const router = express.Router();
const { verifyToken, isPeserta } = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController');


// Halaman dashboard peserta
router.get('/absensi', verifyToken, isPeserta, (req, res) => {
  res.render('absensi', { user: req.user });
});

// Tampilkan profile peserta
router.get('/profile', verifyToken, profileController.getProfile);

// Update profile peserta
router.post('/profile', verifyToken, profileController.updateProfile);

module.exports = router;