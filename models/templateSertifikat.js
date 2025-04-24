'use strict';
module.exports = (sequelize, DataTypes) => {
  const TemplateSertifikat = sequelize.define('TemplateSertifikat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_template: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING, // path atau nama file template-nya
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'TemplateSertifikat'
  });

  TemplateSertifikat.associate = function(models) {
    TemplateSertifikat.hasMany(models.Peserta, {
      foreignKey: 'id_template_sertifikat',
      as: 'pesertas'
    });
  };

  return TemplateSertifikat;
};