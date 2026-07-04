import React, { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { ORDERS } from '@/constants/dummyData';
import toast from 'react-hot-toast';

export default function WarehouseDispatch() {
  const [dispatchList, setDispatchList] = useState(() => 
    ORDERS.map(o => ({ ...o, dispatchStatus: 'Ready' }))
  );

  const handleStartDispatch = (id) => {
    setDispatchList(prev => prev.map(o => {
      if (o.id === id) {
        return { ...o, dispatchStatus: 'Shipped' };
      }
      return o;
    }));
    toast.success(`Shipment Gatepass generated for ${id}. Fleet dispatch active.`);
  };

  const columns = [
    { key: 'id', label: 'Shipment ID', render: (row) => <span className="font-bold text-primary">{row.id}</span> },
    { key: 'storeName', label: 'Destination' },
    { key: 'method', label: 'Shipping Fleet' },
    { key: 'totalQty', label: 'Items Quantity', render: (row) => <span>{row.totalQty} Units</span>, className: 'text-right' },
    { 
      key: 'dispatchStatus', 
      label: 'Fulfillment State', 
      render: (row) => (
        <span className={`px-2.5 py-0.5 border rounded-full text-xs font-bold ${
          row.dispatchStatus === 'Ready' ? 'bg-primary-container text-on-primary-container border-primary/20' : 'bg-success-vibrant/10 text-success-vibrant border-success-vibrant/20'
        }`}>
          {row.dispatchStatus === 'Ready' ? 'READY FOR LOADS' : 'IN TRANSIT'}
        </span>
      ),
      className: 'text-center'
    },
    {
      key: 'action',
      label: 'Dispatch Actions',
      render: (row) => (
        <button
          onClick={() => handleStartDispatch(row.id)}
          disabled={row.dispatchStatus === 'Shipped'}
          className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-sm disabled:opacity-40"
        >
          {row.dispatchStatus === 'Ready' ? 'Ship Order' : 'Dispatched'}
        </button>
      ),
      className: 'text-center'
    }
  ];

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Logistics & Cargo Dispatch</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Track approved cargo volumes, print logistics barcodes, and issue security gatepasses.</p>
        </div>
      </div>

      <DataTable
        title="Ready to Ship Deliveries"
        columns={columns}
        data={dispatchList}
        searchKey="id"
        searchPlaceholder="Search shipment ID..."
      />
    </div>
  );
}
