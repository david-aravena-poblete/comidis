'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from '@/app/components/Navbar/';
import app from '@/serverless/config'; // tu config de firebase
import LoginForm from './LoginForm';

export default function AuthGate({ children }) {
  const auth = getAuth(app);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Escuchar cambio de autenticación
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });

    return () => unsub();
  }, [auth]);

  // Aún cargando usuario
  if (user === undefined) {
    return <p>Cargando...</p>;
  }

  // No autenticado → mostrar formulario
  if (user === null) {
    return <LoginForm auth={auth} />;
  }

  // Autenticado → mostrar children
  return  <> <Navbar /> {children} </>;
}