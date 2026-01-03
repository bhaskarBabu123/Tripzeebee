import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import UnifiedHeader from '../components/public/UnifiedHeader';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <UnifiedHeader />
      <main className="pt-26 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;