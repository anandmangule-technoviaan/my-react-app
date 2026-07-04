import React from 'react';
import StatsCard from '@/components/common/StatsCard';
import ChartCard from '@/components/common/ChartCard';
import DataTable from '@/components/common/DataTable';
import { SALES_DATA, ORDERS } from '@/constants/dummyData';
import { useNavigate } from 'react-router-dom';

export default function StoreDashboard() {
  const navigate = useNavigate();
  const storeOrders = ORDERS.filter(o => o.storeCode === 'SB-IND-001');

  const columns = [
    { key: 'id', label: 'Order ID', render: (row) => <span className="font-bold text-primary">{row.id}</span> },
    { key: 'createdDate', label: 'Created Date' },
    { key: 'totalQty', label: 'Requested Units', className: 'text-right' },
    { key: 'grandTotal', label: 'Total Value', render: (row) => <span className="font-bold">₹{row.grandTotal.toLocaleString()}</span>, className: 'text-right' },
    { 
      key: 'status', 
      label: 'Fulfillment Status',
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
          <h2 className="text-2xl text-primary font-bold">SafaiBazaar Indore Store Dashboard</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Store ID: SB-IND-001 • Location: Indore Central</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/dashboard/create-order')}
            className="shimmer-btn flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg font-bold transition-all shadow-lg active:scale-[0.98] text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span> New Replenishment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <StatsCard title="Credit Limit" value="₹5,00,000" icon="credit_card" subtitle="Approved limit" borderLeftColor="border-primary" />
        <StatsCard title="Available Balance" value="₹1,24,000" icon="payments" trend="Healthy" trendType="up" subtitle="Liquidity pool" borderLeftColor="border-success-vibrant" />
        <StatsCard title="Active Replenishments" value={storeOrders.length} icon="hourglass_empty" trend="1 Pending" trendType="down" subtitle="Inbound stock" borderLeftColor="border-tertiary" />
        <StatsCard title="Today's Local Sales" value="₹48,500" icon="point_of_sale" trend="+18%" trendType="up" subtitle="Retail register" borderLeftColor="border-primary-fixed-dim" />
      </div>

      <ChartCard 
        title="Store Sales Performance" 
        type="area" 
        data={SALES_DATA} 
        keys={['revenue']} 
        labels={['Revenue (₹)']} 
        colors={['#005c55']}
      />

      <DataTable
        title="Store Replenishment Orders"
        columns={columns}
        data={storeOrders}
        searchKey="id"
        searchPlaceholder="Search order reference..."
        onRowClick={(row) => navigate(`/dashboard/orders/${row.id}`)}
      />
    </div>
  );
}
