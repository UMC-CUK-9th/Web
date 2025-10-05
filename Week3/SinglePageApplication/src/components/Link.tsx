
import React from 'react';
import { useNavigate } from '../hooks/useNavigate';

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(to);
  };

  return <a href={to} onClick={handleClick}>{children}</a>;
};

export default Link;