const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Halaman dashboard admin
router.get('/dataAkun', verifyToken, isAdmin, (req, res) => {
  res.render('dataakun', { user: req.user });
});

module.exports = router;