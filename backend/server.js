const express = require('express');
const { connectDB, sql } = require('./db');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba para consultar datos
app.get('/clientes', async (req, res) => {
    try {
        let pool = await connectDB();
        let result = await pool.request().query("SELECT * FROM Cliente");
        res.json(result.recordset);
        console.log(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
