'use client'

import { useState } from 'react';
import { getQueryUser } from './utils/';
import {updateFirebaseDocument} from "@/serverless/db/updateDocument/"
import Loading from '../components/loading';

export default function DocumentSearch() {

    const [isLoading, setIsLoading] = useState(false);
    const [documents, setDocuments] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editValues, setEditValues] = useState({});

    const startEditing = (document, index) => {
      setEditingIndex(index);
      setEditValues(document);
    };

    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditValues(prev => ({ ...prev, [name]: value }));
    };

    const cancelEditing = () => {
      setEditingIndex(null);
      setEditValues({});
    };

    const updateDocument = async () => {
      setIsLoading(true);
      try {
        await updateFirebaseDocument("ingresos", editValues.id, editValues);
        const updatedDocuments = [...documents];
        updatedDocuments[editingIndex] = editValues;
        setDocuments(updatedDocuments);
      } catch (error) {
        console.error("Error al actualizar el documento:", error);
      } finally {
        setIsLoading(false);
        setEditingIndex(null);
        setEditValues({});
      }
    };

    const handleSubmitFormSearchProducts = async (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.searchTerm.value;
        if (!searchTerm) return;

        setIsLoading(true);
        try {
            const results = await getQueryUser(searchTerm);
            setDocuments(results);
        } catch (error) {
            console.error('Error al buscar productos:', error);
        } finally {
            setIsLoading(false);
            e.target.elements.searchTerm.value = "";
            e.target.elements.searchTerm.focus();
        }
    }

    // --- Styles ---
    const pageContainerStyle = {
        width: "100vw",
        height: "calc(100dvh - 64px)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f2f5"
    };

    const contentAreaStyle = {
        flexGrow: 1,
        overflowY: "auto",
        padding: "8px"
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        margin: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #e8e8e8'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '12px',
        fontSize: '1rem'
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '6px',
        display: 'block',
        color: '#333'
    };

    const buttonPrimary = {
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '12px 20px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600'
    };

    const buttonSecondary = {
        backgroundColor: '#f0f0f0',
        color: '#333',
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '12px 20px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600'
    };

    const infoTextStyle = {
        fontSize: '1rem',
        color: '#555',
        margin: '4px 0'
    };

    const amountStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#0070f3',
        margin: '10px 0'
    }

    return (
        <div style={pageContainerStyle}>
            <div style={contentAreaStyle}>
                {documents?.map((document, index) => (
                    <div key={index} style={cardStyle}>
                        {editingIndex === index ? (
                            <div>
                                {Object.keys(editValues).map(key => {
                                  if (key === 'id' || key === 'initialsNames') return null;
                                  return (
                                    <div key={key}>
                                        <label style={labelStyle}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                        <input 
                                          name={key} 
                                          value={editValues[key]} 
                                          onChange={handleEditChange} 
                                          style={inputStyle} 
                                        />
                                    </div>
                                  )
                                })}
                                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                    <button onClick={updateDocument} style={buttonPrimary}>Actualizar</button>
                                    <button onClick={cancelEditing} style={buttonSecondary}>Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p style={{...infoTextStyle, fontWeight: 'bold', fontSize: '1.2rem'}}>Nombre: {document.nombre}</p>
                                <p style={infoTextStyle}>Peso: {document.peso}</p>
                                <p style={infoTextStyle}>Precio publico: ${document.precioPublico}</p>
                                <p style={infoTextStyle}>Precio x5 sacos: ${document.preciox5sacos}</p>
                                <p style={infoTextStyle}>Precio x10 sacos: ${document.preciox10sacos}</p>
                                <p style={infoTextStyle}>Precio x15 sacos: ${document.preciox15sacos}</p>
                                <p style={amountStyle}>Cantidad: {document.amount}</p>
                                <button onClick={() => startEditing(document, index)} style={{...buttonPrimary, marginTop: '15px'}}>Editar</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ padding: "1rem", backgroundColor: "#fff", boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
                {isLoading && <Loading />}
                <form onSubmit={handleSubmitFormSearchProducts} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        name="searchTerm"
                        style={{...inputStyle, flexGrow: 1, marginBottom: 0}}
                    />
                    <button type="submit" style={buttonPrimary}>Buscar</button>
                </form>
            </div>
        </div>
    );
}
