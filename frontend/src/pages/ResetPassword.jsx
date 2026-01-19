import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const navigate = useNavigate;
    const submit = async () => {
        await axios.post(`/reset-password/${token}`,{password});
        navigate("/login");
    };

    return (
        <div>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="New password"
            />
            <button onClick={submit}>Reset</button>
        </div>
    )

}