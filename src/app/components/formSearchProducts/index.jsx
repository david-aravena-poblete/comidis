import { getQueryUser } from './utils/';
import { useRef, useEffect } from 'react';


const FormSearchProducts = ({ onSearchResults, setIsLoading }) => {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Foco inicial
    inputRef.current.focus();
  
    // Capturar cualquier tecla global y devolver el foco
    const handleKeyDown = () => {
      inputRef.current.focus();
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleReset = (e) => {
    // Cuando se limpia el formulario, pasamos un array vacío para resetear la lista
    onSearchResults([]);
  }
  

  const formStyle = {
    width: "100%",
    minHeight: "5vh",
    display: "flex",
    gap: "0.5rem",
    padding: "1rem",
    backgroundColor: "#ffffff",       // Fondo blanco para separar del BG
    borderRadius: "12px",             // Esquinas redondeadas
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // Sombra para profundidad
    border: "1px solid #e5e5e5",      // Línea sutil de contorno
  };
  
  const inputStyle = {
    flexGrow: 1,
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };
  const buttonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
    cursor: 'pointer'
  }

  return(
    <form style={formStyle} onSubmit={handleSubmitFormSearchProducts} onReset={handleReset}>
      <button type="reset" style={{...buttonStyle, backgroundColor: '#6c757d'}}>
        Limpiar
      </button>
      <input 
        type="text" 
        name="searchTerm" 
        style={inputStyle} 
        placeholder="Buscar..." 
        ref={inputRef}
      />
      <button type="submit" style={buttonStyle}>Buscar</button>
    </form>
  )
}

export default FormSearchProducts;