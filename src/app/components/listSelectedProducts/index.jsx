import ButtonSumRest from "./components/buttonSumRest";
import PriceSelector from "../priceSelector";
import styles from './listSelectedProducts.module.css';

const ListSelectedProducts = ({ selectedProducts, Card, onQuantityChange, onPriceChange, onRemoveProduct, handlerCrearPedido }) => {

    const selectedProductArray = selectedProducts.filter(p => p.quantity > 0);

    const totalPrice = selectedProductArray.reduce((total, { product, quantity }) => {
        const price = product.selectedPrice ? product.selectedPrice.price : product.precioPublico;
        return total + (price * quantity);
    }, 0);

    if (selectedProductArray.length === 0) {
        return null; // No mostrar nada si no hay productos seleccionados
    }

    return (
        <div>
            <div className={styles.header}>
                <h2>Productos Seleccionados</h2>
            </div>
            <div className={styles.total}>
                Total General: ${totalPrice.toFixed(2)}
            </div>
            <div className={styles.listContainer}>
                {selectedProductArray.map(({ product, quantity }) => {
                    const price = product.selectedPrice ? product.selectedPrice.price : product.precioPublico;
                    const subtotal = price * quantity;

                    return (
                        <div key={product.id}>
                            <Card product={product}>
                                <PriceSelector
                                    product={product}
                                    selectedPrice={product.selectedPrice || { type: 'precioPublico', price: product.precioPublico }}
                                    onPriceChange={onPriceChange}
                                />
                                <div style={{textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                    <ButtonSumRest
                                        product={product}
                                        onQuantityChange={onQuantityChange}
                                        quantity={quantity}
                                    />
                                    <p className={styles.totalProduct}>
                                        Subtotal: ${subtotal.toFixed(2)}
                                    </p>
                                    <button onClick={() => onRemoveProduct(product)} className={styles.removeButton}>
                                        Quitar
                                    </button>
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>

            <div className={styles.header} style={{margin:"1rem 0"}}>
                <button className={styles.createOrderButton} onClick={handlerCrearPedido}>Crear pedido</button>
            </div>
            
        </div>
    );
};

export default ListSelectedProducts;