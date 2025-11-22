import ButtonSum from "./components/buttonSum/"

const ListProducts = ({products, Card, onQuantityChange, selectedProducts}) => {
    const listContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
    const productItemStyle = {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        gap: '1rem'
    };

    const priceStyle = {
      fontWeight: "bold",
      color: "#0070f3",
      fontSize: "1.2rem",
      marginTop: "12px"
  };

  const labelStyle = {
    fontWeight: "bold"
  }

  if (products?.length === 0){
     return(
      <h2> No se encontraron productos que coincidan </h2>
    )
  }

    return(
      <div style={listContainerStyle}>
        {products?.map((product) => (
          <div key={product.id} style={productItemStyle}>
            <div style={{flexGrow: 1}}>
              <Card product={product}>
                <p style={priceStyle}><span style={labelStyle}>Precio:</span> ${product.precioPublico}</p>
                <div style={{textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <ButtonSum
                    product={product}
                    onQuantityChange={onQuantityChange}
                    quantity={selectedProducts.find(p => p.product.id === product.id)?.quantity || 0}
                  />
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    )
}

export default ListProducts;