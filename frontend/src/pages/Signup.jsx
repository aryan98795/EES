import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Signup() {
  const [n, sN] = useState("");
  const [e, sE] = useState("");
  const [p, sP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useTheme();
  const nav = useNavigate();
  const [err, setErr] = useState("");

  const submit = async () => {
    try {
      await api.post("/api/auth/signup", {
        name: n,
        email: e,
        password: p,
      });
      nav("/login");
    } catch (er) {
      setErr(er);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-80px)] flex items-center justify-center transition-all duration-500 px-6 ${darkMode ? "bg-[#0f172a]" : "bg-[#f1f9ff]"}`}
    >
      <div
        className={`w-full max-w-md p-5 rounded-3xl border shadow-2xl transition-all animate-reveal ${darkMode ? "bg-[#1e293b] border-slate-700 shadow-black/20" : "bg-white border-slate-200 shadow-blue-500/10"}`}
      >
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/30">
            <img
              src="/EES_logo.jpeg"
              alt="Logo"
              className="h-10 w-10 rounded-lg invert brightness-200"
            />
          </div>
          <h1
            className={`text-4xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            EES
          </h1>
          <p
            className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Create your society account
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <label
              className={`text-xs font-bold uppercase tracking-wider ml-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
            >
              Full Name
            </label>
            <input
              placeholder="John Doe"
              className={`w-full p-4 rounded-xl border outline-none transition-all ${darkMode ? "bg-[#0f172a] border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white"}`}
              onChange={(e) => sN(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label
              className={`text-xs font-bold uppercase tracking-wider ml-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
            >
              Email Address
            </label>
            <input
              placeholder="name@example.com"
              className={`w-full p-4 rounded-xl border outline-none transition-all ${darkMode ? "bg-[#0f172a] border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white"}`}
              onChange={(e) => sE(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label
              className={`text-xs font-bold uppercase tracking-wider ml-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="JohnDoe@1234"
                className={`w-full p-4 rounded-xl border outline-none transition-all ${darkMode ? "bg-[#0f172a] border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white"}`}
                onChange={(e) => sP(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={submit}
          className="w-full mt-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
        >
          Sign Up
        </button>

        {err && (
          <div
            className={
              "text-red-500 text-sm mt-2 transition-opacity duration-300"
            }
          >
            Invalid format or email already exists
          </div>
        )}

        <div className="mt-8 pt-6 border-t flex justify-center ${darkMode ? 'border-slate-700' : 'border-slate-100'}">
          <p
            className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
