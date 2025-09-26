import { createContext, useContext, useState, type JSX, type PropsWithChildren } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum THEME {
  LIGHT = 'LIGHT',
  DARK='DARK',
}

type TTheme= THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider =({children}: PropsWithChildren) :JSX.Element => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = ():void => {
    setTheme((prevTheme): THEME =>
      prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useTheme =(): IThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTeme must be used within a TemeProvider');
  }
  return context;
}