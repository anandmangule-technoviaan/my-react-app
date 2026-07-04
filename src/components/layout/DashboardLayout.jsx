import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background text-on-surface">
      <Sidebar />

      <div className="flex-1 ml-sidebar-width flex flex-col min-h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 p-container-padding space-y-section-gap max-w-[1600px] mx-auto w-full flex flex-col">
          <Outlet />
        </main>

        <footer className="mt-auto py-6 px-container-padding text-center border-t border-outline-variant/30 bg-surface-container-low">
          <p className="text-on-surface-variant text-[11px] font-semibold">
            © 2026 SafaiBazaar Enterprise • Enterprise Logistics Management System • v4.2.1-stable
          </p>
        </footer>
      </div>
    </div>
  );
}
