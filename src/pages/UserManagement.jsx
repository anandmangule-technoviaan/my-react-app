import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import StatsCard from '@/components/common/StatsCard';
import DataTable from '@/components/common/DataTable';
import { USERS } from '@/constants/dummyData';
import toast from 'react-hot-toast';

const userSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.enum(['Super Admin', 'Admin', 'Warehouse Manager', 'Store Manager', 'Cashier', 'Employee']),
  status: z.enum(['Active', 'Inactive', 'Locked'])
});

export default function UserManagement() {
  const [usersList, setUsersList] = useState(USERS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: 'Active'
    }
  });

  const onSubmit = (data) => {
    const newUser = {
      id: usersList.length + 1,
      ...data
    };
    setUsersList(prev => [...prev, newUser]);
    toast.success('User created successfully!');
    setIsDrawerOpen(false);
    reset();
  };

  const renderStatusBadge = (status) => {
    const colors = {
      Active: 'bg-success-vibrant/10 text-success-vibrant border-success-vibrant/20',
      Locked: 'bg-error-alert/10 text-error-alert border-error-alert/20',
      Inactive: 'bg-outline-variant/20 text-on-surface-variant border-outline-variant/30'
    }[status] || 'bg-outline-variant/20 text-on-surface-variant';

    return (
      <span className={`px-2.5 py-0.5 border rounded-full text-xs font-bold ${colors}`}>
        {status}
      </span>
    );
  };

  const columns = [
    { key: 'id', label: 'User ID', render: (row) => <span className="font-bold text-primary">#USR-00{row.id}</span> },
    { key: 'name', label: 'Name', className: 'font-bold' },
    { key: 'email', label: 'Corporate Email' },
    { key: 'role', label: 'System Role', render: (row) => <span className="px-2 py-1 bg-surface-container rounded-lg text-xs font-semibold">{row.role}</span> },
    { key: 'status', label: 'Status', render: (row) => renderStatusBadge(row.status), className: 'text-center' }
  ];

  const filteredUsers = usersList.filter(u => {
    const matchRole = roleFilter ? u.role === roleFilter : true;
    const matchStatus = statusFilter ? u.status === statusFilter : true;
    return matchRole && matchStatus;
  });

  return (
    <div className="space-y-section-gap relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">User Management</h2>
          <p className="text-on-surface-variant mt-1 text-sm">
            Manage administrators, warehouse staff, store operators, and platform users across the enterprise network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setUsersList(USERS)}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all rounded-lg text-xs font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all rounded-lg text-xs font-bold">
            <span className="material-symbols-outlined text-[18px]">download</span> Export
          </button>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="shimmer-btn flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg font-bold transition-all shadow-lg active:scale-[0.98] text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span> Create User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <StatsCard title="Total Users" value={usersList.length} icon="group" trend="+12% up" trendType="up" subtitle="Across all regions" borderLeftColor="border-primary" />
        <StatsCard title="Active Users" value={usersList.filter(u => u.status === 'Active').length} icon="task_alt" trend="94% active" trendType="up" subtitle="Stable sessions" borderLeftColor="border-success-vibrant" />
        <StatsCard title="Locked Accounts" value={usersList.filter(u => u.status === 'Locked').length} icon="lock" trend="Critical" trendType="down" subtitle="Require audit" borderLeftColor="border-tertiary" />
        <StatsCard title="Warehouse Staff" value={usersList.filter(u => u.role.includes('Warehouse')).length} icon="warehouse" trend="Hubs" trendType="up" subtitle="Indore & Bhopal" borderLeftColor="border-primary-fixed-dim" />
      </div>

      <DataTable
        title="Active Directory"
        columns={columns}
        data={filteredUsers}
        searchKey="name"
        searchPlaceholder="Search by name..."
        filterNode={
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-on-surface outline-none"
            >
              <option value="">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Warehouse Manager">Warehouse Manager</option>
              <option value="Store Manager">Store Manager</option>
              <option value="Cashier">Cashier</option>
              <option value="Employee">Employee</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-on-surface outline-none"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Locked">Locked</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        }
      />

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col p-6 border-l border-outline-variant">
              <div className="flex justify-between items-center mb-6 border-b border-outline-variant pb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">person_add</span> Create New User
                </h3>
                <button onClick={() => setIsDrawerOpen(false)} className="material-symbols-outlined hover:text-error transition-colors">close</button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1">
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Enter full name"
                    className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  {errors.name && <p className="text-xs text-error mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Corporate Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="e.g. employee@safaibazaar.com"
                    className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">System Role</label>
                  <select
                    {...register('role')}
                    className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  >
                    <option value="">Select Role...</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Warehouse Manager">Warehouse Manager</option>
                    <option value="Store Manager">Store Manager</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Employee">Employee</option>
                  </select>
                  {errors.role && <p className="text-xs text-error mt-1">{errors.role.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Account Status</label>
                  <select
                    {...register('status')}
                    className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Locked">Locked</option>
                  </select>
                  {errors.status && <p className="text-xs text-error mt-1">{errors.status.message}</p>}
                </div>

                <div className="pt-6 border-t border-outline-variant mt-auto flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex-1 py-2.5 border border-outline-variant text-on-surface rounded-lg font-semibold hover:bg-surface-container-low transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-primary text-on-primary rounded-lg font-bold shadow-md hover:bg-primary/95 transition-colors text-sm"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
