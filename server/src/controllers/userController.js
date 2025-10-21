import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import {createUser, findUserByEmail, getAllUsers } from "../models/User.js"


export const registerUser = async (req, res) => {
    try {
        // Verificação para ver se os dados estão sendo propriamente passados.
        const {name, email, password} = req.body;
        if (!name || !email || !password) return res.status(400).json({message: "Todos os campos são obrigatórios."})

        // Verificação para ver se o email já existe.
        const existing = await findUserByEmail(email);
        if (existing) return res.status(409).json({message: "Já existe um usuário com este e-mail."})

        // Criptografando a senha do usuário para guarda-la no banco de dados.
        const passwordHash = await bcrypt.hash(password, 10);
        const userId = await createUser(name, email, passwordHash);

        res.status(201).json({message: "Usuário cadastrado com sucesso.", userId});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro interno ao registrar usuário"});
    }
};

export const loginUser = async (req, res) => {
    try {
        // Checamos se o usuário existe no banco de dados. Se não, ele não será logado.
        const {email, password} = req.body;
        const user = await findUserByEmail(email);

        if (!user) return res.status(401).json({message: "Credenciais inválidas."});

        // Se a senha do usuário estiver incorreta, ele não será logado.
        const passwordMatch = await bcrypt.compare(password, user.password_digest);
        if(!passwordMatch) return res.status(401).json({message: "Credenciais inválidas."});

        // Aqui estamos lidando com a criação do JWT e do Cookie para o usuário, que irão expirar em 7 dias.
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, { expiresIn: '7d'}); 

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: (7 * 24 * 60 * 60 * 1000)
        });

        res.json({message: "Login realizado com sucesso.", token})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro interno ao realizar login."});
    }
};

export const listUsers = async(req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erro ao listar usuários."});
    }
};