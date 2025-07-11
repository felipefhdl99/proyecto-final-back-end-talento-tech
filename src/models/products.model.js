// Este archivo contiene las funciones del modelo de productos, que interactúan con la base de datos Firestore.
import db from '../data/data.js'
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    setDoc
} from 'firebase/firestore';

// Referencia a la colección de productos en Firestore
const productsCollection = collection(db, 'products');

/**
 * Obtiene todos los productos de la base de datos
 * @returns {Promise<Array>} Lista de productos
 */
export const getAllProducts = async () => {
    const querySnapshot = await getDocs(productsCollection);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * Obtiene un producto por su ID
 * @param {string} id - ID del producto
 * @returns {Promise<Object|null>} Producto encontrado o null si no existe
 */
export const getProductById = async (id) => {
    const productDoc = doc(productsCollection, id);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
        return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
        return null; // No se lanza error, solo retorna null
    }
};

/**
 * Agrega un nuevo producto a la base de datos
 * @param {Object} product - Datos del producto
 * @returns {Promise<Object>} Producto agregado
 */
export const addProduct = async (product) => {
    await setDoc(doc(productsCollection, product.id), product);
    return { id: product.id, ...product };
};

/**
 * Elimina un producto por su ID
 * @param {string} id - ID del producto
 * @returns {Promise<Object>} ID del producto eliminado
 */
export const deleteProduct = async (id) => {
    await deleteDoc(doc(productsCollection, id));
    return { id };
};

/**
 * Actualiza un producto existente
 * @param {string} id - ID del producto
 * @param {Object} productData - Datos a actualizar
 * @returns {Promise<Object>} Producto actualizado
 */
export const updateProduct = async (id, productData) => {
    await updateDoc(doc(productsCollection, id), productData);
    return { id, ...productData };
};