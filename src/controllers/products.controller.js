// Importo las funciones del modelo de productos
import { fetchAllProductsService, fetchProductByIdService, createProductService, deleteProductService } from '../services/products.service.js';

// Defino las funciones del controlador de productos
// Estas funciones se encargan de manejar las peticiones HTTP y llamar a los modelos correspondientes

/**
 * Obtiene todos los productos y los retorna en formato JSON
 * @param {Request} req - Objeto de solicitud HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 */
export const fetchAllProducts = async (req, res) => {
    try {
        // Llama al modelo para obtener todos los productos
        const products = await fetchAllProductsService();
        // Responde con el listado de productos
        res.status(200).json(products);
    } catch (error) {
        // Manejo de errores
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

/**
 * Obtiene un producto por su ID y lo retorna en formato JSON
 * @param {Request} req - Objeto de solicitud HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 */
export const fetchProductById = async (req, res) => {
    const { id } = req.params;
    try {
        // Llama al modelo para obtener el producto por ID
        const product = await fetchProductByIdService(id);
        // Responde con el producto encontrado
        res.status(200).json(product);
    } catch (error) {
        // Manejo de errores si el producto no existe
        console.error('Error fetching product:', error);
        res.status(404).json({ error: 'Product not found' });
    }
};

/**
 * Crea un nuevo producto con los datos recibidos en el body
 * @param {Request} req - Objeto de solicitud HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 */
export const createProductHandler = async (req, res) => {
    try {
        // Llama al modelo para agregar el producto
        const addedProduct = await createProductService(req.body);
        // Responde con el producto agregado
        res.status(201).json(addedProduct);
    } catch (error) {
        // Manejo de errores
        console.error('Error adding product:', error);
        res.status(500).json({ error:  `Failed to add product: ${error}`});
    }
};

/**
 * Elimina un producto por su ID
 * @param {Request} req - Objeto de solicitud HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 */
export const deleteProductHandler = async (req, res) => {
    const { id } = req.params;
    try {
        // Llama al modelo para eliminar el producto
        const firestoreId = await deleteProductService(id);
        // Responde con mensaje de éxito
        res.status(200).json({ message: `Product with firestore ID ${firestoreId} deleted successfully`});
    } catch (error) {
        // Manejo de errores
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};