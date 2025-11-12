
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import app from '../../config';

const db = getFirestore(app);

export const updateAmount = async (id, monto) => {
  try {
    const docRef = doc(db, 'ingresos', id);

    await updateDoc(docRef, {
      amount: increment(-monto)
    });

    return { success: true, message: `Amount updated for document ${id}` };
  } catch (error) {
    console.error("Error updating document:", error);
    return { success: false, error: error.message };
  }
};
