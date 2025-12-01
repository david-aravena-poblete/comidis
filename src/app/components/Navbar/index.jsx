
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const getLinkStyle = (path) => ({
    textDecoration: 'none',
    color: pathname === path ? '#212529' : '#007bff',
    fontWeight: 'bold',
    padding: '10px 15px',
    borderRadius: '8px',
    borderBottom: pathname === path ? '3px solid #007bff' : '3px solid transparent',
    transition: 'all 0.3s ease-in-out',
  });

  return (
    <nav style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      padding: '8px 0',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #dee2e6',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <Link href="/" style={getLinkStyle('/')}>
        Buscador
      </Link>
      <Link href="/documentos" style={getLinkStyle('/documentos')}>
        Pedidos
      </Link>
      <Link href="/lista" style={getLinkStyle('/lista')}>
        Lista
      </Link>
    </nav>
  );
}
