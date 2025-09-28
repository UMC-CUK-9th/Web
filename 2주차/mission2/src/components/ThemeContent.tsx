import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

const ThemeContent = () => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-black"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
       </h1>
        <p
          className={clsx(
            "mt-2 text-2xl",
            isLightMode ? "text-black" : "text-white"
          )}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          dolor quae quis atque libero sunt, consequatur quidem aspernatur,
          voluptatem excepturi ut iste accusantium nulla voluptas autem
          reprehenderit totam velit esse.
        </p>
    </div>
  );
};

export default ThemeContent;