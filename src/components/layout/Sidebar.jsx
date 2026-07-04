import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role || 'Employee';

  const consoleName = {
    'Super Admin': 'Super Admin Panel',
    'Admin': 'Admin Console',
    'Warehouse Manager': 'Warehouse Ops',
    'Store Manager': 'Store Console',
    'Cashier': 'POS Terminal',
    'Employee': 'Employee Hub'
  }[userRole] || 'Admin Console';

  const navItems = {
    'Super Admin': [
      { path: '/dashboard/super-admin', label: 'Dashboard', icon: 'dashboard' },
      { path: '/dashboard/users', label: 'User Management', icon: 'group' },
      { path: '/dashboard/logs', label: 'Activity Logs', icon: 'history' },
      { path: '/dashboard/reports', label: 'Analytics Reports', icon: 'analytics' },
      { path: '/dashboard/settings', label: 'System Settings', icon: 'settings' }
    ],
    'Admin': [
      { path: '/dashboard/admin', label: 'Dashboard', icon: 'dashboard' },
      { path: '/dashboard/orders', label: 'Order Pipeline', icon: 'receipt_long' },
      { path: '/dashboard/products', label: 'Products & Inventory', icon: 'inventory_2' },
      { path: '/dashboard/reports', label: 'Analytics Reports', icon: 'analytics' },
      { path: '/dashboard/settings', label: 'System Settings', icon: 'settings' }
    ],
    'Warehouse Manager': [
      { path: '/dashboard/warehouse', label: 'Warehouse Hub', icon: 'warehouse' },
      { path: '/dashboard/warehouse-inventory', label: 'Inventory list', icon: 'inventory_2' },
      { path: '/dashboard/warehouse-dispatch', label: 'Approved Dispatch', icon: 'local_shipping' },
      { path: '/dashboard/warehouse-catalog', label: 'Product Catalog', icon: 'menu_book' },
      { path: '/dashboard/settings', label: 'Settings', icon: 'settings' }
    ],
    'Store Manager': [
      { path: '/dashboard/store', label: 'Store Dashboard', icon: 'storefront' },
      { path: '/dashboard/store-catalog', label: 'Product Catalog', icon: 'grid_view' },
      { path: '/dashboard/create-order', label: 'Create Order', icon: 'add_shopping_cart' },
      { path: '/dashboard/my-orders', label: 'My Orders', icon: 'receipt_long' },
      { path: '/dashboard/store-inventory', label: 'Store Inventory', icon: 'inventory' },
      { path: '/dashboard/settings', label: 'Settings', icon: 'settings' }
    ],
    'Cashier': [
      { path: '/dashboard/pos', label: 'POS Terminal', icon: 'point_of_sale' },
      { path: '/dashboard/sales-history', label: 'Sales History', icon: 'history' },
      { path: '/dashboard/returns', label: 'Returns & Refunds', icon: 'keyboard_return' }
    ],
    'Employee': [
      { path: '/dashboard/profile', label: 'My Profile', icon: 'person' },
      { path: '/dashboard/logs', label: 'Activity Logs', icon: 'history' }
    ]
  }[userRole] || [];

  const handleActionClick = () => {
    if (userRole === 'Store Manager') {
      navigate('/dashboard/create-order');
    } else {
      navigate('/dashboard/orders');
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-low border-r border-outline-variant/30 flex flex-col p-4 gap-2 z-50">
      <div className="flex items-center gap-3 px-2 mb-8">
        <img 
          alt="SafaiBazaar Logo" 
          className="h-8 object-contain" 
          src="https://lh3.googleusercontent.com/aida/AP1WRLvUzjJIzV9zb2B3Y8WIyF0nsWrYM9iiz8QY5MCP1MJJffsRXQ2lzGGdqITRF9NftSZDOpVEj3Ssl0kIo55FkmTbrUQDNwMdOFbWOhefuXGKg5MSygN47g_G9ArsMPGIfUU-WV-zTuYNcmH6eHG3WzJV5U8GEFyeNVwEfNCmrBjtoxeFwB4odKMQHj6T8Kb0kz1Uh-OxfCyQ63FXh-jgOXVtM7e4ydnqyJTYwmA8qUDmGKmaD3Dzzr2KSf8" 
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">SafaiBazaar</span>
          <span className="text-[11px] font-semibold text-on-surface-variant">{consoleName}</span>
        </div>
      </div>

      {userRole !== 'Employee' && userRole !== 'Cashier' && (
        <button 
          onClick={handleActionClick}
          className="shimmer-btn w-full bg-primary text-on-primary rounded-xl py-3 px-4 flex items-center justify-center gap-2 mb-6 font-bold active:scale-[0.98] transition-transform shadow-lg"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          {userRole === 'Store Manager' ? 'New Order' : 'Manage Pipeline'}
        </button>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-semibold ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`
            }
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-outline-variant/30 pt-4 space-y-1">
        <NavLink 
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-semibold ${
              isActive ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`
          }
        >
          <span className="material-symbols-outlined text-lg">account_circle</span> My Profile
        </NavLink>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container rounded-xl transition-all text-xs font-semibold text-left"
        >
          <span className="material-symbols-outlined text-lg">logout</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
