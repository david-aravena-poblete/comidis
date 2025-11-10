import ButtonSumRest from "./components/buttonSumRest";
import PriceSelector from "../priceSelector";

const ListSelectedProducts = ({ selectedProducts, Card, onQuantityChange, onPriceChange, selectedPrices }) => {
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
        alignItems: 'stretch',
        justifyContent: 'space-between',
        gap: '1rem'
    };

    const totalStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: '1rem'
    };

    const buttonStyle = {
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginBottom: '1rem'
    };

    const totalProductStyle = {
        marginTop: '10px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#0070f3'
    };

    const selectedProductArray = selectedProducts.filter(p => p.quantity > 0);

    const totalPrice = selectedProductArray.reduce((total, { product, quantity }) => {
        const price = product[selectedPrices[product.nombre] || 'precioPublico'];
        return total + (price * quantity);
    }, 0);

    if (selectedProductArray.length === 0) {
        return null; // No mostrar nada si no hay productos seleccionados
    }

    return (
            <div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <h2>Productos Seleccionados</h2>
                    <button style={buttonStyle}>Crear pedido</button>
                </div>
                <div style={listContainerStyle}>
                    {selectedProductArray.map(({ product, quantity }) => {
                        const price = product[selectedPrices[product.nombre] || 'precioPublico'];
                        const subtotal = price * quantity;

                        return (
                        <div key={product.nombre} style={productItemStyle}>
                            <div style={{flexGrow: 1}}>
                                <Card product={product}>
                                    <PriceSelector
                                        product={product}
                                        selectedPrice={selectedPrices[product.nombre] || 'precioPublico'}
                                        onPriceChange={onPriceChange}
                                    />
                                    <div style={{textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                        <ButtonSumRest
                                            product={product}
                                            onQuantityChange={onQuantityChange}
                                            quantity={quantity}
                                        />
                                        <p style={totalProductStyle}>
                                            Subtotal: ${subtotal.toFixed(2)}
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )})}
                </div>
                <div style={totalStyle}>
                    Total General: ${totalPrice.toFixed(2)}
                </div>
            </div>
        );
    };

    export default ListSelectedProducts;