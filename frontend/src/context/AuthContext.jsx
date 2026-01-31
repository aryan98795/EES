import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const t = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    return !!(t && r);
  });
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
