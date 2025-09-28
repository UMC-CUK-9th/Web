// src/ThemeContent.tsx
import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent(): JSX.Element {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white text-black" : "bg-gray-800 text-white"
      )}
    >
      Screen Change
    </div>
  );
}
