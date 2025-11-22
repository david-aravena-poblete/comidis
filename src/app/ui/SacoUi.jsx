import styles from './SacoUi.module.css';

export const SacoUi = ({product, children}) => {
    const paragraphStyle = {
        margin: "8px 0",
        color: "#333",
        fontSize: "1rem"
    };

    const labelStyle = {
        fontWeight: "bold"
    }

    return(
        <div className={styles.card} key={product.id}>
            <div className={styles.info}>
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