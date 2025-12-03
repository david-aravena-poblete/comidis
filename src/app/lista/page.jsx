'use client'

import { useState } from 'react';
import { getQueryUser } from './utils/';
import {updateFirebaseDocument} from "@/serverless/db/updateDocument/"
import styles from './lista.module.css'

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
      await updateFirebaseDocument("ingresos", editValues.id, editValues);
      setEditingIndex(null);
      setEditValues({});
    };
    
    


  const handleChange = (e) => {
    const value = e.target.value;
    console.log("Valor ingresado:", value);
  };

  const handleSubmitFormSearchProducts = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.searchTerm.value;
    console.log(searchTerm)
    
    if (!searchTerm) {
      return;
    }

    setIsLoading(true);
    console.log(`Buscando en 'initialsNames' el valor: ${searchTerm}`);
    
    try {
      const results = await getQueryUser(searchTerm);
      console.log('Resultados encontrados:', results);
      setDocuments(results)
    } catch (error) {
      console.error('Error al buscar productos:', error);
    } finally {
      setIsLoading(false);
      e.target.elements.searchTerm.value = "";
      e.target.elements.searchTerm.focus();
    }
  }

  return (
    <div style={{
        width:"100vw",
        height:"calc(100dvh - 64px)",
        display:"flex",
        flexDirection:"column"
      }}>
        <div style={{
          width:"100%",
          flexGrow: 1,
          backgroundColor:"#f0f0f0",
          overflowY:"auto"
        }}>
   {documents?.map((document, index) => (
  <div key={index} style={{ width:"100%", border:"1px solid red", margin:"1rem 0" }}>
    
    {editingIndex === index ? (
      <>
        <input name="nombre" value={editValues.nombre} onChange={handleEditChange} className={styles.item} />
        <input name="peso" value={editValues.peso} onChange={handleEditChange} className={styles.item} />
        <input name="precioPublico" value={editValues.precioPublico} onChange={handleEditChange} className={styles.item} />
        <input name="preciox5sacos" value={editValues.preciox5sacos} onChange={handleEditChange} className={styles.item} />
        <input name="preciox10sacos" value={editValues.preciox10sacos} onChange={handleEditChange} className={styles.item} />
        <input name="preciox15sacos" value={editValues.preciox15sacos} onChange={handleEditChange} className={styles.item} />
        <input name="amount" value={editValues.amount} onChange={handleEditChange} style={{ fontSize:"1.5rem" }} />

        <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.5rem" }}>
          <button onClick={updateDocument}>Actualizar</button>
          <button onClick={cancelEditing}>Cancelar</button>
        </div>
      </>
    ) : (
      <>
        <p className={styles.item}>Nombre: {document.nombre}</p>
        <p className={styles.item}>Peso: {document.peso}</p>
        <p className={styles.item}>precio publico: {document.precioPublico}</p>
        <p className={styles.item}>precio x5 sacos: {document.preciox5sacos}</p>
        <p className={styles.item}>precio x10 sacos: {document.preciox10sacos}</p>
        <p className={styles.item}>precio x15 sacos: {document.preciox15sacos}</p>
        <p style={{ fontSize:"1.5rem" }}>cantidad: {document.amount}</p>

        <button onClick={() => startEditing(document, index)}>Editar</button>
      </>
    )}

  </div>
))}



        </div>
      
        <div style={{
          width:"100%",
          padding:"1rem",
          backgroundColor:"#fff"
        }}>
          <form onSubmit={handleSubmitFormSearchProducts}>
            <input
                type="text"
                placeholder="Buscar..."
                onChange={handleChange}
                name="searchTerm"
                style={{ 
                width:"100%", 
                padding:"0.5rem", 
                fontSize:"1rem" 
                }}
            />
            <input type="submit" value="buscar" />

            </form>

            
        </div>
    </div>
      
  );
}
