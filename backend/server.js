const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const {connectDB, sql} = require('./db');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

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




app.post('/login', async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        console.log("Datos recibidos:", usuario, contraseña);

        if (!usuario || !contraseña) {
            return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
        }

        let pool = await connectDB();
        let result = await pool.request()
            .input('Usuario1', sql.VarChar, usuario) 
            .input('Contrasena1', sql.VarChar, contraseña)
            .execute('Inicio'); 

        console.log("Resultado SQL:", result.recordset);

        if (result.recordset.length > 0) {
            return res.json({ mensaje: "✅ Inicio de sesión exitoso" });
        }

        return res.status(401).json({ error: "❌ Usuario o contraseña incorrectos" });

    } catch (err) {
       
        return res.status(500).json({ error: err.message || "Error interno del servidor" });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
