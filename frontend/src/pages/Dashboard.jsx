export default function Dashboard() {
    const role = localStorage.getItem("role");

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Role: {role}</p>
        </div>
    );
}
