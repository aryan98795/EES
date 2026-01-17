import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Role: {role}</p>
            <br></br>
            <button onClick={() => navigate("/logout")}>
                Logout
            </button>
        </div>
    );
}
