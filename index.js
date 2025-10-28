const express = require('express');
const app = express();
const port = 3000;

// [PENTING] Import semua model dan koneksi Sequelize
// File './models/index.js' otomatis dibaca
const db = require('./models');

// Middleware untuk parsing body JSON (dari Praktikum 3)
app.use(express.json());

// ===============================================
// ===           JALANKAN SERVER               ===
// ===============================================
// Kita tes koneksi database lalu jalankan server
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try {
        // Tes koneksi ke database
        await db.sequelize.authenticate();
        console.log('Successfully connected to the database.');
        
        // [PENTING] Sinkronisasi database
        // Ini akan membuat tabel jika belum ada (berdasarkan model)
        // Kita pakai 'alter' agar lebih aman saat ada perubahan
        await db.sequelize.sync({ alter: true });
        console.log('Database synchronized.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});


// ===============================================
// ===     RUTE-RUTE UNTUK OPERASI CRUD        ===
// ===============================================

// CREATE: Menambahkan data komik baru
app.post('/komik', async (req, res) => {
    try {
        // Dapatkan data dari body
        const { judul, penulis, penerbit } = req.body;

        // Validasi sederhana
        if (!judul || !penulis || !penerbit) {
            return res.status(400).json({
                success: false,
                message: 'Judul, penulis, dan penerbit wajib diisi!'
            });
        }

        // Buat data baru menggunakan Sequelize
        // Perhatikan, kita pakai 'db.Komik' (sesuai nama model)
        const komikBaru = await db.Komik.create({ 
            judul: judul, 
            penulis: penulis, 
            penerbit: penerbit 
        });

        // Kirim response sukses
        res.status(201).json({
            success: true,
            message: 'Komik berhasil ditambahkan',
            data: komikBaru
        });

    } catch (error) {
        console.error('Error adding komik:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// READ: Mengambil semua data komik
app.get('/komik', async (req, res) => {
    try {
        // Ambil semua data pakai 'findAll()'
        const semuaKomik = await db.Komik.findAll();

        res.status(200).json({
            success: true,
            message: 'Data komik berhasil diambil',
            data: semuaKomik
        });

    } catch (error) {
        console.error('Error fetching komik:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// READ: Mengambil satu data komik berdasarkan ID
app.get('/komik/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Ambil satu data pakai 'findByPk()' (Find by Primary Key)
        const komik = await db.Komik.findByPk(id);

        // Cek jika data tidak ditemukan
        if (!komik) {
            return res.status(404).json({
                success: false,
                message: 'Komik tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data komik berhasil diambil',
            data: komik
        });

    } catch (error) {
        console.error('Error fetching komik by id:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// UPDATE: Mengubah data komik berdasarkan ID
app.put('/komik/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { judul, penulis, penerbit } = req.body;

        // Cek dulu datanya ada atau tidak
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({
                success: false,
                message: 'Komik tidak ditemukan'
            });
        }

        // Lakukan update
        await komik.update({
            judul: judul,
            penulis: penulis,
            penerbit: penerbit
        });

        res.status(200).json({
            success: true,
            message: 'Komik berhasil diupdate',
            data: komik // Kirim data yang sudah diupdate
        });

    } catch (error) {
        console.error('Error updating komik:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// DELETE: Menghapus data komik berdasarkan ID
app.delete('/komik/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Cek dulu datanya ada atau tidak
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({
                success: false,
                message: 'Komik tidak ditemukan'
            });
        }

        // Hapus data
        await komik.destroy();

        res.status(200).json({
            success: true,
            message: 'Komik berhasil dihapus'
        });

    } catch (error) {
        console.error('Error deleting komik:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});