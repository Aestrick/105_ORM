require('dotenv').config(); // Ini akan memuat variabel dari file .env

// Kita ambil data dari file .env
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

module.exports = {
  // Blok 'development' untuk lingkungan pengembangan
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mysql"
  },
  // Blok 'test' untuk pengujian
  "test": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME + "_test",
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mysql"
  },
  // Blok 'production' untuk saat aplikasi sudah rilis
  "production": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME + "_prod",
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mysql"
  }
};