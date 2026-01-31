import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useTheme } from "../context/ThemeContext";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if (!token || !email) {
          setStatus("error");
          setMessage("Missing verification token or email");
          return;
        }

        const response = await api.post("/api/auth/verify-email", {
          token,
          email,
        });

        setStatus("success");
        setMessage(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div
      className={`min-h-[calc(100vh-80px)] flex items-center justify-center transition-all duration-500 px-6 ${
        darkMode ? "bg-[#0f172a]" : "bg-[#f1f9ff]"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl transition-all text-center ${
          darkMode
            ? "bg-[#1e293b] border-slate-700 shadow-black/20"
            : "bg-white border-slate-200 shadow-blue-500/10"
        }`}
      >
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/30">
            <img
              src="/EES_logo.jpeg"
              alt="Logo"
              className="h-10 w-10 rounded-lg invert brightness-200"
            />
          </div>
          <h1
            className={`text-4xl font-black tracking-tight ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            EES
          </h1>
        </div>

        {status === "verifying" && (
          <div>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p
              className={`text-lg font-medium ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Verifying your email...
            </p>
          </div>
        )}

        {status === "success" && (
          <div>
            <div className="mb-4 text-4xl">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Email Verified!
            </h2>
            <p
              className={`text-base ${
                darkMode ? "text-slate-300" : "text-slate-600"
              } mb-4`}
            >
              {message}
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Redirecting to login in 3 seconds...
            </p>
          </div>
        )}

        {status === "error" && (
          <div>
            <div className="mb-4 text-4xl">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Verification Failed
            </h2>
            <p
              className={`text-base ${
                darkMode ? "text-slate-300" : "text-slate-600"
              } mb-6`}
            >
              {message}
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
            >
              Back to Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
