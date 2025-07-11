import { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct } from '../models/products.model.js';

// Este archivo contiene la lógica de negocio, validaciones y transformación de datos para productos

/**
 * Servicio para obtener todos los productos
 * @returns {Promise<Array>} Lista de productos
 */
export const fetchAllProductsService = async () => {
    return await getAllProducts();
};

/**
 * Servicio para obtener un producto por ID
 * @param {string} id - ID del producto
 * @returns {Promise<Object>} Producto encontrado
 * @throws {Error} Si el producto no existe
 */
export const fetchProductByIdService = async (id) => {
    const product = await getProductById(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

/**
 * Servicio para crear un nuevo producto
 * @param {Object} productData - Datos del producto
 * @returns {Promise<Object>} Producto creado
 * @throws {Error} Si falta el ID o si ya existe un producto con ese ID
 */
export const createProductService = async (productData) => {
    if (!productData.id) {
        throw new Error('Product must have an id');
    }
    // Verifica si ya existe un producto con ese ID
    const existing = await getProductById(productData.id);
    if (existing) {
        throw new Error('Product with this ID already exists');
    }
    return await addProduct(productData);
};

/**
 * Servicio para eliminar un producto por ID
 * @param {string} id - ID del producto
 * @returns {Promise<Object>} Producto eliminado
 */
export const deleteProductService = async (id) => {
    // Opcionalmente verifica si el producto existe primero
    return await deleteProduct(id);
};

/**
 * Servicio para actualizar un producto existente
 * @param {string} id - ID del producto
 * @param {Object} productData - Datos a actualizar
 * @returns {Promise<Object>} Producto actualizado
 */
export const updateProductService = async (id, productData) => {
    // Opcionalmente verifica si el producto existe primero
    return await updateProduct(id, productData);
};