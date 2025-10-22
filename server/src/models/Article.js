import db from "../config/database.js";

// Validação de DOI
function isValidDOI(doi) {
  return /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(doi);
}

// Criação do artigo.
export const createArticle = async (material_id, doi) => {
    if (!doi) {
        console.error("DOI não enviado.");
        return;
    };
    if (!isValidDOI(doi)) {
        console.error("DOI inválido");
        return;
    }

    const [result] = await db.execute(
        `INSERT INTO articles (id, doi) VALUES (?, ?)`,
        [material_id, doi]
    );
    return result.insertId;
};

// Encontrando o artigo pelo ID do material. 
export const findArticleByMaterialId = async (material_id) => {
  const [rows] = await db.execute(`SELECT * FROM articles WHERE id = ?`, [material_id]);
  return rows[0];
};