// src/components/Route.tsx

import React, { useEffect, useState } from 'react';

// Route 컴포넌트가 받을 props의 타입을 정의합니다.
interface RouteProps {
  path: string;
  children: React.ReactNode;
}

const Route: React.FC<RouteProps> = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return currentPath === path ? children : null;
};

export default Route;