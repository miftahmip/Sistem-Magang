const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder uploads/nda ada
const ndaFolder = path.join(__dirname, '..', 'uploads', 'nda');
if (!fs.existsSync(ndaFolder)) {
    fs.mkdirSync(ndaFolder, { recursive: true });
}

// Setup penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, ndaFolder); // Menyimpan file ke folder uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

module.exports = upload;
