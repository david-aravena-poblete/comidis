import ButtonSum from "./components/buttonSum/"

const ListProducts = ({products, Card, onQuantityChange, selectedProducts}) => {
    const listContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
    const productItemStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
    };

    return(
      <div style={listContainerStyle}>
        {products?.map((product) => (
          <div key={product.nombre} style={productItemStyle}>
            <div style={{flexGrow: 1}}>
              <Card product={product} />
            </div>
            <ButtonSum
              product={product}
              onQuantityChange={onQuantityChange}
              quantity={selectedProducts.find(p => p.product.nombre === product.nombre)?.quantity || 0}
            />
          </div>
        ))}
      </div>
    )
}

export default ListProducts;