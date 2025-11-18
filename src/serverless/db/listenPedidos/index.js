import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import app from '../../config';

const db = getFirestore(app);

export const listenPedidos = (callback) => {
  const pedidosCol = collection(db, 'pedidos');
  
  const unsubscribe = onSnapshot(pedidosCol, (snapshot) => {
    const pedidos = [];
    snapshot.forEach((doc) => {
      pedidos.push({ id: doc.id, ...doc.data() });
    });
    callback(pedidos);
  });

  return unsubscribe;
};
