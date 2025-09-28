import type { JSX } from "react";
import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent(): JSX.Element {
  const {theme} = useTheme();
  
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        'p-4 h-dvh w-full', 
        isLightMode? 'bg-white' : 'bg-gray-800'
      )}
    >
      <h1
        className={clsx(
          'text-wx1 fond-bold',
          isLightMode ? 'text-black' : 'text-white'
        )}
      >
        Theme Content
      </h1>
      <p
        className={clsx(
          'p-4 w-full h-dvh', 
          isLightMode ? 'text-black' : 'text-white'
        )}
      >
        동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
      </p>
    </div>
  )
};

