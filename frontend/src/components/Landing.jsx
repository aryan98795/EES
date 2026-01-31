import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

export default function Home() {
    const { isLoggedIn } = useAuth();
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);
    const textureStyles = `
        @keyframes textureMove {
            0% { transform: translate(0, 0); }
            50% { transform: translate(-2%, -1%); }
            100% { transform: translate(0, 0); }
        }

        @keyframes softReveal {
            0% { opacity: 0; transform: translateY(15px); filter: blur(8px); }
            100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .animate-reveal {
            animation: softReveal 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animated-texture {
            background-size: 150px 150px;
            animation: textureMove 20s ease-in-out infinite;
        }
    `;

    return (
        <div
            className={`relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden px-6 ${darkMode ? "bg-[#0f172a]" : "bg-[#f9faff]"
                }`}
        >
            <style>{textureStyles}</style>

            <div
                className={`absolute inset-[-10%] z-0 pointer-events-none animated-texture ${darkMode ? "opacity-[0.15]" : "opacity-[0.08]"
                    }`}
                style={{
                    backgroundImage: `radial-gradient(#8b5cf6 0.5px, transparent 0.5px)`,
                    backgroundColor: "transparent",
                }}
            ></div>

            <div
                className={`absolute inset-0 pointer-events-none z-1 ${darkMode
                    ? "bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.5)_0%,transparent_70%)]"
                    : "bg-[radial-gradient(circle_at_center,rgba(232,231,255,0.8)_0%,transparent_70%)]"
                    }`}
            ></div>

            <div className="relative z-10 text-center max-w-2xl animate-reveal">
                <h1
                    className={`text-4xl md:text-6xl font-bold mb-4 tracking-tight ${darkMode ? "text-white" : "text-slate-800"
                        }`}
                >
                    Welcome to{" "}
                    <span className={darkMode ? "text-blue-500" : "text-blue-700"}>
                        EES
                    </span>
                </h1>

                <p
                    className={`text-base md:text-lg mb-10 leading-relaxed font-normal ${darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                >
                    The official portal for the{" "}
                    <Link
                        to="/forum"
                        className={`font-medium transition-colors border-b ${darkMode
                            ? "text-blue-400 hover:text-blue-300 border-slate-800"
                            : "text-blue-600 hover:text-blue-800 border-blue-100 hover:border-blue-600"
                            }`}
                    >
                        Electronics Engineering Society
                    </Link>.
                    A space to connect, share knowledge, and innovate.
                </p>

                {!isLoggedIn ? (<div className="flex flex-col sm:flex-row items-center justify-center gap-5"><Link to="/signup" className="w-full sm:w-44 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-800 transition-all duration-300 active:scale-95 text-sm tracking-wide text-center">GET STARTED</Link><Link to="/login" className={`w-full sm:w-44 py-3 font-semibold rounded-lg border shadow-sm transition-all duration-300 active:scale-95 text-sm tracking-wide text-center ${darkMode ? "bg-[#1e293b] text-slate-300 border-slate-700 hover:text-white" : "bg-white text-slate-600 border-slate-200 hover:text-blue-700 hover:border-blue-300"}`}>MEMBER LOGIN</Link></div>) : null}

            </div>

            <div
                className={`absolute bottom-8 text-[10px] uppercase tracking-[0.2em] font-medium z-10 ${darkMode ? "text-slate-600" : "text-slate-400"
                    }`}
            >
                ESTABLISHED AT IIT BHU
            </div>
        </div>
    );
} 