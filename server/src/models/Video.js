import db from "../config/database.js";

// Criando o video.
export const createVideo = async (material_id, duration_minutes) => {
  if (!duration_minutes || duration_minutes <= 0 || !Number.isInteger(duration_minutes)) {
    console.error("Duração do vídeo inválida");
    return;
  }

  const [result] = await db.execute(
    `INSERT INTO videos (id, duration_minutes) VALUES (?, ?)`,
    [material_id, duration_minutes]
  );
  return result.insertId;
};

// Encontrando o vídeo pelo ID do material.
export const findVideoByMaterialId = async (material_id) => {
  const [rows] = await db.execute(`SELECT * FROM videos WHERE id = ?`, [material_id]);
  return rows[0];
};
