
import React, { useState, useEffect } from 'react';

interface RouterProps {
  children: (props: { path: string }) => React.ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  const [path, setPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return <>{children({ path })}</>;
};