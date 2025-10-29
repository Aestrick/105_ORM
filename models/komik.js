'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Komik extends Model {
    static associate(models) {
      // define association here
    }
  }
  Komik.init({
    // Kita definisikan semua kolom KECUALI id, createdAt, updatedAt
    // Sequelize akan otomatis menambahkannya
    judul: DataTypes.STRING,
    penulis: DataTypes.STRING,
    deskripsi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Komik',
    tableName: 'komik' // <-- Pastikan ini 'komik' (huruf kecil)
    
    // JANGAN tambahkan 'timestamps: false'
    // Biarkan default (true) agar Sequelize 
    // mengenali kolom createdAt dan updatedAt
  });
  return Komik;
};