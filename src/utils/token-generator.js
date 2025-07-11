import jwt from 'jsonwebtoken';
import 'dotenv/config';
import process from 'process';

// Clave secreta para firmar el token JWT
const secret_key = process.env.JWT_SECRET_KEY;

/**
 * Función para generar un token JWT
 * @param {Object} userData - Datos del usuario (id, email)
 * @returns {string} Token JWT generado
 */
export const generateToken = (userData) => {
    const user = {id: userData.id, email: userData.email};
    const expiration = { expiresIn: '1h' };
    return jwt.sign(user, secret_key, expiration);
}
