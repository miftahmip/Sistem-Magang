'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Peserta', {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      instansi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jurusan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_hp: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pembimbing: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tanggal_mulai: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      tanggal_selesai: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      nda_file: {
        type: Sequelize.BLOB('long'),
        allowNull: true
      },
      nda_status: {
        type: Sequelize.ENUM('Dikirim', 'Belum Dikirim'),
        defaultValue: 'Belum Dikirim'
      },
      laporan_akhir: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status_laporan_akhir: {
        type: Sequelize.ENUM('Dikirim', 'Belum Dikirim'),
        defaultValue: 'Belum Dikirim'
      },
      id_template_sertifikat: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TemplateSertifikat',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      file_sertifikat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status_sertifikat: {
        type: Sequelize.ENUM('Diterbitkan', 'Belum Diterbitkan'),
        defaultValue: 'Belum Diterbitkan'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Peserta');
  }
};