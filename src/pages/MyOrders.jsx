import React from 'react';
import DataTable from '@/components/common/DataTable';
import { ORDERS } from '@/constants/dummyData';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const navigate = useNavigate();
  const storeOrders = ORDERS.filter(o => o.storeCode === 'SB-IND-001');

  const columns = [
    { key: 'id', label: 'PO Reference', render: (row) => <span className="font-bold text-primary">{row.id}</span> },
    { key: 'createdDate', label: 'Date Issued' },
    { key: 'pickupDate', label: 'Expected Delivery' },
    { key: 'itemsCount', label: 'Product Lines', className: 'text-right' },
    { key: 'grandTotal', label: 'Grand Total', render: (row) => <span className="font-bold">₹{row.grandTotal.toLocaleString()}</span>, className: 'text-right' },
    { 
      key: 'status', 
      label: 'Fulfillment Status',
      render: (row) => (
        <span className={`px-2.5 py-0.5 border rounded-full text-xs font-bold ${
          row.status === 'Pending Approval' ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/20' : 'bg-success-vibrant/10 text-success-vibrant border-success-vibrant/20'
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
          <h2 className="text-2xl text-primary font-bold">Store Restock Orders</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Monitor stock replenishment requests, approve receipts, and fleet dispatch logs.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/create-order')}
          className="shimmer-btn flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg font-bold transition-all shadow-lg active:scale-[0.98] text-xs"
        >
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span> New Replenishment
        </button>
      </div>

      <DataTable
        title="Restock History Logs"
        columns={columns}
        data={storeOrders}
        searchKey="id"
        searchPlaceholder="Search PO ID..."
        onRowClick={(row) => navigate(`/dashboard/orders/${row.id}`)}
      />
    </div>
  );
}
