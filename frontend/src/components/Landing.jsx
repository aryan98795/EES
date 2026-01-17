import { Navigate, useNavigate } from "react-router-dom";

export default function Landing() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (token) return <Navigate to="/dashboard" replace />;

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Welcome</h1>

            <button onClick={() => navigate("/login")}>
                Login
            </button>

            <br /><br />

            <button onClick={() => navigate("/signup")}>
                sign up
            </button>
        </div>
    );
}
