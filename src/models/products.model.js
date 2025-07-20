// Este archivo contiene las funciones del modelo de productos, que interactúan con la base de datos Firestore.
import db from '../data/products.data.js'
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    setDoc,
    where,
    query,
    DocumentReference
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

export const getProductId = async (productId) => {
    try {
        const q = query(productsCollection, where('id', '==', productId));
        console.log('Query:', q);
        const querySnapshot = await getDocs(q);
        console.log('Query Snapshot:', querySnapshot);
        if (querySnapshot.empty) {
            return null; // No se encontró el producto
        }
        // Retorna el ID del documento en Firestore
        return querySnapshot.docs[0].id;
    } catch (error) {
        console.error('Error getting Firestore doc ID for product ID:', error);
        return null;
    }
};

/**
 * Obtiene un producto por su ID de firestore
 * @param {string} id - ID del producto
 * @returns {Promise<Object|null>} Producto encontrado o null si no existe
 */
export const getProductById = async (firestoreId) => {
    try {
        const docRef = doc(productsCollection, firestoreId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return null; // No se encontró el producto
        }

        return { firestoreId: docSnap.id, ...docSnap.data() }; // Incluye el doc ID en el resultado
    } catch (error) {
        console.error('Error getting product by Firestore ID:', error);
        return null;
    }
};

/**
 * Agrega un nuevo producto a la base de datos
 * @param {Object} productData - Datos del producto
 * @returns {Promise<Object>} Producto agregado
 */
export const addProduct = async (productData) => {
    // Retorna el producto con su ID
    try {
        const docRef = await addDoc(productsCollection, productData);
        return { firestoreId: docRef.id, ...productData };
    } catch (error) {
        console.error('Error adding product:', error);
    }
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

// /**
//  * Actualiza un producto existente
//  * @param {string} id - ID del producto
//  * @param {Object} productData - Datos a actualizar
//  * @returns {Promise<Object>} Producto actualizado
//  */
// export const updateProduct = async (id, productData) => {
//     await updateDoc(doc(productsCollection, id), productData);
//     return { id, ...productData };
// };