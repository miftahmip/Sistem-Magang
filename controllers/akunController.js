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
  const userId = req.params.id;

  const pesertaEdit = await Peserta.findOne({
    where: { id_user: userId },
    include: [{ model: User, as: 'user' }]
  });

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

    const peserta = await Peserta.findOne({ where: { id_user: req.params.id } });
    const user = await User.findByPk(req.params.id);

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
    await Peserta.destroy({ where: { id_user: req.params.id } });
    await User.destroy({ where: { id_user: req.params.id } });
    res.redirect('/admin/akun');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menghapus data akun.');
  }
};

exports.downloadNDA = async (req, res) => {
  const userId = req.params.id;

  try {
    const peserta = await Peserta.findOne({ where: { id_user: userId } });

    if (!peserta || !peserta.nda_file) {
      return res.status(404).send('NDA tidak ditemukan.');
    }

    const buffer = peserta.nda_file;
    const namaFile = `NDA_${peserta.nama.replace(/\s+/g, '_')}.pdf`; // ganti spasi jadi underscore biar aman

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${namaFile}"`);
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengunduh file NDA.');
  }
};
