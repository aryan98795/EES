import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async () => {
        const response = await api.post("/api/auth/login", {
            email: email,
            password: password
        });
        localStorage.setItem("token", response.data.token);;
        localStorage.setItem("role", response.data.role);
        navigate("/dashboard");
    };
    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={submit}>Login</button>
        </div>
    )
}