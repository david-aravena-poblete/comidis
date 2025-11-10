export const SacoUi = ({product, children}) => {
    // Define tus estilos como un objeto de JavaScript
    const cardStyle = {
        width:"100%",
        border: "1px solid #ddd",
        padding: "16px",
        margin: "0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "sans-serif",
        display:"flex",
        justifyContent:"space-between"
    };

    const paragraphStyle = {
        margin: "8px 0",
        color: "#333",
        fontSize: "1rem"
    };

    const labelStyle = {
        fontWeight: "bold"
    }

   

    return(
        <div style={cardStyle}>
            <div>
                <p style={paragraphStyle}><span style={labelStyle}>Nombre:</span> {product.nombre}</p>
                <p style={paragraphStyle}><span style={labelStyle}>Peso:</span> {product.peso}</p>
                {children[0]}
            </div>
            <div>
                {children[1]}
            </div>

        </div>
    )
}