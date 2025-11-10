export const SacoUi = ({product}) => {
    // Define tus estilos como un objeto de JavaScript
    const cardStyle = {
        border: "1px solid #ddd",
        padding: "16px",
        margin: "0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "sans-serif",
    };

    const paragraphStyle = {
        margin: "8px 0",
        color: "#333",
        fontSize: "1rem"
    };

    const labelStyle = {
        fontWeight: "bold"
    }

    const priceStyle = {
        fontWeight: "bold",
        color: "#0070f3",
        fontSize: "1.2rem",
        marginTop: "12px"
    };

    return(
        <div style={cardStyle}>
            <p style={paragraphStyle}><span style={labelStyle}>Nombre:</span> {product.nombre}</p>
            <p style={paragraphStyle}><span style={labelStyle}>Peso:</span> {product.peso}</p>
            <p style={priceStyle}><span style={labelStyle}>Precio:</span> ${product.precioPublico}</p>
        </div>
    )
}