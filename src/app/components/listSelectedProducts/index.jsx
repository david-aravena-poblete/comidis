import ButtonSumRest from "./components/buttonSumRest";

const ListSelectedProducts = ({ selectedProducts, Card, onQuantityChange }) => {
    const listContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '2rem',
      paddingTop: '1rem',
     borderTop: '1px solid #eee'
   };

    const productItemStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
    };

    const totalStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: '1rem'
    };

    const selectedProductArray = selectedProducts.filter(p => p.quantity > 0);

    const totalPrice = selectedProductArray.reduce((total, { product, quantity }) => {
        return total + (product.precioPublico * quantity);
    }, 0);

    if (selectedProductArray.length === 0) {
        return null; // No mostrar nada si no hay productos seleccionados
    }

    return (
            <div>
                <h2>Productos Seleccionados</h2>
                <div style={listContainerStyle}>
                    {selectedProductArray.map(({ product, quantity }) => (
                        <div key={product.nombre} style={productItemStyle}>
                            <div style={{flexGrow: 1}}>
                                <Card product={product} />
                            </div>
                            <ButtonSumRest 
                                product={product} 
                                onQuantityChange={onQuantityChange} 
                                quantity={quantity}
                            />
                        </div>
                    ))}
                </div>
                <div style={totalStyle}>
                    Total: ${totalPrice}
                </div>
            </div>
        );
    };
    
    export default ListSelectedProducts;