import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiChevronDown, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { darkMode, setDarkMode } = useTheme();
    const [auth, setAuth] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const f = () => {
            setAuth(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", f);
        return () => window.removeEventListener("storage", f);
    }, []);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/events", label: "Events" },
        { to: "/forum", label: "Forum" },
        { to: "/alumni", label: "Alumni" },
        { to: "/team", label: "Team" },
    ];

    const menuVariants = {
        closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
        open: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeOut" } }
    };

    const linkVariants = {
        closed: { x: -20, opacity: 0 },
        open: (i) => ({
            x: 0,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.3 }
        })
    };

    return (
        <nav className={`sticky top-0 z-50 border-b ${darkMode ? "bg-[#0f172a] text-white border-slate-800" : "bg-white text-slate-800 border-slate-200/50"}`}>
            <div className="mx-auto w-full px-4 sm:px-8 lg:px-16">
                <div className="flex h-20 items-center justify-between">

                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <img src="/EES_logo.jpeg" className="h-7 w-7 rounded-md invert brightness-200" alt="Logo" />
                        </div>
                        <span className="text-2xl font-bold">EES</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className="hover:text-blue-500 transition-colors font-medium">
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button whileTap={{ scale: 0.8 }} onClick={() => setDarkMode(!darkMode)} className="p-2">
                            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
                        </motion.button>

                        <button className="lg:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>

                        <div className="hidden sm:flex items-center gap-4">
                            {!isLoggedIn ? (<>
                                <Link to="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">Sign Up</Link>
                                <Link to="/login" className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all">Sign In</Link>
                            </>)
                                :
                                <Link to="/logout" className="px-4 py-2 bg-red-500 text-white rounded-lg transition-colors duration-300 hover:bg-red-600 active:bg-red-700">Logout</Link>
                            }
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="lg:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex flex-col gap-4 py-6 px-2">
                                {navLinks.map((link, i) => (
                                    <motion.div key={link.to} custom={i} variants={linkVariants}>
                                        <NavLink
                                            to={link.to}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-lg font-medium block hover:text-blue-500 transition-colors"
                                        >
                                            {link.label}
                                        </NavLink>
                                    </motion.div>
                                ))}
                                <hr className="border-slate-100 dark:border-slate-800" />
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" className="w-full py-3 text-center rounded-xl bg-blue-600 text-white">Get Started</Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;