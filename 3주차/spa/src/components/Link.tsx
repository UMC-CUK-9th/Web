// src/components/Link.tsx

import React from 'react';

// Link 컴포넌트가 받을 props의 타입을 정의합니다.
interface LinkProps {
  to: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ to, children }) => {
  // event 객체의 타입을 명시적으로 지정합니다.
  const preventReload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, '', to);

    const navigationEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navigationEvent);
  };

  return (
    <a href={to} onClick={preventReload}>
      {children}
    </a>
  );
};

export default Link;