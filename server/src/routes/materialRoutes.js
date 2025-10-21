import express from "express";
import { registerMaterial, listMaterials, getMaterialById } from "../controllers/materialController.js";
import { authenticate } from "../middlewares/authMiddleware.js"

const router = express.Router();

// Apenas usuários autenticados, ou seja, logados, podem criar materiais.
router.post("/materials", authenticate, registerMaterial);
// Qualquer um pode consultar os materiais.
router.get("/materials", listMaterials);

router.get("/materials/:id", getMaterialById);
export default router;
