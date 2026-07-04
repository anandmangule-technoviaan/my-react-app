import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Topbar() {
  const { user } = useAuth();
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const cleanLabel = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const isLast = index === pathSegments.length - 1;

    return (
      <React.Fragment key={url}>
        {index > 0 && <span className="material-symbols-outlined text-[16px]">chevron_right</span>}
        {isLast ? (
          <span className="text-on-surface font-bold">{cleanLabel}</span>
        ) : (
          <Link to={url} className="hover:text-primary transition-colors">
            {cleanLabel}
          </Link>
        )}
      </React.Fragment>
    );
  });

  return (
    <header className="sticky top-0 w-full z-40 h-top-bar-height bg-surface/85 backdrop-blur-md shadow-sm px-container-padding flex justify-between items-center border-b border-outline-variant/30">
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold">
          {breadcrumbItems.length > 0 ? breadcrumbItems : <span className="text-on-surface font-bold">Dashboard</span>}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6">
          <Link to="/dashboard/orders" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Orders</Link>
          <Link to="/dashboard/products" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Inventory</Link>
          <Link to="/dashboard/reports" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">Analytics</Link>
        </div>
        
        <div className="h-6 w-[1px] bg-outline-variant/30"></div>
        
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-lg">notifications</button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-lg">help</button>
          <Link to="/dashboard/settings" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-lg">settings</Link>
          
          <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/30">
            <img 
              className="w-full h-full object-cover" 
              alt="Profile" 
              src={user?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY_AItsUB35DZKTZr184pdjjzqVgMOMPIXkVfwlS4nksUHx1qqgf8sr28Hoz0YN4rRCz_IDfjffDuwhYKQfuHRlecXqHA0yQh3JcdCQKDtfGMJh60NE4yC-sSni79mJU1AtnQebdE10zN1ItQiXFWIFmTgh1jjbvy8ObDqkvKEbP362PDXnXwEocBhiocnAwxIOpkZsrJb0QPtK2wrtB7eaiU8_LBjGB5hapACzL5tbm-ZqbT_oY5F8njqQGsuAQa-RnddKKtzXzU'} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
