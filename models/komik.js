'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Komik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Komik.init({
    // Kita TIDAK perlu definisikan 'id'
    judul: DataTypes.STRING,
    penulis: DataTypes.STRING,
    deskripsi: DataTypes.TEXT // <-- Sesuaikan dengan SQL-mu
  }, {
    sequelize,
    modelName: 'Komik',
    tableName: 'komik', // <-- WAJIB 1: Samakan dengan nama tabel di MySQL
    timestamps: false // <-- WAJIB 2: Matikan timestamp Sequelize
  });
  return Komik;
};