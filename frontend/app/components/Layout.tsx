"use client";
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#f0f5f3] dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1200px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
