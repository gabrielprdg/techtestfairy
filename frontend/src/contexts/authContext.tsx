import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

type SignInData = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextTypes = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  accessToken: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextTypes);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [accessToken, setAccessToken] = useState<string>("");
  const isAuthenticated = !!accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token && !isTokenExpired(token)) {
      setAccessToken(token);
      navigate('/dashboard')
    } else {
      setAccessToken("")
    }
  }, []);

  const isTokenExpired = (token: string) => {
    try {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // Decodifica o token JWT
      const expirationTime = decodedToken.exp * 1000; // Expiração do token em milissegundos
      const currentTime = Date.now();
      return currentTime > expirationTime;
    } catch (error) {
      return true; // Se não for possível decodificar, considera como expirado
    }
  };

  async function signIn({ email, password }: SignInData) {
    try {
      const res = await api.post("auth/login", { email, password });

      const { token } = res.data;
      setAccessToken(token);

      localStorage.setItem("user-token", token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
