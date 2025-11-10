'use client'
import {useState} from "react"
import ListProducts from "./components/listProducts/"
import FormSearchProducts from "./components/formSearchProducts/"
import ListSelectedProducts from "./components/listSelectedProducts"
import {SacoUi} from "./ui/SacoUi"

export default function Home() {

  const [products, setProducts] = useState([
    {nombre: "whiskas", peso: 10, precioPublico: 1000, precioComerciante: 900, preciox5sacos: 850, preciox10sacos: 800, preciox15sacos: 750 },
    {nombre: "pedigree", peso: 15, precioPublico: 1200, precioComerciante: 1100, preciox5sacos: 1050, preciox10sacos: 1000, preciox15sacos: 950 },
    {nombre: "dog chow", peso: 20, precioPublico: 1500, precioComerciante: 1400, preciox5sacos: 1350, preciox10sacos: 1300, preciox15sacos: 1250 }
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isListSelectedVisible, setIsListSelectedVisible] = useState(false);
  const [selectedPrices, setSelectedPrices] = useState({});

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
            newSelected.push({ product, quantity });
        }

        return newSelected;
    });
  };

  const handlePriceChange = (productName, newPrice) => {
    setSelectedPrices(prevPrices => ({
        ...prevPrices,
        [productName]: newPrice
    }));
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
                 selectedPrices={selectedPrices}
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
       <FormSearchProducts />
      </div>
    </div>
  );
}
