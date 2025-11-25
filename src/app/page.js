'use client'
import {useState} from "react"
import ListProducts from "./components/listProducts/"
import FormSearchProducts from "./components/formSearchProducts/"
import ListSelectedProducts from "./components/listSelectedProducts"
import {getNewPedido} from './utils/'
import {SacoUi} from "./ui/SacoUi"
import LoadingSpinner from "./components/loading"

export default function Home() {

  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isListSelectedVisible, setIsListSelectedVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const handleQuantityChange = (product, newQuantity) => {
    const quantity = Math.max(0, newQuantity);

    setSelectedProducts(prevSelected => {
        const existingProductIndex = prevSelected.findIndex(
            item => item.product.id === product.id
        );

        const newSelected = [...prevSelected];

        if (existingProductIndex > -1) {
            if (quantity > 0) {
                newSelected[existingProductIndex].quantity = quantity;
            } else {
                newSelected.splice(existingProductIndex, 1);
            }
        } else if (quantity > 0) {
            const initialPriceType = 'precioPublico';
            const initialPriceValue = product[initialPriceType];
            newSelected.push({ 
                product: { 
                    ...product, 
                    selectedPrice: { 
                        type: initialPriceType, 
                        price: initialPriceValue 
                    } 
                }, 
                quantity 
            });
        }

        return newSelected;
    });
  };

  const handlePriceChange = (productId, newPriceObject) => {
    setSelectedProducts(prevSelected =>
      prevSelected.map(item =>
        item.product.id === productId
          ? {
              ...item,
              product: {
                ...item.product,
                selectedPrice: newPriceObject,
              },
            }
          : item
      )
    );
  };

  const handleRemoveProduct = (productToRemove) => {
    if (window.confirm(`¿Estás seguro de que quieres quitar ${productToRemove.nombre} de la lista?`)) {
      handleQuantityChange(productToRemove, 0);
    }
  };

  const handlerCrearPedido = async () => {
    const response = prompt("¿Para quién es este pedido?");
    if (response) {
      setIsCreatingOrder(true);
      try {
        const result = await getNewPedido(selectedProducts, response)
        console.log(result)
        alert('Pedido creado con éxito!');
        setSelectedProducts([]); // Clear the cart
        setIsListSelectedVisible(false); // Go back to product list
      } catch (error) {
        console.error("Error al crear el pedido:", error);
        alert("Hubo un error al crear el pedido. Por favor, inténtalo de nuevo.");
      } finally {
        setIsCreatingOrder(false);
      }
    }
  }

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

  return (
    <div style={{
      width:"100%",
      height:"100%",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      padding:"1rem 0",
      overflowY:"auto",
    }}>
      {isCreatingOrder && <LoadingSpinner />}
      <div style={{flexGrow:1, overflowY:"auto", marginBottom:"3rem"}}>
           {isListSelectedVisible ? (
             <>
                <button style={buttonStyle} onClick={() => setIsListSelectedVisible(false)}>Volver a Productos</button>
                <ListSelectedProducts 
                 selectedProducts={selectedProducts} 
                 Card={SacoUi} 
                 onQuantityChange={handleQuantityChange}
                 onPriceChange={handlePriceChange}
                 onRemoveProduct={handleRemoveProduct}
                 handlerCrearPedido={handlerCrearPedido}
                />
             </>
           ) : (
             <>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h1>Productos Disponibles</h1>
                 <button style={buttonStyle} onClick={() => setIsListSelectedVisible(true)}>
                    Ver Seleccionados ({selectedProducts.reduce((acc, item) => acc + item.quantity, 0)})
                 </button>
               </div>
                {isLoading ? (
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"50vh"}}><LoadingSpinner /></div>
                ) : (
                    <ListProducts 
                        products={products} 
                        Card={SacoUi} 
                        onQuantityChange={handleQuantityChange} 
                        selectedProducts={selectedProducts}
                    />
                )}
             </>
           )}
      </div>
      {!isListSelectedVisible && (
        <div style={{padding:"1rem 0", width:"100%", position:"fixed", bottom:0}}>
          <FormSearchProducts onSearchResults={setProducts} setIsLoading={setIsLoading} />
        </div>
      )}
    </div>
  );
}
