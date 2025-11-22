import Image from 'next/image';

const LoadingSpinner = () => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  return (
    <div style={overlayStyle}>
      <img
        src="/spinner.svg"
        alt="Cargando..."
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

export default LoadingSpinner;
