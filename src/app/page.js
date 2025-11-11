'use client'
import {useState} from "react"
import ListProducts from "./components/listProducts/"
import FormSearchProducts from "./components/formSearchProducts/"
import ListSelectedProducts from "./components/listSelectedProducts"
import {SacoUi} from "./ui/SacoUi"

export default function Home() {

  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isListSelectedVisible, setIsListSelectedVisible] = useState(false);

  const handleQuantityChange = (product, newQuantity) => {
    const quantity = Math.max(0, newQuantity);

    setSelectedProducts(prevSelected => {
        const existingProductIndex = prevSelected.findIndex(
            item => item.product.nombre === product.nombre
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

  const handlePriceChange = (productName, newPriceObject) => {
    setSelectedProducts(prevSelected =>
      prevSelected.map(item =>
        item.product.nombre === productName
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
      width:"100vw",
      minHeight:"100vh",
      display:"flex",
      flexDirection:"column",
      padding:"1rem"
    }}>
      <div style={{flexGrow:1, overflowY:"auto", padding: "0 1rem"}}>
           {isListSelectedVisible ? (
             <>
                <button style={buttonStyle} onClick={() => setIsListSelectedVisible(false)}>Volver a Productos</button>
                <ListSelectedProducts 
                 selectedProducts={selectedProducts} 
                 Card={SacoUi} 
                 onQuantityChange={handleQuantityChange}
                 onPriceChange={handlePriceChange}
                 onRemoveProduct={handleRemoveProduct}
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
               <ListProducts 
                products={products} 
                Card={SacoUi} 
                onQuantityChange={handleQuantityChange} 
                selectedProducts={selectedProducts}
               />
             </>
           )}
      </div>
      <div style={{padding:"1rem"}}>
       <FormSearchProducts onSearchResults={setProducts} />
      </div>
    </div>
  );
}
