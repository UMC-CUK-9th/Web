import ThemeContent from "../components/ThemeContent";
import Navbar from "../components/Navbar";
import { type JSX } from "react";
import { ThemeProvider } from "../context/ThemeProvider";

export default function ContextPage(): JSX.Element {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <main className="flex-1  w-full">
          <ThemeContent />
        </main>
      </div>
    </ThemeProvider>

  )
};

