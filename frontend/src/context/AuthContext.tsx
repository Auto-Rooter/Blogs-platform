import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedUser {
  _id: string;
  role: string;
  username: string;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  user: DecodedUser | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (token) {
        const decoded = jwtDecode<DecodedUser>(token);
        setUser(decoded as DecodedUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Invalid token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded && token) {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(decoded as DecodedUser);
      } else {
        console.warn("JWT missing username field");
      }
    } catch (e) {
      console.error("Tried to login with invalid token");
    }
  };
  

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
