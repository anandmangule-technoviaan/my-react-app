import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PRODUCTS } from '@/constants/dummyData';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const orderSchema = z.object({
  warehouse: z.string().min(1, { message: 'Warehouse selection is required' }),
  carrier: z.string().min(1, { message: 'Carrier method is required' }),
  items: z.array(z.object({
    productId: z.number({ invalid_type_error: 'Select a product' }),
    quantity: z.number({ invalid_type_error: 'Enter quantity' }).min(1, { message: 'Must be positive' })
  })).min(1, { message: 'Add at least one product' })
});

export default function CreateOrder() {
  const navigate = useNavigate();

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      warehouse: 'Central Hub West',
      carrier: 'Enterprise Fleet (LTL)',
      items: [{ productId: 1, quantity: 100 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const watchedItems = watch('items') || [];
  
  const calculateTotals = () => {
    let subtotal = 0;
    watchedItems.forEach((item) => {
      const prod = PRODUCTS.find(p => p.id === Number(item.productId));
      if (prod && item.quantity) {
        subtotal += prod.price * Number(item.quantity);
      }
    });

    const gst = subtotal * 0.18;
    const discount = subtotal > 100000 ? 5000 : 0;
    const grandTotal = subtotal + gst - discount;

    return { subtotal, gst, discount, grandTotal };
  };

  const { subtotal, gst, discount, grandTotal } = calculateTotals();

  const onSubmit = (data) => {
    toast.success('Replenishment Purchase Order submitted successfully!');
    setTimeout(() => {
      navigate('/dashboard/store');
    }, 1000);
  };

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Create Purchase Restock Order</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Issue replenishment orders to dispatch lines from central warehouses.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 space-y-gutter">
          
          <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-4">
            <h3 className="text-lg text-primary font-bold mb-4">Logistics Routing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Fulfillment Warehouse</label>
                <select 
                  {...register('warehouse')}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
                >
                  <option value="Central Hub West">Central Hub West (Indore)</option>
                  <option value="Central Hub North">Central Hub North (Delhi)</option>
                </select>
                {errors.warehouse && <p className="text-xs text-error mt-1">{errors.warehouse.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Carrier Dispatch Method</label>
                <select 
                  {...register('carrier')}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white font-medium"
                >
                  <option value="Enterprise Fleet (LTL)">Enterprise Fleet (LTL)</option>
                  <option value="Express Third-Party Logistics">Express Third-Party Logistics</option>
                </select>
                {errors.carrier && <p className="text-xs text-error mt-1">{errors.carrier.message}</p>}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-primary font-bold">Line Items Checklist</h3>
              <button 
                type="button"
                onClick={() => append({ productId: 1, quantity: 100 })}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-95 active:scale-95 transition-all shadow-sm"
              >
                Add Line Item
              </button>
            </div>

            {errors.items && <p className="text-sm text-error">{errors.items.message}</p>}

            <div className="space-y-3">
              {fields.map((field, index) => {
                const selectedId = watchedItems[index]?.productId;
                const selectedProd = PRODUCTS.find(p => p.id === Number(selectedId));

                return (
                  <div key={field.id} className="flex flex-col md:flex-row gap-4 items-stretch md:items-center p-4 bg-surface rounded-xl border border-outline-variant/20">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Select Product SKU</label>
                      <select
                        {...register(`items.${index}.productId`, { valueAsNumber: true })}
                        className="w-full bg-white border border-outline-variant rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-primary"
                      >
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.id}>{p.name} (₹{p.price}/unit)</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full md:w-32">
                      <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Quantity</label>
                      <input
                        type="number"
                        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                        className="w-full bg-white border border-outline-variant rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="w-full md:w-28 text-right flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-outline uppercase">Line Total</span>
                      <span className="font-bold text-xs text-primary mt-1">
                        ₹ {selectedProd ? (selectedProd.price * (watchedItems[index]?.quantity || 0)).toLocaleString() : '0.00'}
                      </span>
                    </div>

                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                        className="p-2 text-error hover:bg-error-container rounded-lg disabled:opacity-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-gutter">
          <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-6">
            <h3 className="text-lg text-primary font-bold">Summary</h3>
            
            <div className="space-y-3 text-xs border-b border-outline-variant pb-4">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Lines count</span>
                <span className="font-medium">{watchedItems.length} Products</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-medium">₹ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">GST (18%)</span>
                <span className="font-medium">₹ {gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-error font-medium">
                <span>Enterprise discount</span>
                <span>- ₹ {discount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="font-bold text-sm">Grand Total</span>
              <span className="font-bold text-lg text-primary">₹ {grandTotal.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              className="shimmer-btn w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-xs"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              Submit Purchase Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
