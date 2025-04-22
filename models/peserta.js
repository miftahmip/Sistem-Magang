'use strict';
module.exports = (sequelize, DataTypes) => {
  const Peserta = sequelize.define('Peserta', {
    id_peserta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    }
  }, {
    tableName: 'Peserta'
  });

  Peserta.associate = function(models) {
    Peserta.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user'
    });

    
  };

  return Peserta;
};
