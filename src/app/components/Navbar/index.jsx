'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {logof} from '@/serverless/auth/logof/'


export default function Navbar() {
  const pathname = usePathname();

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Seguro que quieres cerrar tu sesión?");
    if (!confirmLogout) return;
    logof();
};


  const getLinkStyle = (path) => ({
    textDecoration: 'none',
    color: pathname === path ? '#212529' : '#007bff',
    fontWeight: 'bold',
    padding: '10px 15px',
    borderRadius: '8px',
    borderBottom: pathname === path ? '3px solid #007bff' : '3px solid transparent',
    transition: 'all 0.3s ease-in-out',
    flexShrink: 0,
    whiteSpace: 'nowrap'
  });

  return (
    <nav style={{
      width: '100vw',
      display: 'flex',
      flexDirection:"column",
      alignItems: 'center',
      gap: '20px',
      padding: '8px 16px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #dee2e6',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>

      <div style={{width:"100%", display:"flex", justifyContent:"flex-end"}}>
        <button onClick={handleLogout} style={{
            width:"100%"
        }}>Cerrar sesion
        </button>
      </div>

        
      <div>
        <Link href="/" style={getLinkStyle('/')}>
          Buscador
        </Link>
        <Link href="/documentos" style={getLinkStyle('/documentos')}>
          Pedidos
        </Link>
        <Link href="/lista" style={getLinkStyle('/lista')}>
          Lista
        </Link>
      </div>
    
    </nav>
  );
}
