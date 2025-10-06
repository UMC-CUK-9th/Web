import React, { useState, useEffect, type ReactNode,  } from 'react';
import { getCurrentPath } from './Router';

const usePath = () => {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener('popstate', onLocationChange);

    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  return currentPath;
};


interface RouteProps {
  path: string; 
  element: ReactNode;
}

const Route: React.FC<RouteProps> = ({ path, element }) => {
  const currentPath = usePath();

  if (currentPath === path) {
    return <>{element}</>;
  }

  return null; 
};

export default Route;