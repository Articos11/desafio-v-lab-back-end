import mysql from "mysql2/promise";

// Dados para conexão com o mySQL.
const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "vlab",
});

try {
    await connection.connect();
    console.log("Conexão com a base de dados realizada com sucesso.")
} catch (err){
    console.error("Erro ao conectar com a base de dados", err.message);
}

export default connection; 