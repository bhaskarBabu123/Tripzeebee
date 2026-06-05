import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../components/public/PublicHeader';
import PublicFooter from '../components/public/PublicFooter';
import UnifiedHeader from '../components/public/UnifiedHeader';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UnifiedHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <PublicFooter/>
    </div>
  );
};

export default PublicLayout;