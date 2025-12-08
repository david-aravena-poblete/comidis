"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm({auth}) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />
      <button>Ingresar</button>
    </form>
  );
}