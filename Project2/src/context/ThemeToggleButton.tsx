import { THEME, useTheme } from "./ThemeProvider";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 mt-4 rounded-md transition-all ${
          isLightMode ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        {isLightMode ? "🌙다크모드" : "☀️라이트모드"}
      </button>
    </div>
  );
}
