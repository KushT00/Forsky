// components/Layout.tsx
import React from 'react';
import Navbar from './components/component/navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
