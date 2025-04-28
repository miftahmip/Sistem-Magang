const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware untuk verifikasi token
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id_user: decoded.id,
      role: decoded.role
    };
    next();
  } catch (err) {
    return res.redirect('/');
  }
};

// Middleware khusus admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Akses ditolak: Bukan admin');
  }
  next();
};

// Middleware khusus peserta
exports.isPeserta = (req, res, next) => {
  if (req.user.role !== 'peserta') {
    return res.status(403).send('Akses ditolak: Bukan peserta');
  }
  next();
};
