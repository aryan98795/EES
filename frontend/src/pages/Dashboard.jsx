import { useNavigate } from "react-router-dom";

export default function Dashboard({ darkMode }) {
    const r = localStorage.getItem("role");
    const nav = useNavigate();

    return (
        <div className={`min-h-[calc(100vh-80px)] flex items-center justify-center px-6 transition-all duration-500 ${darkMode ? "bg-[#0f172a]" : "bg-[#f1f9ff]"}`}>
            <div className={`w-full max-w-xl p-10 rounded-3xl border shadow-2xl transition-all ${darkMode ? "bg-[#1e293b] border-slate-700 shadow-black/20" : "bg-white border-slate-200 shadow-blue-500/10"}`}>

                <h2 className={`text-3xl font-black mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Dashboard
                </h2>

                <p className={`text-sm font-medium mb-8 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Welcome back! You are logged in as
                </p>

                <div className={`mb-10 px-5 py-4 rounded-xl border ${darkMode ? "bg-[#0f172a] border-slate-700 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"}`}>
                    <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Role</span>
                    <div className="text-lg font-bold mt-1">{r}</div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => nav("/logout")}
                        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
