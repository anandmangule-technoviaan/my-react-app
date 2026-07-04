import React, { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { PRODUCTS } from '@/constants/dummyData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const adjustStockSchema = z.object({
  quantity: z.number({ invalid_type_error: 'Quantity must be a number' }).min(1, { message: 'Quantity must be positive' }),
  notes: z.string().min(3, { message: 'Adjustment note is required' })
});

export default function WarehouseInventory() {
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(adjustStockSchema)
  });

  const onSubmit = (data) => {
    setProductsList(prev => prev.map(p => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          whStock: p.whStock + data.quantity,
          status: (p.whStock + data.quantity) > 1000 ? 'HEALTHY' : 'LOW STOCK'
        };
      }
      return p;
    }));
    
    toast.success(`Adjusted stock for ${selectedProduct.name} by +${data.quantity}`);
    setIsModalOpen(false);
    reset();
  };

  const columns = [
    { key: 'sku', label: 'SKU', render: (row) => <span className="font-mono text-xs">{row.sku}</span> },
    { key: 'name', label: 'Product Name', className: 'font-bold' },
    { key: 'category', label: 'Category' },
    { key: 'whStock', label: 'Warehouse Stock', render: (row) => <span className="font-bold">{row.whStock.toLocaleString()} Units</span>, className: 'text-right' },
    { 
      key: 'status', 
      label: 'Inventory Health', 
      render: (row) => (
        <span className={`px-2.5 py-0.5 border rounded-full text-xs font-bold ${
          row.status === 'HEALTHY' ? 'bg-success-vibrant/10 text-success-vibrant border-success-vibrant/20' : 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/20'
        }`}>
          {row.status}
        </span>
      ),
      className: 'text-center'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(row);
            setIsModalOpen(true);
          }}
          className="px-3 py-1 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          Adjust Stock
        </button>
      ),
      className: 'text-center'
    }
  ];

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Central Warehouse Inventory</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Real-time stock balance sheets and product replenishment ledgers.</p>
        </div>
      </div>

      <DataTable
        title="Stock Registry Ledger"
        columns={columns}
        data={productsList}
        searchKey="name"
        searchPlaceholder="Search by product name..."
      />

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-2xl shadow-xl border border-outline-variant max-w-md w-full p-6 relative z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant pb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">edit_square</span> Adjust Stock Level
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined hover:text-error transition-colors">close</button>
            </div>

            <div>
              <p className="text-sm font-bold text-on-surface">{selectedProduct.name}</p>
              <p className="text-xs text-on-surface-variant">Current Warehouse Stock: {selectedProduct.whStock.toLocaleString()} Units</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Replenishment Quantity</label>
                <input
                  type="number"
                  {...register('quantity', { valueAsNumber: true })}
                  placeholder="Enter amount to add..."
                  className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                {errors.quantity && <p className="text-xs text-error mt-1">{errors.quantity.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Reason/Notes</label>
                <textarea
                  {...register('notes')}
                  placeholder="Audit reference, PO details, or reasoning..."
                  className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  rows="3"
                />
                {errors.notes && <p className="text-xs text-error mt-1">{errors.notes.message}</p>}
              </div>

              <div className="pt-4 border-t border-outline-variant flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-outline-variant text-on-surface rounded-lg font-semibold hover:bg-surface-container-low transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-on-primary rounded-lg font-bold shadow-md hover:bg-primary/95 transition-colors text-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
