import { use, useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const { setIsLoggedIn } = useAuth();
    const [err, setErr] = useState("");

    const submit = async () => {
        try {
            const response = await api.post("/api/auth/login", {
                email: email,
                password: password
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            setIsLoggedIn(true);
            navigate("/dashboard");
        } catch (er) { setErr(er); }

    };

    return (
        <div className={`min-h-[calc(100vh-80px)] flex items-center justify-center transition-all duration-500 px-6 ${darkMode ? "bg-[#0f172a]" : "bg-[#f1f9ff]"}`}>

            <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl transition-all animate-reveal ${darkMode
                ? "bg-[#1e293b] border-slate-700 shadow-black/20"
                : "bg-white border-slate-200 shadow-blue-500/10"
                }`}>

                <div className="flex flex-col items-center gap-4 mb-10">
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/30">
                        <img src="/EES_logo.jpeg" alt="Logo" className="h-10 w-10 rounded-lg invert brightness-200" />
                    </div>
                    <h1 className={`text-4xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                        EES
                    </h1>
                    <p className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        Login to your society account
                    </p>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="space-y-2">
                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Email Address</label>
                        <input
                            placeholder="name@example.com"
                            className={`w-full p-4 rounded-xl border outline-none transition-all ${darkMode
                                ? "bg-[#0f172a] border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white"
                                }`}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className={`w-full p-4 rounded-xl border outline-none transition-all ${darkMode
                                ? "bg-[#0f172a] border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white"
                                }`}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    onClick={submit}
                    className="w-full mt-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                    Sign In
                </button>
                {err && (
                    <p className="text-red-500 text-sm mt-2 transition-opacity duration-300">
                        Wrong Password or Email
                    </p>
                )}
                <div className="mt-8 flex flex-col items-center gap-3">
                    <button className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                        Forgot password?
                    </button>
                    <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800 my-2"></div>
                    <p className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}