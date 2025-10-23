import db from "../config/database.js";
import jwt from "jsonwebtoken";

export async function clearUsers() {
  await db.query(
    "DELETE FROM users WHERE email IN (?, ?)",
    ["teste@teste.com", "outro@teste.com"]
  );
}

export async function clearMaterials() {
  await db.query("DELETE FROM materials");
}

export function getToken(id, email) {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
}
