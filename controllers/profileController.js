const { Peserta, User } = require('../models');

// Tampilkan profil peserta
exports.getProfile = async (req, res) => {
  try {
    console.log(req.user);  // Debug: Cek apakah req.user terisi dengan benar

    const userId = req.user?.id_user;  // Pastikan kita mengambil id_user dengan benar

    if (!userId) {
      return res.status(400).send('ID pengguna tidak ditemukan dalam token.');
    }

    // Ambil data peserta berdasarkan id_user
    const peserta = await Peserta.findOne({
      where: { id_user: userId },
      include: [{ model: User, as: 'user' }]
    });

    if (!peserta) {
      return res.status(404).send('Data peserta tidak ditemukan.');
    }

    res.render('profile', { peserta });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengambil data profil.');
  }
};

// Update profil peserta
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id_user;

    const {
      namaLengkap, instansi, jurusan, no_hp, alamat, pembimbing
    } = req.body;

    const peserta = await Peserta.findOne({ where: { id_user: userId } });

    if (!peserta) {
      return res.status(404).send('Data peserta tidak ditemukan.');
    }

    await peserta.update({
      nama: namaLengkap,
      instansi,
      jurusan,
      no_hp,
      alamat,
      pembimbing
    });

    res.redirect('/peserta/profile');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengupdate profil.');
  }
};
