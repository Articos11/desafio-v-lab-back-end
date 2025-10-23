// Imports de bibliotecas.
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Imports de outros arquivos
import connection from "./config/database.js";
import User from "./routes/userRoutes.js"
import Material from "./routes/materialRoutes.js"
import Author from "./routes/authorRoutes.js"

// Configurações do servidor.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/", User);
app.use("/api", Material);
app.use("/api", Author);


export default app;

// O servidor só irá ser conectado se a base de dados for conectada primeiro.
connection.connect().then(() => {
    app.listen(PORT, () => console.log(`Servidor conectado e funcionando na porta: localhost:${PORT}`));
});

