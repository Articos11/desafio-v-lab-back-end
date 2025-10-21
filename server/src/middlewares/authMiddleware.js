import jwt from "jsonwebtoken";

// Autenticando se o usuário está de fato conectado.
export const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({message: "Token não fornecido"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({message: "Token inválido"});
    }
};