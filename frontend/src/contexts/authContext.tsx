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
  signOut: () => void;
  accessToken: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextTypes);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("usestore-token");

    if (token) {
      setAccessToken(token);
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      const res = await api.post("auth/login", { email, password });

      const { accessToken: token } = res.data;
      setAccessToken(token);

      localStorage.setItem("user-token", token);

      navigate("/Dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  function signOut() {
    localStorage.removeItem("user-token");
    setAccessToken("");
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
