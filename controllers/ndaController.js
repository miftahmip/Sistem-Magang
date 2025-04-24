const { Peserta } = require('../models');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

exports.renderNdaPage = async (req, res) => {
    try {
      const id_user = req.user.id; // Ambil dari JWT yang udah didekode
  
      const peserta = await Peserta.findOne({ where: { id_user } });
  
      if (!peserta) {
        return res.status(404).send('Peserta tidak ditemukan');
      }
  
      res.render('nda-peserta', {
        id_user,
        nda_status: peserta.nda_status
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan saat membuka halaman NDA');
    }
  };

// Upload file NDA
exports.uploadNda = async (req, res) => {
    const { id_user } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'File harus di-upload' });
    }

    try {
        const peserta = await Peserta.findOne({ where: { id_user } });
        if (!peserta) {
            return res.status(404).json({ message: 'Peserta tidak ditemukan' });
        }

        // Baca file dari folder uploads dan simpan ke DB sebagai buffer
        const filePath = path.join(__dirname, '..', 'uploads', 'nda', file.filename);
        const fileBuffer = await fsPromises.readFile(filePath);

        await peserta.update({
            nda_file: fileBuffer,
            nda_status: 'Dikirim'
        });

        res.redirect('/nda');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah NDA' });
    }
};

// Download template NDA
exports.downloadTemplateNda = (req, res) => {
    const templatePath = path.join(__dirname, '..', 'uploads', 'nda_template', 'nda_template.pdf');

    if (!fs.existsSync(templatePath)) {
        return res.status(404).json({ message: 'Template NDA tidak ditemukan' });
    }

    res.download(templatePath, 'Template_NDA.pdf');
};

// Download file NDA dari database
exports.downloadNda = async (req, res) => {
    const { id } = req.params;

    try {
        const peserta = await Peserta.findOne({ where: { id_user: id } });
        if (!peserta || !peserta.nda_file) {
            return res.status(404).json({ message: 'File NDA tidak ditemukan' });
        }

        const namaFile = `NDA_${peserta.nama.replace(/\s+/g, '_')}.pdf`;

        res.setHeader('Content-Disposition', `attachment; filename="${namaFile}"`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(peserta.nda_file);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengunduh NDA' });
    }
};

// Cek status dokumen NDA
exports.getStatusNda = async (req, res) => {
    const { id_user } = req.params;

    try {
        const peserta = await Peserta.findOne({ where: { id_user } });
        if (!peserta) {
            return res.status(404).json({ message: 'Peserta tidak ditemukan' });
        }

        res.status(200).json({ status: peserta.nda_status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan' });
    }
};

// Hapus file NDA
exports.deleteNda = async (req, res) => {
    const { id_user } = req.params;

    try {
        const peserta = await Peserta.findOne({ where: { id_user } });

        if (!peserta || !peserta.nda_file) {
            return res.status(404).json({ message: 'File NDA tidak ditemukan' });
        }

        // Hapus file NDA dari database
        await peserta.update({
            nda_file: null,
            nda_status: 'Belum Dikirim'
        });

        res.redirect('/nda'); // Redirect setelah penghapusan berhasil
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menghapus file NDA' });
    }
};

