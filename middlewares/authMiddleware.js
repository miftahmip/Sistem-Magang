exports.login = async (req, res) => {
    const { email, password } = req.body;
    const { User } = require('../models/user');
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.render('login', { error: 'Email tidak ditemukan' });
      }
  
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
  
      // Arahkan ke halaman sesuai role
      if (user.role === 'admin') {
        return res.redirect('/admin/dataAkun');
      } else if (user.role === 'peserta') {
        return res.redirect('/peserta/Absensi');
      } else {
        return res.render('login', { error: 'Role tidak dikenali' });
      }
    } catch (error) {
      console.error(error); // biar error-nya keliatan di terminal
      return res.render('login', { error: 'Terjadi kesalahan server' });
    }
  };