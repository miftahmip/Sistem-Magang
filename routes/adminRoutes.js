const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const akunController = require('../controllers/akunController');

// Halaman utama data akun peserta
router.get('/akun', verifyToken, isAdmin, akunController.getAllAkun);

// Proses tambah akun
router.post('/akun', verifyToken, isAdmin, akunController.createAkun);

// Form edit akun
router.get('/akun/edit/:id', verifyToken, isAdmin, akunController.getEditForm);

// Proses update akun
router.post('/akun/edit/:id', verifyToken, isAdmin, akunController.updateAkun);

// Proses hapus akun
router.post('/akun/delete/:id', verifyToken, isAdmin, akunController.deleteAkun);

// Route untuk download NDA
router.get('/akun/nda/download/:id', akunController.downloadNDA);

module.exports = router;
