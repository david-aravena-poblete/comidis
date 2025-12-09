"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./LoginForm.module.css";
import LoadingSpinner from "../loading";

export default function LoginForm({auth}) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginForm}>
      {isLoading && <LoadingSpinner />}
      <form onSubmit={login} className={styles.form}>
        <h2 className={styles.title}>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
          className={styles.input}
          disabled={isLoading}
        />
        <button className={styles.button} disabled={isLoading}>
          {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
