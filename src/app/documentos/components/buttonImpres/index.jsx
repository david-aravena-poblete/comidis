import { useReactToPrint } from 'react-to-print';

export default function ButtonImpres({ targetRef }) {

    const handlePrint = useReactToPrint({
        content: () => targetRef.current,
    });

    return (
        <button
            onClick={handlePrint}
            style={{
                marginLeft:"10px",
                padding:"10px 20px",
                background:"#333",
                color:"white",
                border:"none",
                borderRadius:"5px",
                cursor:"pointer",
                fontWeight:"bold"
            }}
        >
            Imprimir
        </button>
    );
}
