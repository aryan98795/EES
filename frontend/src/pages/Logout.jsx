import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");;
        localStorage.removeItem("role");
        navigate("/login");
    }, [navigate]);
    return null;
}