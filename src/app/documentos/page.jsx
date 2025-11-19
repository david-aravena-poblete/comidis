'use client'
import { useState, useEffect } from 'react';
import { listenPedidos } from '../../serverless/db/listenPedidos';

export default function ListDocuments() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const unsubscribe = listenPedidos((newPedidos) => {
            setPedidos(newPedidos);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f2f5', width:"100vw" }}>
            <h1 style={{ color: '#333', borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>Lista de Pedidos</h1>
            {pedidos.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>No hay pedidos para mostrar.</p>
            ) : (
                <div style={{ width:"100%", display: 'grid', gridTemplateColumns: 'repeat(auto-fill)', gap: '20px' }}>
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
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}
