import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '@/components/layout/AuthLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Guard components
import ProtectedRoute from '@/components/common/ProtectedRoute';
import RoleRoute from '@/components/common/RoleRoute';

// Pages
import Login from '@/pages/Login';
import SuperAdminDashboard from '@/pages/SuperAdminDashboard';
import UserManagement from '@/pages/UserManagement';
import AdminDashboard from '@/pages/AdminDashboard';
import Orders from '@/pages/Orders';
import OrderDetail from '@/pages/OrderDetail';
import WarehouseDashboard from '@/pages/WarehouseDashboard';
import WarehouseInventory from '@/pages/WarehouseInventory';
import WarehouseDispatch from '@/pages/WarehouseDispatch';
import ProductCatalog from '@/pages/ProductCatalog';
import StoreDashboard from '@/pages/StoreDashboard';
import CreateOrder from '@/pages/CreateOrder';
import MyOrders from '@/pages/MyOrders';
import StoreInventory from '@/pages/StoreInventory';
import POSTerminal from '@/pages/POSTerminal';
import SalesHistory from '@/pages/SalesHistory';
import ReturnsRefunds from '@/pages/ReturnsRefunds';
import ReportsAnalytics from '@/pages/ReportsAnalytics';
import ActivityLogs from '@/pages/ActivityLogs';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/profile" element={<Profile />} />

          <Route element={<RoleRoute allowedRoles={['Super Admin']} />}>
            <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/dashboard/users" element={<UserManagement />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['Admin']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/products" element={<ProductCatalog isManagementMode={true} />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['Admin', 'Warehouse Manager', 'Store Manager']} />}>
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/orders/:id" element={<OrderDetail />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['Warehouse Manager']} />}>
            <Route path="/dashboard/warehouse" element={<WarehouseDashboard />} />
            <Route path="/dashboard/warehouse-inventory" element={<WarehouseInventory />} />
            <Route path="/dashboard/warehouse-dispatch" element={<WarehouseDispatch />} />
            <Route path="/dashboard/warehouse-catalog" element={<ProductCatalog />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['Store Manager']} />}>
            <Route path="/dashboard/store" element={<StoreDashboard />} />
            <Route path="/dashboard/store-catalog" element={<ProductCatalog />} />
            <Route path="/dashboard/create-order" element={<CreateOrder />} />
            <Route path="/dashboard/my-orders" element={<MyOrders />} />
            <Route path="/dashboard/store-inventory" element={<StoreInventory />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['Cashier']} />}>
            <Route path="/dashboard/pos" element={<POSTerminal />} />
            <Route path="/dashboard/sales-history" element={<SalesHistory />} />
            <Route path="/dashboard/returns" element={<ReturnsRefunds />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['Super Admin', 'Admin', 'Warehouse Manager', 'Store Manager', 'Employee']} />}>
            <Route path="/dashboard/reports" element={<ReportsAnalytics />} />
            <Route path="/dashboard/logs" element={<ActivityLogs />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
