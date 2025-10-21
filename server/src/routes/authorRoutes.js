import express from "express";
import { registerAuthor, listAuthors, getAuthorById } from "../controllers/authorController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/authors", authenticate, registerAuthor);
router.get("/authors", listAuthors);
router.use("/authors/:id", getAuthorById);

export default router;

