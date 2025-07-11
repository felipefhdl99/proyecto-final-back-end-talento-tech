import { getAllProducts, getProductById, addProduct, deleteProduct } from '../models/products.model.js';


// Defino las funciones del controlador de productos
// Estas funciones se encargan de manejar las peticiones HTTP y llamar a los modelos correspondientes
export const fetchAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const fetchProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(404).json({ error: 'Product not found' });
    }
};

export const createProductHandler = async (req, res) => {
    try {
        const addedProduct = await addProduct(req.body);
        res.status(201).json(addedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error:  `Failed to add product: ${error}`});
    }
};

export const deleteProductHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProduct(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};