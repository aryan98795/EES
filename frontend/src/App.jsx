import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // 1. Hooks import karein
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./components/Landing";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Sync with Tailwind and Local Storage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      {/* 2. Navbar ko darkMode aur setDarkMode pass karein taaki button toggle kar sake */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        {/* 3. Har page component ko darkMode prop dein taaki wo background change kar sake */}
        <Route path="/" element={<Landing darkMode={darkMode} />} />
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/signup" element={<Signup darkMode={darkMode} />} />
        <Route path="/logout" element={<Logout />} />
        <Route  path="/forgot-password" element={<ForgotPassword darkMode={darkMode} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;