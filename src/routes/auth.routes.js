// auth.routes.js
import express from 'express';
import { login } from '../controllers/auth.controller.js';

// Defino el router de autenticación
const router = express.Router();
// Ruta para iniciar sesión (login)
router.post('/login', login);

export default router;