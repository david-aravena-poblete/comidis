import { getAuth, signOut } from "firebase/auth";
import app from "@/serverless/config"

export const logof = () => {
    const auth = getAuth(app);
    signOut(auth)
        .then(() => console.log("Usuario desconectado"))
        .catch((error) => console.error("Error al cerrar sesión:", error));
};
