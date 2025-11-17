import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import app from '../../config';

const db = getFirestore(app);

export const createDocument = async (pedido, cliente) => {
  try {
    if (!Array.isArray(pedido) || pedido.length === 0) {
      throw new Error("El pedido debe ser un array con al menos un producto.");
    }

    const docRef = await addDoc(collection(db, "pedidos"), {
      client: cliente,
      products: pedido,
      createdAt: serverTimestamp()
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: error.message };
  }
};
