import { Outlet } from 'react-router-dom';

import { Header, Footer, Drawer } from '../components';

export const MainLayout = () => {
  return (
    <>
      <Drawer />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
