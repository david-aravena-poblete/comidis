import { getQueryUser } from './utils/';

const FormSearchProducts = ({ onSearchResults }) => {

  const handleSubmitFormSearchProducts = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.searchTerm.value;
    
    if (!searchTerm) {
      return;
    }

    console.log(`Buscando en 'initialsNames' el valor: ${searchTerm}`);
    
    // Corregido: Usamos el campo correcto 'initialsNames' que vi en la imagen.
    const results = await getQueryUser(searchTerm);
    
    console.log('Resultados encontrados:', results);

    // Pasamos los resultados al componente padre (page.js)
    onSearchResults(results);
  }

  const handleReset = (e) => {
    // Cuando se limpia el formulario, pasamos un array vacío para resetear la lista
    onSearchResults([]);
  }

  const formStyle = {
    display: 'flex',
    gap: '0.5rem',
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
      />
      <button type="submit" style={buttonStyle}>Buscar</button>
    </form>
  )
}

export default FormSearchProducts;