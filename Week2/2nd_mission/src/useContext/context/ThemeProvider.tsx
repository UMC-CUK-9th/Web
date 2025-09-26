import { useState, type PropsWithChildren } from "react";
import { ThemeContext, THEME, type TTheme } from "./ThemeContext"; // 새로 만든 파일에서 import


export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};