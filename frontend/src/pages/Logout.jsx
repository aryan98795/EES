import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
    const nav = useNavigate();
    const { setIsLoggedIn } = useAuth();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        nav("/");
    }, [nav, setIsLoggedIn]);

    return null;
}
