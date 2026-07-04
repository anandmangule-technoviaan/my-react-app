import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const refundSchema = z.object({
  receiptNo: z.string().min(6, { message: 'Enter a valid receipt reference' }),
  reason: z.string().min(3, { message: 'Return reason details are required' }),
  qtyToReturn: z.number({ invalid_type_error: 'Enter a valid count' }).min(1, { message: 'Quantity must be positive' })
});

export default function ReturnsRefunds() {
  const [activeRefundDetails, setActiveRefundDetails] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(refundSchema)
  });

  const onSubmit = (data) => {
    setActiveRefundDetails({
      refundId: 'REF-' + Math.floor(100000 + Math.random() * 900000),
      receiptNo: data.receiptNo,
      reason: data.reason,
      qty: data.qtyToReturn,
      amount: data.qtyToReturn * 650.00
    });
    toast.success('Refund processed successfully!');
    reset();
  };

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Returns & Refund Ledger</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Issue retail cash refunds, log damaged stock returns, and verify receipts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-4">
          <h3 className="text-lg text-primary font-bold mb-4">Refund Request</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Original Receipt Number</label>
              <input
                type="text"
                {...register('receiptNo')}
                placeholder="e.g. RX-748392"
                className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              {errors.receiptNo && <p className="text-xs text-error mt-1">{errors.receiptNo.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Quantity to Return</label>
                <input
                  type="number"
                  {...register('qtyToReturn', { valueAsNumber: true })}
                  placeholder="1"
                  className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                {errors.qtyToReturn && <p className="text-xs text-error mt-1">{errors.qtyToReturn.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Return Type</label>
                <select className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm">
                  <option>Refund to Original Mode</option>
                  <option>Store Credit / Voucher</option>
                  <option>Product Replacement</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Reason for Return</label>
              <textarea
                {...register('reason')}
                placeholder="Leakage, seal broken, incorrect item purchased, etc..."
                className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                rows="3"
              />
              {errors.reason && <p className="text-xs text-error mt-1">{errors.reason.message}</p>}
            </div>

            <button
              type="submit"
              className="shimmer-btn w-full py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg active:scale-[0.98] transition-transform text-xs"
            >
              Issue Refund
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg text-primary font-bold mb-4">Refund Receipt Detail</h3>
            
            {activeRefundDetails ? (
              <div className="space-y-4 font-mono text-xs border border-dashed border-outline-variant p-4 bg-surface rounded-xl">
                <div className="text-center pb-2 border-b border-dashed border-outline-variant font-bold text-primary">REFUND SUCCESSFUL</div>
                <div className="flex justify-between">
                  <span>Refund ID:</span>
                  <span className="font-bold">{activeRefundDetails.refundId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Receipt Ref:</span>
                  <span className="font-bold">{activeRefundDetails.receiptNo}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity Returned:</span>
                  <span>{activeRefundDetails.qty} Unit(s)</span>
                </div>
                <div className="flex justify-between font-bold text-primary pt-2 border-t border-dashed border-outline-variant font-sans">
                  <span>Amount Refunded:</span>
                  <span>₹ {activeRefundDetails.amount.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-outline italic mt-2">Notes: "{activeRefundDetails.reason}"</p>
              </div>
            ) : (
              <div className="text-center py-12 text-outline flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl">receipt</span>
                <span className="text-xs font-semibold">Submit a request to generate a refund receipt.</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl text-xs text-on-surface-variant mt-6">
            <p className="font-bold mb-1">Standard POS Refund Rule:</p>
            <p>Chemical products require store manager confirmation for spill returns. Ensure original container is inspected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
