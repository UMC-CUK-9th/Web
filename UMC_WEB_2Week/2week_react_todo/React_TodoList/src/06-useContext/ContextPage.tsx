// ContextPage.tsx
import Navbar from './Navbar';
import ThemeContent from './ThemeContent';
import { useTheme, THEME, ThemeProvider } from './context/ThemeProvider';
import clsx from 'clsx';

export default function ContextPage(): Element {


  return(
        <ThemeProvider>
            <div className='flex flex-col items-center justify-center min-h-screen'>
      <Navbar />
      <main className='flex-1'>
        <ThemeContent/>
      </main>
    </div>
    </ThemeProvider>
  );
}