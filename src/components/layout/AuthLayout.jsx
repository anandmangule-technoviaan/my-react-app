import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-slate-200 grid lg:grid-cols-[1.05fr_0.95fr]">
        
        {/* Left Visual Branding Panel */}
        <div className="hidden bg-gradient-to-br from-primary via-secondary to-primary-container p-10 text-white lg:flex lg:flex-col lg:justify-between relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] rounded-full bg-white/10 blur-2xl"></div>
          
          <div>
            <img 
              src="https://lh3.googleusercontent.com/aida/AP1WRLvUzjJIzV9zb2B3Y8WIyF0nsWrYM9iiz8QY5MCP1MJJffsRXQ2lzGGdqITRF9NftSZDOpVEj3Ssl0kIo55FkmTbrUQDNwMdOFbWOhefuXGKg5MSygN47g_G9ArsMPGIfUU-WV-zTuYNcmH6eHG3WzJV5U8GEFyeNVwEfNCmrBjtoxeFwB4odKMQHj6T8Kb0kz1Uh-OxfCyQ63FXh-jgOXVtM7e4ydnqyJTYwmA8qUDmGKmaD3Dzzr2KSf8" 
              alt="SafaiBazaar Logo" 
              className="h-16 w-auto rounded-lg bg-white/10 p-2" 
            />
          </div>

          <div className="space-y-5 z-10">
            <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium backdrop-blur">
              SafaiBazaar Enterprise ERP
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              Production-ready Role-Based Logistics & Sales Portal.
            </h1>
            <p className="max-w-md text-sm text-white/80">
              Manage inventory health, POS sales billing, store collections, and logistics timelines from one centralized command center.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-white/90 z-10">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <div className="font-semibold text-secondary-fixed">Central Hub Control</div>
              <div className="mt-1 text-white/75">Full warehouse supply chain analytics</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <div className="font-semibold text-secondary-fixed">Retail & POS Billing</div>
              <div className="mt-1 text-white/75">Instant invoice generation & dispatch checks</div>
            </div>
          </div>
        </div>

        {/* Right Authentication Form Panel */}
        <div className="p-6 sm:p-8 lg:p-10 flex items-center justify-center">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
