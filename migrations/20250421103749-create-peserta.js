'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Peserta', {
      id_peserta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
