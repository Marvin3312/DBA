const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const { connectDB, sql } = require('./db'); // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

app.use('/views', express.static('../views'));


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

// Ruta para inicio de sesión
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

// Ruta para crear un cliente
app.post('/crear_cliente', async (req, res) => {
    try {
        const { Nombre1, Apellido1, DPI1, Direccion1, Telefono1, Nacimiento1, Usuario1, Contrasena1, Moneda1, Tipo1 } = req.body;

        let pool = await connectDB();
        const resultado = await pool.request()
            .input('Nombre1', sql.VarChar, Nombre1)
            .input('Apellido1', sql.VarChar, Apellido1)
            .input('DPI1', sql.VarChar, DPI1)
            .input('Direccion1', sql.VarChar, Direccion1)
            .input('Telefono1', sql.VarChar, Telefono1)
            .input('Nacimiento1', sql.Date, new Date(Nacimiento1).toISOString().split('T')[0]) // Asegúrate de que la fecha sea válida
            .input('Usuario1', sql.VarChar, Usuario1)
            .input('Contrasena1', sql.VarChar, Contrasena1)
            .input('Moneda1', sql.VarChar, Moneda1)
            .input('Tipo1', sql.Int, parseInt(Tipo1)) // Asegúrate de que sea un número
            .execute('CrearCuenta');

        console.log("🔍 Respuesta SQL Server:", resultado);
        res.json({ mensaje: "✅ Cliente creado exitosamente.", resultado });

    } catch (err) {
        console.error("❌ Error en la API:", err);
        res.status(500).json({ error: err.message || "Error al crear cliente" });
    }
});

// Ruta para realizar una transacción
app.post('/transaccion', async (req, res) => {
    try {
        const { CuentaOrigenP, CuentaDestinoP, MontoP } = req.body;

        if (!CuentaOrigenP || !CuentaDestinoP || !MontoP) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        let pool = await connectDB();
        const resultado = await pool.request()
            .input('CuentaOrigenP', sql.Int, CuentaOrigenP)
            .input('CuentaDestinoP', sql.Int, CuentaDestinoP)
            .input('MontoP', sql.Decimal, MontoP) // Asegurar que monto sea un número válido
            .execute('transferencia'); // Llamando al procedimiento almacenado

        console.log("🔍 Respuesta SQL Server:", resultado);
        res.json({ mensaje: "✅ Transacción realizada exitosamente.", resultado });

    } catch (err) {
        console.error("❌ Error en la transacción:", err);
        res.status(500).json({ error: err.message || "Error al procesar la transacción" });
    }
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
