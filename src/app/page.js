'use client'
import {useState} from "react"
import ListProducts from "./components/listProducts/"
import FormSearchProducts from "./components/formSearchProducts/"
import ListSelectedProducts from "./components/listSelectedProducts"
import {SacoUi} from "./ui/SacoUi"

export default function Home() {

  const [products, setProducts] = useState([
    {nombre: "whiskas", peso: 10, precioPublico: 1000 },
    {nombre: "pedigree", peso: 15, precioPublico: 1200 },
    {nombre: "dog chow", peso: 20, precioPublico: 1500 }
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  console.log(selectedProducts)

  const handleQuantityChange = (product, newQuantity) => {
    const quantity = Math.max(0, newQuantity);
    setSelectedProducts(prevSelected => {
        const existingProductIndex = prevSelected.findIndex(
            item => item.product.nombre === product.nombre
        );

        if (existingProductIndex > -1) {
            const updatedSelected = [...prevSelected];
            updatedSelected[existingProductIndex] = { ...updatedSelected[existingProductIndex], quantity };
            return updatedSelected.filter(item => item.quantity > 0); // Opcional: remover si la cantidad es 0
        } else if (quantity > 0) {
            return [...prevSelected, { product, quantity }];
        }
        return prevSelected;
    });
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
           <h1>Productos Disponibles</h1>
           <ListProducts 
            products={products} 
            Card={SacoUi} 
            onQuantityChange={handleQuantityChange} 
            selectedProducts={selectedProducts}
           />
           <ListSelectedProducts 
            selectedProducts={selectedProducts} 
            Card={SacoUi} 
            onQuantityChange={handleQuantityChange}
           />
      </div>
      <div style={{padding:"1rem"}}>
       <FormSearchProducts />
      </div>
    </div>
  );
}
