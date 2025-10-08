import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const RootLayout = () => {
  return (
    <div className='h-dvh flex flex-col'>
        <Navbar />
        <Outlet />
    </div>
  );
};

export default RootLayout;