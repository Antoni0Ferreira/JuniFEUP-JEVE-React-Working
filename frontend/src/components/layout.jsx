import { Outlet } from 'react-router-dom';

import Navbar from '@/components/navbar';

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center m-8">
        <Outlet />
      </div>
    </div>
  );
}