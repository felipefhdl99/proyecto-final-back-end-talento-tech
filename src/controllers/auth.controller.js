import { generateToken } from '../utils/token-generator.js';

// Usuario de ejemplo para autenticación
const default_user = {
    id: 1,
    email: "user@email.com",
    password: "strongPass123"
}

/**
 * Controlador para el login de usuario
 * @param {Request} req - Objeto de solicitud HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 */
export async function login(req, res) {
    const { email, password } = req.body;
    // Aquí deberías verificar las credenciales del usuario
    // Ejemplo de usuario autenticado
    const user = { id: 1, email };
    if (email === default_user.email && password === default_user.password) {
        // Si las credenciales son correctas, genera y retorna el token
        const token = generateToken(user);
        res.json({ token });
    } else {
        // Si las credenciales son incorrectas, retorna error 401
        res.sendStatus(401);
    }
}
