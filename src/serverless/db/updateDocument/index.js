import { doc, updateDoc, getFirestore } from "firebase/firestore";
import app from '@/serverless/config'


const db = getFirestore(app);


export const updateFirebaseDocument = async (collectionName, docId, changedFields) => {
    try {
      const docRef = doc(db, collectionName, docId);
  
      await updateDoc(docRef, changedFields);
  
      console.log("Documento actualizado en Firestore:", changedFields);
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
  };
  