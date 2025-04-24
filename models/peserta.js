'use strict';
module.exports = (sequelize, DataTypes) => {
  const Peserta = sequelize.define('Peserta', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id_user'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instansi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jurusan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pembimbing: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tanggal_mulai: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tanggal_selesai: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    nda_file: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    nda_status: {
      type: DataTypes.ENUM('Dikirim', 'Belum Dikirim'),
      defaultValue: 'Belum Dikirim',
    },
    laporan_akhir: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_laporan_akhir: {
      type: DataTypes.ENUM('Dikirim', 'Belum Dikirim'),
      defaultValue: 'Belum Dikirim',
    },
    id_template_sertifikat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    file_sertifikat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_sertifikat: {
      type: DataTypes.ENUM('Diterbitkan', 'Belum Diterbitkan'),
      defaultValue: 'Belum Diterbitkan',
    }
  }, {
    tableName: 'Peserta'
  });

  Peserta.associate = function(models) {
    Peserta.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user'
    });

    Peserta.belongsTo(models.TemplateSertifikat, {
      foreignKey: 'id_template_sertifikat',
      as: 'templateSertifikat'
    });
  };

  return Peserta;
};
