import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const t = localStorage.getItem("token");
        const r = localStorage.getItem("role");
        return !!(t && r);
    });

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
