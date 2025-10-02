
import React from 'react';

interface RouteProps {
  currentPath: string;
  path: string;
  component: React.ReactNode;
}

const Route: React.FC<RouteProps> = ({ currentPath, path, component }) => {
  return currentPath === path ? <>{component}</> : null;
};

export default Route;