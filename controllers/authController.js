const { User } = require('../models'); // Pakai dari models/index.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Menerima data login:', email, password);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render('login', { error: 'Email tidak ditemukan' });
    }

    console.log('Data user ditemukan:', user);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', { error: 'Password salah' });
    }

    const token = jwt.sign(
      { id: user.id_user, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true });

    if (user.role === 'admin') {
      return res.redirect('/admin/dataAkun');
    } else if (user.role === 'peserta') {
      return res.redirect('/peserta/Absensi');
    } else {
      return res.render('login', { error: 'Role tidak dikenali' });
    }
  } catch (error) {
    console.error('Error saat login:', error); // Tampilkan detail error di terminal
    return res.render('login', { error: 'Terjadi kesalahan server' });
  }
};
