'use client'
import { useState, useEffect } from 'react';
import { listenPedidos } from '../../serverless/db/listenPedidos';
import LoadingSpinner from '../components/loading';

const PhoneNumberSelection = ({ pedido, totalPedido, onSelect, onCancel }) => {
    const phoneNumbers = [{user:'david', phone: '56990059578'}, {user:'israel', phone: '56981249214'}, {user: 'jc', phone: '56973894350'}];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    };

    const handleSelectPhone = (phone) => {
        let message = `*Nuevo Pedido*\n\n`;
        message += `*Cliente:* \n ${pedido.client}\n\n`;
        message += `*Detalle del pedido:*\n`;
    
        pedido.products.forEach(item => {
            const totalItem = formatCurrency(item.quantity * item.product.selectedPrice.price);
            message += `${item.quantity}x ${item.product.nombre} ${item.product.peso}Kg - ${totalItem}\n\n`;
        });
    
        message += `*Total Pedido:* \n ${formatCurrency(totalPedido)}`;
    
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone.phone}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        onSelect();
    };
    

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#333' }}>Seleccionar número de teléfono</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
                    {phoneNumbers.map((phone, index) => (
                        <li key={index} onClick={() => handleSelectPhone(phone)} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px', cursor: 'pointer' }}>
                            <div>
                                <p>{phone.user}</p>
                            </div>
                            <div>
                                <p>{phone.phone}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={onCancel} style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>
            </div>
        </div>
    );
};

export default function ListDocuments() {
    const [pedidos, setPedidos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showPhoneSelection, setShowPhoneSelection] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    useEffect(() => {
        const unsubscribe = listenPedidos((newPedidos) => {
            setPedidos(newPedidos);
            setIsLoading(false);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    };

    const handleOpenWhatsApp = (pedido) => {
        setSelectedPedido(pedido);
        setShowPhoneSelection(true);
    };

    const handleClosePhoneSelection = () => {
        setShowPhoneSelection(false);
        setSelectedPedido(null);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f2f5', width:"100vw" }}>
           {isLoading && <LoadingSpinner />}
            <h1 style={{ color: '#333', borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>Lista de Pedidos</h1>
            {pedidos.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>No hay pedidos para mostrar.</p>
            ) : (
                <div style={{ width:"100%", display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
                    {pedidos.map((pedido) => {
                        const totalPedido = (pedido.products || []).reduce((acc, item) => acc + (item.quantity * item.product.selectedPrice.price), 0);

                        return (
                            <div key={pedido.id} style={{ width:"100%",background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                <h2 style={{ color: '#0056b3', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Pedido: {pedido.client}</h2>

                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                                            <th style={{ padding: '4px', border: '1px solid #ddd', textAlign: 'left' }}>Cant.</th>
                                            <th style={{ padding: '4px', border: '1px solid #ddd', textAlign: 'left' }}>Detalle</th>
                                            <th style={{ padding: '4px', border: '1px solid #ddd', textAlign: 'right' }}>Unitario</th>
                                            <th style={{ padding: '4px', border: '1px solid #ddd', textAlign: 'right' }}>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(pedido.products || []).map((item, index) => (
                                            <tr key={index}>
                                                <td style={{ padding: '4px', border: '1px solid #ddd' }}>{item.quantity}</td>
                                                <td style={{ padding: '4px', border: '1px solid #ddd' }}>{`${item.product.nombre} ${item.product.peso}Kg`}</td>
                                                <td style={{ padding: '4px', border: '1px solid #ddd', textAlign: 'right' }}>{formatCurrency(item.product.selectedPrice.price)}</td>
                                                <td style={{ padding: '4px', border: '1px solid #ddd', textAlign: 'right' }}>{formatCurrency(item.product.selectedPrice.price * item.quantity)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.2em', color: '#333', marginTop: '15px' }}>
                                    Total Pedido: {formatCurrency(totalPedido)}
                                </div>

                                <div style={{display:"flex", justifyContent:"flex-end", padding:"1rem"}}>
                                    <button 
                                        onClick={() => handleOpenWhatsApp(pedido)} 
                                        style={{
                                            padding:'10px 20px', 
                                            backgroundColor: '#25D366', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        Enviar por WhatsApp
                                    </button>
                                </div> 
                            </div>
                        )
                    })}
                </div>
            )}
            {showPhoneSelection && selectedPedido && (
                <PhoneNumberSelection
                    pedido={selectedPedido}
                    totalPedido={(selectedPedido.products || []).reduce((acc, item) => acc + (item.quantity * item.product.selectedPrice.price), 0)}
                    onSelect={handleClosePhoneSelection}
                    onCancel={handleClosePhoneSelection}
                />
            )}
        </div>
    );
}
