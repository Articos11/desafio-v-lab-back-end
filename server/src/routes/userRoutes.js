import express from "express";
import { registerUser, loginUser, listUsers, } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", listUsers);

export default router;