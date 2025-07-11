import jwt from 'jsonwebtoken';
import 'dotenv/config';
import process from 'process';

const secret_key = process.env.JWT_SECRET_KEY;

// Middleware para verificar el token JWT
export const authentication = (req, res, next) => {
    // Verifica si el token está presente en los headers
    const authorizationHeader = req.headers['authorization'];
    // Si no hay token, retorna un error 401 (Unauthorized)
    if (!authorizationHeader) return res.sendStatus(401);
    const token = authorizationHeader.split(" ")[1];
    // Verifica el token usando la clave secreta
    if (!token) return res.sendStatus(401);
    jwt.verify(token, secret_key, 
        (err) => {
        if (err) return res.sendStatus(403);
        next();
        }
    );
}
