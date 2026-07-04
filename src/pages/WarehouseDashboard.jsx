import React from 'react';
import StatsCard from '@/components/common/StatsCard';
import ChartCard from '@/components/common/ChartCard';
import DataTable from '@/components/common/DataTable';
import { PRODUCTS, ORDERS } from '@/constants/dummyData';
import { useNavigate } from 'react-router-dom';

export default function WarehouseDashboard() {
  const navigate = useNavigate();
  const dispatchOrders = ORDERS;

  const columns = [
    { key: 'id', label: 'Order #', render: (row) => <span className="font-bold text-primary">{row.id}</span> },
    { key: 'storeName', label: 'Destination Store', className: 'font-semibold' },
    { key: 'totalQty', label: 'Total Units', className: 'text-right' },
    { key: 'method', label: 'Carrier Method' },
    { 
      key: 'status', 
      label: 'Action Status',
      render: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-container text-on-primary-container">
          Approved & Ready
        </span>
      ),
      className: 'text-center'
    }
  ];

  const stockChartData = [
    { name: 'HMX Floor', stock: 4500 },
    { name: 'HMX Glass', stock: 850 },
    { name: 'HMX Hand', stock: 12000 },
    { name: 'HMX Toilet', stock: 5200 },
    { name: 'HMX Phenyl', stock: 7800 }
  ];

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Indore Central Warehouse Hub</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Manage chemical storage stocks, order dispatches, and fleet cargo loading.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/warehouse-inventory')}
          className="shimmer-btn flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg font-bold transition-all shadow-lg active:scale-[0.98] text-xs"
        >
          <span className="material-symbols-outlined text-[18px]">inventory_2</span> Open Stock Ledger
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <StatsCard title="Total Stock (Volume)" value="35.5k Units" icon="warehouse" trend="94% capacity" trendType="up" borderLeftColor="border-primary" />
        <StatsCard title="Pending Dispatches" value={ORDERS.filter(o => o.status === 'Pending Approval').length} icon="pending_actions" trend="Immediate" trendType="down" borderLeftColor="border-tertiary" />
        <StatsCard title="Inbound Deliveries" value="8 Shipments" icon="download" trend="Scheduled" trendType="up" borderLeftColor="border-success-vibrant" />
        <StatsCard title="Active Cargo Fleet" value="14 Vehicles" icon="local_shipping" trend="En Route" trendType="up" borderLeftColor="border-primary-fixed-dim" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8">
          <ChartCard 
            title="Stock Levels by Product" 
            type="bar" 
            data={stockChartData} 
            keys={['stock']} 
            labels={['Available Units']} 
            colors={['#00433d']}
          />
        </div>

        <div className="lg:col-span-4 bg-white rounded-xl border border-outline-variant/20 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg text-primary font-bold mb-4">Hub Logistics</h3>
            <p className="text-xs text-on-surface-variant mb-6">Manage distribution load lists, route plans, and shipping manifests.</p>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3.5 bg-surface rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all group">
              <span className="font-bold text-xs text-left">Route Plan (Indore-Bhopal)</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button className="w-full flex items-center justify-between p-3.5 bg-surface rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all group">
              <span className="font-bold text-xs text-left">Security Gate Logs</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <DataTable
        title="Approved Store Dispatches"
        columns={columns}
        data={dispatchOrders}
        searchKey="id"
        searchPlaceholder="Search order ID..."
        onRowClick={(row) => navigate(`/dashboard/orders/${row.id}`)}
      />
    </div>
  );
}
