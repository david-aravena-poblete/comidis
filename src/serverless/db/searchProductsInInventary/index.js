import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '@/serverless/config';

const db = getFirestore(app);

export const searchDocuments = async (valueToFind) => {
  try {
    const ingresosCol = collection(db, 'ingresos');
    
    const q = query(ingresosCol, where("initialsNames", 'array-contains', valueToFind));
    
    const querySnapshot = await getDocs(q);
    
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    
    return results;

  } catch (error) {
    console.log("Error al buscar en Firestore:", error.message);
    return [];
  }
};

