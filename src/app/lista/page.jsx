'use client'

import { useState } from 'react';

export default function DocumentSearch() {

    const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("Valor ingresado:", value);
  };

  const handleSubmitFormSearchProducts = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.searchTerm.value;
    
    if (!searchTerm) {
      return;
    }

    setIsLoading(true);
    console.log(`Buscando en 'initialsNames' el valor: ${searchTerm}`);
    
    try {
      const results = await getQueryUser(searchTerm);
      console.log('Resultados encontrados:', results);
      onSearchResults(results);
    } catch (error) {
      console.error('Error al buscar productos:', error);
      onSearchResults([]); // Limpiar resultados en caso de error
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
          backgroundColor:"#f0f0f0"
        }}>
        </div>
      
        <div style={{
          width:"100%",
          padding:"1rem",
          backgroundColor:"#fff"
        }}>
            <input
                type="text"
                placeholder="Buscar..."
                onChange={handleChange}
                style={{ 
                width:"100%", 
                padding:"0.5rem", 
                fontSize:"1rem" 
                }}
            />
            <button onClick={handleSubmitFormSearchProducts}>
                Buscar
            </button>

            
        </div>
    </div>
      
  );
}
