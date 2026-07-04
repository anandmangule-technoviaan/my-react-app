import React from 'react';
import StatsCard from '@/components/common/StatsCard';
import ChartCard from '@/components/common/ChartCard';
import DataTable from '@/components/common/DataTable';
import { SALES_DATA, ORDERS } from '@/constants/dummyData';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const columns = [
    { key: 'id', label: 'Order #', render: (row) => <span className="font-bold text-primary">{row.id}</span> },
    { key: 'storeName', label: 'Origin Store', className: 'font-semibold' },
    { key: 'createdDate', label: 'Date' },
    { key: 'grandTotal', label: 'Grand Total', render: (row) => <span className="font-bold">₹{row.grandTotal.toLocaleString()}</span>, className: 'text-right' },
    { 
      key: 'status', 
      label: 'Status', 
      render: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
          row.status === 'Pending Approval' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-success-vibrant/10 text-success-vibrant'
        }`}>
          {row.status}
        </span>
      ),
      className: 'text-center'
    }
  ];

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Admin Central Workspace</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Monitor order pipeline processing, catalog adjustments, and retail transfers.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/products')}
          className="shimmer-btn flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg font-bold transition-all shadow-lg active:scale-[0.98] text-xs"
        >
          <span className="material-symbols-outlined text-[18px]">inventory</span> Manage Products
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <StatsCard title="Orders in Pipeline" value={ORDERS.length} icon="receipt_long" trend="3 Pending" trendType="up" borderLeftColor="border-primary" />
        <StatsCard title="Completed Dispatches" value="128" icon="local_shipping" trend="+15% MoM" trendType="up" borderLeftColor="border-success-vibrant" />
        <StatsCard title="Low Stock Alerts" value="4 Products" icon="warning" trend="Action Needed" trendType="down" borderLeftColor="border-tertiary" />
        <StatsCard title="Weekly Transaction Total" value="₹4.85 Lakh" icon="account_balance" trend="Stable" trendType="up" borderLeftColor="border-primary-fixed-dim" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8">
          <ChartCard 
            title="Weekly Dispatch Revenue" 
            type="area" 
            data={SALES_DATA} 
            keys={['revenue']} 
            labels={['Revenue (₹)']} 
            colors={['#00433d']}
          />
        </div>

        <div className="lg:col-span-4 bg-white rounded-xl border border-outline-variant/20 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg text-primary font-bold mb-4">Operations Center</h3>
            <p className="text-xs text-on-surface-variant mb-6">Quick actions to adjust settings or add logistics fleet entities.</p>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3.5 bg-surface rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all group">
              <span className="font-bold text-xs text-left">Configure Fleet Schedules</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button className="w-full flex items-center justify-between p-3.5 bg-surface rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all group">
              <span className="font-bold text-xs text-left">Update Store Credit Limits</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/reports')}
              className="w-full flex items-center justify-between p-3.5 bg-surface rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all group"
            >
              <span className="font-bold text-xs text-left">Generate GST Report</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <DataTable
        title="Recent Orders Pipeline"
        columns={columns}
        data={ORDERS}
        searchKey="id"
        searchPlaceholder="Search order ID (e.g. ORD-2026-1054)..."
        onRowClick={(row) => navigate(`/dashboard/orders/${row.id}`)}
      />
    </div>
  );
}
