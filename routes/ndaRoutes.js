const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { verifyToken, isPeserta } = require('../middlewares/authMiddleware');
const ndaController = require('../controllers/ndaController');

router.get('/', verifyToken, isPeserta, ndaController.renderNdaPage);

// Endpoint untuk menghapus NDA
router.post('/delete/:id_user', verifyToken, isPeserta, ndaController.deleteNda);

router.get('/template', ndaController.downloadTemplateNda);

// Endpoint untuk upload NDA
router.post('/upload', upload.single('file'), ndaController.uploadNda);

// Endpoint untuk download NDA
router.get('/download/:id', ndaController.downloadNda);

// Endpoint untuk melihat status NDA
router.get('/status/:id_user', ndaController.getStatusNda);

module.exports = router;
