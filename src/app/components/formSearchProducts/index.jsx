const FormSearchProducts = () => {
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
      <form style={formStyle}>
        <button type="button" style={{...buttonStyle, backgroundColor: '#6c757d'}}>
          Limpiar
        </button>
        <input type="text" style={inputStyle} placeholder="Buscar producto..."/>
        <button type="submit" style={buttonStyle}>Buscar</button>
      </form>
    )
  }

  export default FormSearchProducts;