import React from 'react';

const ButtonSum = ({ product, onQuantityChange, quantity }) => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    const buttonStyle = {
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '1rem',
        width: 'auto',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const inputStyle = {
        width: '50px',
        textAlign: 'center',
        fontSize: '1rem',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    return (
        <div style={containerStyle}>
            <button style={buttonStyle} onClick={() => onQuantityChange(product, quantity + 1)}>
                {quantity > 0 ? `agregar otro (${quantity})` : "agregar"}
            </button>
        </div>
    );
};

export default ButtonSum;