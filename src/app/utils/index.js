import {updateAmount} from "@/serverless/db/createPedido"
import {createDocument} from "@/serverless/db/createDocument/"

export const getNewPedido = async (newPedido, cliente) => {
    console.log(newPedido)
    try {
      if (!Array.isArray(newPedido)) {
      return { success: false, error: "newPedido must be an array" };
    }
    const updatePromises = newPedido.map(pedido => {
      if (!pedido.product.id || typeof pedido.quantity !== 'number') {
        return Promise.reject(new Error('Each item in newPedido must have an id and a numeric monto.'));
      }
      return updateAmount(pedido.product.id, pedido.quantity);
    });
    const results = await Promise.all(updatePromises);
    await createDocument(newPedido, cliente)
    const failedUpdates = results.filter(result => !result.success);
    if (failedUpdates.length > 0) {
      return { success: false, message: 'Some updates failed', errors: failedUpdates };
    }
    
    return { success: true, message: 'All pedidos processed successfully' };
  } catch (error) {
    console.error("Error processing new pedido:", error);
    return { success: false, error: error.message };
  }
};
