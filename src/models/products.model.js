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

const productsCollection = collection(db, 'products');
// This file contains the model functions for products, which interact with the Firestore database.

export const getAllProducts = async () => {
    const querySnapshot = await getDocs(productsCollection);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const getProductById = async (id) => {
    const productDoc = doc(productsCollection, id);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
        return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
        return null; // No error thrown here, just return null
    }
};

export const addProduct = async (product) => {
    await setDoc(doc(productsCollection, product.id), product);
    return { id: product.id, ...product };
};

export const deleteProduct = async (id) => {
    await deleteDoc(doc(productsCollection, id));
    return { id };
};

export const updateProduct = async (id, productData) => {
    await updateDoc(doc(productsCollection, id), productData);
    return { id, ...productData };
};