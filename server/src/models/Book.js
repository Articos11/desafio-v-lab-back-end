import db from "../config/database.js";

// Validando o isbn
function isValidISBN(isbn) {
    return /^\d{13}$/.test(isbn);
}

// Criação do livro. 
export const createBook = async (material_id, isbn, pages) => {
    if(!isValidISBN(isbn)) {
        console.error(`ISBN inválido. Deve conter exatamente 13 carcteres numéricos`); 
        return; 
    }

    if(!pages || pages <= 0) {
         console.error(`O livro deve ter um número de páginas maior que zero.`)
         return;
    }

    const [existingBook] = await db.execute(
        
    )

    const [result] = await db.execute(
        `INSERT INTO books (id, isbn, pages) VALUES (?, ?, ?)`,
        [material_id, isbn, pages]
    );
    return result.insertId;
};

// Encontrar o livro pelo ID do material.
export const findBookByMaterialId = async(material_id) =>{
    const [rows] = await db.execute(`SELECT * FROM books WHERE id = ?`, [material_id]);
    return rows[0];
};