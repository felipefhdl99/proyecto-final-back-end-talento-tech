import express from 'express';

const router = express.Router();

import { fetchAllProducts, fetchProductById, createProductHandler, deleteProductHandler } from '../controllers/products.controller.js';
// Defino las rutas para los productos, pasándoles la ruta de mi API y el controlador correspondiente
// Cada ruta recibe los datos de la petición, los procesa y devuelve la respuesta al cliente

// Obtener todos los productos
router.get('/products', fetchAllProducts);
// Obtener un producto por ID
router.get('/products/:id', fetchProductById);
// Crear un nuevo producto
router.post('/products/create', createProductHandler);
// Eliminar un producto por ID
router.delete('/products/:id', deleteProductHandler);

export default router;