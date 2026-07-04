import React, { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { ORDERS } from '@/constants/dummyData';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');

  const columns = [
    { key: 'id', label: 'Order #', render: (row) => <span className="font-bold text-primary">{row.id}</span> },
    { key: 'storeName', label: 'Origin Store', className: 'font-semibold' },
    { key: 'createdDate', label: 'Created Date' },
    { key: 'totalQty', label: 'Quantity', render: (row) => <span>{row.totalQty.toLocaleString()} Units</span>, className: 'text-right' },
    { key: 'grandTotal', label: 'Total Value', render: (row) => <span className="font-bold">₹{row.grandTotal.toLocaleString()}</span>, className: 'text-right' },
    { 
      key: 'status', 
      label: 'Fulfillment Status',
      render: (row) => {
        const isPending = row.status === 'Pending Approval';
        return (
          <span className={`px-2.5 py-0.5 border rounded-full text-xs font-bold ${
            isPending 
              ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/10' 
              : 'bg-success-vibrant/10 text-success-vibrant border-success-vibrant/10'
          }`}>
            {row.status}
          </span>
        );
      },
      className: 'text-center'
    }
  ];

  const filteredOrders = statusFilter 
    ? ORDERS.filter(o => o.status === statusFilter)
    : ORDERS;

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Orders Management</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Track retail purchase orders, invoice approvals, and fleet shipments.</p>
        </div>
      </div>

      <DataTable
        title="Purchase Orders list"
        columns={columns}
        data={filteredOrders}
        searchKey="id"
        searchPlaceholder="Search by order ID (e.g. ORD-2026-1054)..."
        onRowClick={(row) => navigate(`/dashboard/orders/${row.id}`)}
        filterNode={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs font-semibold text-on-surface outline-none"
          >
            <option value="">All Statuses</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Dispatched">Dispatched</option>
          </select>
        }
      />
    </div>
  );
}
