import { createContext, useContext } from "react";


export const THEME = {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
} as const;


export type TTheme = typeof THEME[keyof typeof THEME];

export interface IThemeContext {
    theme: TTheme;
    toggleTheme: () => void;
}


export const ThemeContext = createContext<IThemeContext | undefined>(undefined);


export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};