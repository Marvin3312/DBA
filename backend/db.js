require('dotenv').config();


const sql = require('mssql');

// Configuración de la conexión
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,  
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};



async function connectDB() {
    try {
        let pool = await sql.connect(dbConfig);
        console.log("✅ Conectado a SQL Server");
        return pool;
    } catch (err) {
        console.error("❌ Error al conectar a SQL Server:", err);
        throw err;
    }
}

module.exports = { connectDB, sql };
