import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
            <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon}
                className={`theme-icon ${theme === 'dark' ? 'sun' : 'moon'}`}
            />
        </button>
    );
} 