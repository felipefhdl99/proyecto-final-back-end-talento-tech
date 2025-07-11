import express from 'express';

const router = express.Router();

import { fetchAllProducts, fetchProductById, createProductHandler, deleteProductHandler } from '../controllers/products.controller.js';
// Defino las rutas para los productos, pasandole la ruta de mi API y el controlador correspondiente
// Que recive los datos de la peticion y los procesa
// y devuelve la respuesta al cliente
router.get('/products', fetchAllProducts);
router.get('/products/:id', fetchProductById);
router.post('/products/create', createProductHandler);
router.delete('/products/:id', deleteProductHandler);

export default router;