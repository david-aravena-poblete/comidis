import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import app from '@/serverless/config';
import { generateInitials } from './utils';

const db = getFirestore(app);

export const addDocument = async (collectionName, data) => {
  try {
    let dataToSave = { ...data };

    if (collectionName === 'ingresos' && data.nombre) {
      dataToSave.initialsNames = generateInitials(data.nombre);
    }

    const docRef = await addDoc(collection(db, collectionName), {
      ...dataToSave,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};
