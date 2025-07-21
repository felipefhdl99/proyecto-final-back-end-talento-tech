// Archivo principal de la aplicación Express
import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import process from 'process';

// Importa el middleware de autenticación y los routers
import { authentication } from './src/middlewares/authentication.js';
import authRouter from './src/routes/auth.routes.js';
import productRouter from './src/routes/products.routes.js';

// Obtiene el directorio actual (para módulos ES)
const __dirname = import.meta.dirname;

// Inicializa la aplicación Express
const app = express();

// Habilita CORS para permitir solicitudes de otros orígenes
app.use(cors());
// Permite recibir datos en formato JSON en las solicitudes
app.use(bodyParser.json());

// Middleware para registrar en consola cada solicitud recibida
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Rutas de autenticación (login)
app.use('/auth', authRouter);
// Rutas protegidas de productos, requieren autenticación
app.use('/api', authentication, productRouter);

// Middleware para manejar errores 404 (ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).send('Resource not found.');
});

// Define el puerto y levanta el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});