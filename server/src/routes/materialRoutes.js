import express from "express";
import { registerMaterial, listMaterials, getMaterialById, updateMaterial, deleteMaterial } from "../controllers/materialController.js";
import { authenticate } from "../middlewares/authMiddleware.js"

const router = express.Router();

// Apenas usuários autenticados, ou seja, logados, podem criar materiais.
router.post("/materials", authenticate, registerMaterial);
// Qualquer um pode consultar os materiais.
router.get("/materials", listMaterials);

// Retorna um material específico.
router.get("/materials/:id", getMaterialById);

// Atualiza um material.
router.put("/materials/:id", authenticate, updateMaterial);

// Deleta um material.
router.delete("/materials/:id", authenticate, deleteMaterial);

export default router;
