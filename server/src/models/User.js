import db from "../config/database.js";

// Criação do usuário.
export const createUser = async (name, email, passwordHash) => {
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password_digest) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );
  return result.insertId;
};

// Procura do usuário por email.
export const findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// retorno de todos os usuários.
export const getAllUsers = async () => {
  const [rows] = await db.execute("SELECT id, name, email FROM users");
  return rows;
};
