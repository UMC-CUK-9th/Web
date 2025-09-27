import clsx from 'clsx';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle = ({ isDarkMode, toggleTheme }: ThemeToggleProps) => {
  return (
    <button
      onClick={toggleTheme}
      className={clsx("theme-toggle", { "dark-mode": isDarkMode })}
      title={isDarkMode ? '라이트 모드로 변경' : '다크 모드로 변경'}
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle;