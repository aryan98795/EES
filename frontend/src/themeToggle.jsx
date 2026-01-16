import { useState } from 'react';
function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setIsDark(!isDark);

    return (
            <button onClick={toggleTheme}>
                {isDark ? '☀️' : '🌙'}
            </button>
            <h1>Welcome to your App</h1>
        </div>
    );
}

export default ThemeToggle;