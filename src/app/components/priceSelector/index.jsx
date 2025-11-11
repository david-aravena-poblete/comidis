import React from 'react';

const PriceSelector = ({ product, selectedPrice, onPriceChange }) => {
  const priceOptions = [
    { value: 'precioPublico', label: 'Precio Publico' },
    { value: 'precioComerciante', label: 'Precio Comerciante' },
    { value: 'preciox5sacos', label: 'Precio x 5 sacos' },
    { value: 'preciox10sacos', label: 'Precio x 10 sacos' },
    { value: 'preciox15sacos', label: 'Precio x 15 sacos' },
  ];

  const selectStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    fontSize: '1rem',
    minWidth: '200px',
  };

  const handleChange = (e) => {
    const priceType = e.target.value;
    const priceValue = product[priceType];
    onPriceChange(product.nombre, { type: priceType, price: priceValue });
  };

  return (
    <select
      style={selectStyle}
      value={selectedPrice.type}
      onChange={handleChange}
    >
      {priceOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}: ${product[option.value]}
        </option>
      ))}
    </select>
  );
};

export default PriceSelector;
