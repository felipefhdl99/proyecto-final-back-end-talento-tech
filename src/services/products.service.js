import { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct } from '../models/products.model.js';

// Business logic, validation, error translation, data shaping
export const fetchAllProductsService = async () => {
    return await getAllProducts();
};

export const fetchProductByIdService = async (id) => {
    const product = await getProductById(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

export const createProductService = async (productData) => {
    if (!productData.id) {
        throw new Error('Product must have an id');
    }
    // Check for duplicate
    const existing = await getProductById(productData.id);
    if (existing) {
        throw new Error('Product with this ID already exists');
    }
    return await addProduct(productData);
};

export const deleteProductService = async (id) => {
    // Optionally check if product exists first
    return await deleteProduct(id);
};

export const updateProductService = async (id, productData) => {
    // Optionally check if product exists first
    return await updateProduct(id, productData);
};