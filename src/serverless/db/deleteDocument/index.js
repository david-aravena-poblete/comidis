import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import app from '@/serverless/config';

const db = getFirestore(app);

export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return { success: true };
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}: `, error);
    return { success: false, error: error.message };
  }
};
