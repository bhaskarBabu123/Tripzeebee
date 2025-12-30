import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../components/public/PublicHeader';
import PublicFooter from '../components/public/PublicFooter';
import UnifiedHeader from '../components/public/UnifiedHeader';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UnifiedHeader />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-white py-12 px-4">
        {/* Simple Footer Content */}
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-xs font-medium">
          © 2025 Tripzybee Expedition. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;