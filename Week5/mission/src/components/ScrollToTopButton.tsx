import { useState, useEffect } from "react";
import { useThrottle } from "../hooks/useThrottle";
import { ArrowUp } from "lucide-react"; 

const ScrollToTopButton = () => {
  const [scrollY, setScrollY] = useState(0);

  const throttledScrollY = useThrottle(scrollY, 300);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    console.log(`실제 스크롤: ${scrollY} | Throttled 스크롤: ${throttledScrollY}`);
  }, [scrollY, throttledScrollY]);


  const showButton = throttledScrollY > 300;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50"
      aria-label="상단으로 이동"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;