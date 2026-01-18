    import { Link, NavLink } from "react-router-dom";
    import { useState } from "react";
    import { FiChevronDown, FiSun, FiMoon } from "react-icons/fi";

    // Navbar ko props receive karne honge
    const Navbar = ({ darkMode, setDarkMode }) => {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        const navLinks = [
            { to: "/", label: "Home" },
            { to: "/events", label: "Events", hasDropdown: true },
            { to: "/forum", label: "Forum", hasDropdown: true },
            { to: "/alumni", label: "Alumni" },
            { to: "/team", label: "Team" },
        ];

        return (
            <nav className={`sticky top-0 z-50 transition-colors duration-300 border-b ${darkMode
                    ? "bg-[#0f172a] text-white border-slate-800"
                    : "bg-white text-slate-800 border-slate-200/50"
                }`}>
                <div className="mx-auto w-full px-4 sm:px-8 lg:px-16">
                    <div className="flex h-20 items-center justify-between">

                        {/* Left: Branding */}
                        <div className="flex items-center gap-2 transition-transform hover:scale-105">
                            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
                                <img src="/EES_logo.jpeg" alt="Logo" className="h-7 w-7 rounded-md invert brightness-200" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">EES</span>
                        </div>

                        {/* Center: Links with Chevron */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <div key={link.to} className="group relative flex items-center gap-1 cursor-pointer">
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                            `text-[15px] font-medium transition-colors ${isActive ? "text-blue-500" : darkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-blue-600"
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                    {link.hasDropdown && (
                                        <FiChevronDown className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-180 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-6">
                            {/* THEME TOGGLE (Uses global state) */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-slate-800 text-yellow-400" : "hover:bg-slate-100 text-slate-600"
                                    }`}
                            >
                                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                            </button>

                            <div className="hidden sm:flex items-center gap-4">
                                <Link to="/login" className={`px-5 py-2.5 rounded-lg font-semibold border transition-all ${darkMode
                                        ? "border-blue-600/50 text-blue-400 hover:bg-blue-600/10"
                                        : "border-blue-600/30 text-blue-600 hover:bg-blue-50"
                                    }`}>
                                    Sign In
                                </Link>
                                <Link to="/signup" className="px-6 py-2.5 rounded-lg font-semibold bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all">
                                    Sign Up
                                </Link>
                            </div>

                            <button className="lg:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? "✕" : "☰"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                <div className={`lg:hidden absolute top-20 left-0 w-full p-6 transition-all duration-300 shadow-2xl ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
                    } ${darkMode ? "bg-[#1e293b]" : "bg-white"}`}>
                    <div className="space-y-4">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to} className={`block text-lg font-medium border-b pb-2 ${darkMode ? "border-slate-700 text-slate-200" : "border-slate-100 text-slate-800"}`} onClick={() => setIsMobileMenuOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        );
    };

    export default Navbar;