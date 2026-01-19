import { useState } from "react";
import api from "../api/axios.js";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const submit = async () => {
        await api.post("/forgot-password", { email });
        alert("Reset link sent to the mail");
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-96 space-y-4">
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 rounded-lg"
                />
                <button
                    onClick={submit}
                    className="w-full p-3 bg-blue-600 text-white rounded-lg"
                >
                    Send Reset Link
                </button>
            </div>
        </div>
    )
}