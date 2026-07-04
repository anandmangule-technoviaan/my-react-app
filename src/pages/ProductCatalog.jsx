import React, { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { PRODUCTS } from '@/constants/dummyData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const productSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters' }),
  sku: z.string().min(3, { message: 'SKU must be at least 3 characters' }),
  category: z.string().min(2, { message: 'Category is required' }),
  brand: z.string().min(2, { message: 'Brand is required' }),
  price: z.number({ invalid_type_error: 'Price must be a number' }).min(1, { message: 'Price must be positive' }),
  whStock: z.number().min(0, { message: 'Stock cannot be negative' })
});

export default function ProductCatalog({ isManagementMode = false }) {
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand: 'HMX',
      category: 'Chemicals'
    }
  });

  const onSubmit = (data) => {
    const newProduct = {
      id: productsList.length + 1,
      sku: data.sku.toUpperCase(),
      name: data.name,
      category: data.category,
      brand: data.brand,
      price: data.price,
      whStock: data.whStock,
      storeStock: 0,
      status: data.whStock > 100 ? 'HEALTHY' : 'LOW STOCK',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAig60Tqt48UDFD2I64Mg9__BUtVGGCuW8wmz7ZPTi5yK8BUhBVG7HG9V-5QOET800-T1A2lJ-odySW65gphkUrdJRZME0-RFe1kEfhbOKFKJ0dRvUhgWN2BBUVUkj6YpAX397ktMAfhxaEJLxMLBzJRblrB09WXnGy8PQvBZtB2WFL1r-69HfDJQhVzS-fppjkfwZ915E7Cr9suqzhZqdC479rOnxE5JXWHhSeNB2L1nYagnzlBKIesAT0BKukRMANhVxIrzB15O0'
    };

    setProductsList(prev => [newProduct, ...prev]);
    toast.success('Product added to catalog successfully!');
    setIsModalOpen(false);
    reset();
  };

  const columns = [
    {
      key: 'product',
      label: 'Product Details',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-highest overflow-hidden flex items-center justify-center font-bold text-primary text-xs">
            HMX
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-on-surface">{row.name}</span>
            <span className="text-xs text-outline">{row.brand}</span>
          </div>
        </div>
      )
    },
    { key: 'sku', label: 'SKU Code', render: (row) => <span className="font-mono text-xs">{row.sku}</span> },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Unit Price', render: (row) => <span className="font-bold">₹{row.price.toFixed(2)}</span>, className: 'text-right' },
    { key: 'whStock', label: 'Central WH Stock', render: (row) => <span>{row.whStock.toLocaleString()} Units</span>, className: 'text-right' },
    {
      key: 'status',
      label: 'Stock Health',
      render: (row) => (
        <span className={`px-2.5 py-0.5 border rounded-full text-xs font-bold ${
          row.status === 'HEALTHY' ? 'bg-success-vibrant/10 text-success-vibrant border-success-vibrant/20' : 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/20'
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
          <h2 className="text-2xl text-primary font-bold">
            {isManagementMode ? 'Catalog & Inventory Management' : 'Products & Catalog Reference'}
          </h2>
          <p className="text-on-surface-variant mt-1 text-sm">
            {isManagementMode ? 'Manage system SKU codes, product brand mappings, and pricing formulas.' : 'View details, pricing lists, and available stock levels.'}
          </p>
        </div>
        
        {isManagementMode && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="shimmer-btn flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-lg font-bold transition-all shadow-lg active:scale-[0.98] text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span> Add Product SKU
          </button>
        )}
      </div>

      <DataTable
        title="Product Inventory Catalog"
        columns={columns}
        data={productsList}
        searchKey="name"
        searchPlaceholder="Search products..."
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-2xl shadow-xl border border-outline-variant max-w-md w-full p-6 relative z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant pb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">add_circle</span> Add New Product SKU
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined hover:text-error transition-colors">close</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Product Name</label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="e.g. HMX Toilet Cleaner 5L"
                  className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                {errors.name && <p className="text-xs text-error mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">SKU Code</label>
                  <input
                    type="text"
                    {...register('sku')}
                    placeholder="e.g. SB-CLN-TL-5L"
                    className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  {errors.sku && <p className="text-xs text-error mt-1">{errors.sku.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Category</label>
                  <input
                    type="text"
                    {...register('category')}
                    placeholder="e.g. Chemicals"
                    className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  {errors.category && <p className="text-xs text-error mt-1">{errors.category.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { valueAsNumber: true })}
                    placeholder="650.00"
                    className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  {errors.price && <p className="text-xs text-error mt-1">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Starting Stock</label>
                  <input
                    type="number"
                    {...register('whStock', { valueAsNumber: true })}
                    placeholder="100"
                    className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  {errors.whStock && <p className="text-xs text-error mt-1">{errors.whStock.message}</p>}
                </div>
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
