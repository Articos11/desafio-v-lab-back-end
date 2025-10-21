import db from "../config/database.js";

// Criação do material e inserção no banco de dados.
export const createMaterial = async(material) =>{
    const {title, description, status, author_id, user_id, material_type} = material;
        const [result] = await db.execute(
        `INSERT INTO materials (title, description, status, author_id, user_id, material_type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description || null, status, author_id, user_id, material_type]
    );

    return result.insertId;
};

// Encontrar o material pelo seu ID.
export const findMaterialById = async (id) => {
    const [rows] = await db.execute(
        "SELECT * FROM materials WHERE id = ?", 
        [id]
    );
    return rows[0];
};

// Busca o material por filtro e paginação. 
export const findMaterials = async (filters = {}, page = 1, limit = 10) => {
    let query = "SELECT * FROM materials WHERE 1=1"; 
    const params = []; 

    // Filtro por título
    if (filters.title) {
        query += " AND title LIKE ?"; 
        params.push(`%${filters.title}%`);
    }

    // Filtro por autor
    if (filters.author_id) {
        query += " AND author_id = ?";
        params.push(filters.author_id);
    }

    // Filtro por descrição
    if (filters.description) {
        query += " AND description LIKE ?";
        params.push(`%${filters.description}%`);
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, (page - 1) * limit);

    const [rows] = await db.execute(query, params);
    return rows;
};