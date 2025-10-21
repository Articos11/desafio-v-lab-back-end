import db from "../config/database.js";

// Criação do autor (ou instuição)
export const createAuthor = async ({ name, author_type, birth_date, city }) => {
    const [result] = await db.execute(
        `INSERT INTO authors (name, type, birth_date, city) VALUES (?, ?, ?, ?)`,
        [name, author_type, birth_date , city]
    );
    return result.insertId;
};

// Buscar autor pelo ID
export const findAuthorById = async (id) => {
    const [rows] = await db.execute("SELECT * FROM authors WHERE id = ?", [id]);
    return rows[0];
};

// Listar todos os autores
export const getAllAuthors = async () => {
    const [rows] = await db.execute("SELECT * FROM authors");
    return rows;
};
