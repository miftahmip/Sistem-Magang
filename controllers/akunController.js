const { Peserta, User } = require('../models');
const bcrypt = require('bcrypt');

// Tampilkan semua akun peserta
exports.getAllAkun = async (req, res) => {
  try {
    const akunList = await Peserta.findAll({
      include: [{ model: User, as: 'user' }]
    });
    res.render('dataAkun', { akunList, pesertaEdit: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menampilkan data akun.');
  }
};


// Tambah akun baru
exports.createAkun = async (req, res) => {
  try {
    const {
      namaLengkap, email, password, instansi, jurusan,
      no_hp, alamat, pembimbing, periodeMulai, periodeSelesai
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: 'peserta'
    });

    await Peserta.create({
      id_user: newUser.id_user,
      nama: namaLengkap,
      instansi,
      jurusan,
      no_hp,
      alamat,
      pembimbing,
      tanggal_mulai: periodeMulai,
      tanggal_selesai: periodeSelesai
    });

    res.redirect('/admin/akun');
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan saat menambah akun.');
  }
};

// Tampilkan form edit + data peserta lainnya
exports.getEditForm = async (req, res) => {
  const id = req.params.id;

  // Data peserta yang mau diedit
  const pesertaEdit = await Peserta.findByPk(id, {
    include: [{ model: User, as: 'user' }]
  });

  // Semua data peserta (buat ditampilin di tabel)
  const akunList = await Peserta.findAll({ include: { model: User, as: 'user' } });

  res.render('dataAkun', { akunList, pesertaEdit });
};

// Proses update akun
exports.updateAkun = async (req, res) => {
  try {
    const {
      namaLengkap, email, instansi, jurusan,
      no_hp, alamat, pembimbing, periodeMulai, periodeSelesai
    } = req.body;

    const peserta = await Peserta.findByPk(req.params.id);
    const user = await User.findByPk(peserta.id_user);

    await user.update({ email });
    await peserta.update({
      nama: namaLengkap,
      instansi,
      jurusan,
      no_hp,
      alamat,
      pembimbing,
      tanggal_mulai: periodeMulai,
      tanggal_selesai: periodeSelesai
    });

    res.redirect('/admin/akun');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengupdate data akun.');
  }
};

// Hapus akun
exports.deleteAkun = async (req, res) => {
  try {
    const peserta = await Peserta.findByPk(req.params.id);
    await Peserta.destroy({ where: { id_peserta: req.params.id } });
    await User.destroy({ where: { id_user: peserta.id_user } });
    res.redirect('/admin/akun');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menghapus data akun.');
  }
};
