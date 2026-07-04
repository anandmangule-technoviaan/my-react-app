import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ORDERS, WAREHOUSES, ACTIVITY_LOGS } from '@/constants/dummyData';
import toast from 'react-hot-toast';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderId = id || 'ORD-2026-1054';

  const order = ORDERS.find(o => o.id === orderId) || ORDERS[0];
  const [approvalNotes, setApprovalNotes] = useState('');
  const [notifyStore, setNotifyStore] = useState(true);
  const [notifyWarehouse, setNotifyWarehouse] = useState(true);
  const [orderStatus, setOrderStatus] = useState(order.status);
  
  const handleApprove = () => {
    setOrderStatus('Approved & Dispatched');
    toast.success(`Order ${order.id} approved successfully!`);
    setTimeout(() => {
      navigate('/dashboard/orders');
    }, 1000);
  };

  const handleReject = () => {
    setOrderStatus('Rejected');
    toast.error(`Order ${order.id} rejected.`);
    setTimeout(() => {
      navigate('/dashboard/orders');
    }, 1000);
  };

  return (
    <div className="space-y-section-gap flex-1 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl text-primary font-bold">Order #{order.id}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
              orderStatus === 'Pending Approval' 
                ? 'bg-tertiary-fixed text-on-tertiary-fixed' 
                : 'bg-success-vibrant/10 text-success-vibrant'
            }`}>
              <span className="material-symbols-outlined text-[14px]">
                {orderStatus === 'Pending Approval' ? 'pending' : 'check_circle'}
              </span> 
              {orderStatus}
            </span>
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-semibold">
              Priority: {order.priority}
            </span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium">
            Invoice {order.invoiceNo} • Submitted by {order.storeName}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all rounded-lg text-xs font-bold"
          >
            <span className="material-symbols-outlined text-sm">print</span> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all rounded-lg text-xs font-bold">
            <span className="material-symbols-outlined text-sm">download</span> Invoice
          </button>
          {orderStatus === 'Pending Approval' && (
            <>
              <button 
                onClick={handleReject}
                className="flex items-center gap-2 px-4 py-2 border border-error text-error hover:bg-error-container transition-all rounded-lg text-xs font-bold active:scale-[0.98]"
              >
                Reject Order
              </button>
              <button 
                onClick={handleApprove}
                className="shimmer-btn flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg font-bold transition-all shadow-lg active:scale-[0.98] text-xs"
              >
                Approve Order
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div className="relative flex justify-between flex-wrap md:flex-nowrap gap-y-4 md:gap-y-0">
          <div className="absolute top-[18px] left-[5%] right-[5%] h-[2px] bg-outline-variant hidden md:block">
            <div className={`h-full bg-primary transition-all duration-700 ${
              orderStatus === 'Pending Approval' ? 'w-[40%]' : 'w-[100%]'
            }`}></div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-sm">check</span>
            </div>
            <span className="text-xs text-on-surface font-bold text-center">Store Created</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-sm">check</span>
            </div>
            <span className="text-xs text-on-surface font-bold text-center">Invoice Generated</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
              orderStatus === 'Pending Approval' 
                ? 'bg-surface-container-highest border-2 border-primary text-primary animate-pulse' 
                : 'bg-primary text-on-primary'
            }`}>
              <span className="material-symbols-outlined text-sm">
                {orderStatus === 'Pending Approval' ? 'pending' : 'check'}
              </span>
            </div>
            <span className={`text-xs font-bold text-center ${
              orderStatus === 'Pending Approval' ? 'text-primary' : 'text-on-surface'
            }`}>
              Admin Approval
            </span>
          </div>

          <div className={`relative z-10 flex flex-col items-center gap-2 flex-1 ${orderStatus === 'Pending Approval' ? 'opacity-50' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              orderStatus === 'Pending Approval' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-primary text-on-primary'
            }`}>
              <span className="material-symbols-outlined text-sm">warehouse</span>
            </div>
            <span className="text-xs text-on-surface-variant text-center">Warehouse Dispatch</span>
          </div>

          <div className={`relative z-10 flex flex-col items-center gap-2 flex-1 ${orderStatus === 'Pending Approval' ? 'opacity-50' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              orderStatus === 'Pending Approval' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-primary text-on-primary'
            }`}>
              <span className="material-symbols-outlined text-sm">local_shipping</span>
            </div>
            <span className="text-xs text-on-surface-variant text-center">Store Pickup</span>
          </div>

          <div className={`relative z-10 flex flex-col items-center gap-2 flex-1 ${orderStatus === 'Pending Approval' ? 'opacity-50' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              orderStatus === 'Pending Approval' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-primary text-on-primary'
            }`}>
              <span className="material-symbols-outlined text-sm">task_alt</span>
            </div>
            <span className="text-xs text-on-surface-variant text-center">Completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 space-y-gutter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            
            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/30 border-l-4 border-primary">
              <h3 className="text-xs font-bold text-on-surface-variant mb-4 uppercase">Store Information</h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-base text-primary font-bold">SafaiBazaar Indore</span>
                  <span className="text-on-surface-variant text-xs">{order.storeCode}</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">call</span> +91 98765 43210</p>
                  <p className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">badge</span> GST: 23AAAAA0000A1Z5</p>
                </div>
                <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-on-surface-variant uppercase font-bold">Credit Limit</span>
                    <span className="font-bold text-sm">₹ 5,00,000</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] text-on-surface-variant uppercase font-bold">Balance</span>
                    <span className="font-bold text-sm text-success-vibrant">₹ 1,24,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/30 border-l-4 border-primary-fixed-dim">
              <h3 className="text-xs font-bold text-on-surface-variant mb-4 uppercase">Logistics & Timeline</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-on-surface-variant uppercase font-bold">Created Date</span>
                    <span className="text-xs font-bold">{order.createdDate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-on-surface-variant uppercase font-bold">Exp. Pickup</span>
                    <span className="text-xs font-bold">{order.pickupDate}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-on-surface-variant uppercase font-bold">Delivery Method</span>
                  <span className="text-xs font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    {order.method}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-on-surface-variant uppercase font-bold">Created By</span>
                  <span className="text-xs font-bold">{order.createdBy}</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/30 border-l-4 border-success-vibrant">
              <h3 className="text-xs font-bold text-on-surface-variant mb-4 uppercase">Warehouse Analytics</h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-on-surface-variant uppercase font-bold">Fulfillment Source</span>
                  <span className="text-base text-on-surface font-bold">Central Hub West</span>
                </div>
                <div className="p-3 bg-success-vibrant/10 rounded-lg border border-success-vibrant/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-success-vibrant font-bold text-[10px]">Inventory Health</span>
                    <span className="text-success-vibrant font-bold text-[10px]">94%</span>
                  </div>
                  <div className="w-full bg-success-vibrant/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-success-vibrant h-full w-[94%]"></div>
                  </div>
                </div>
                <p className="text-on-surface-variant text-[10px]">All items are available for immediate dispatch. No low stock alerts.</p>
              </div>
            </div>

          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
            <div className="p-5 border-b border-outline-variant/30 flex justify-between items-center bg-white">
              <h3 className="text-base text-primary font-bold">Ordered Products</h3>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface font-bold rounded-lg text-[10px]">
                {order.itemsCount} Categories • {order.totalQty} Units
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">SKU / Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">WH Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Requested</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex-shrink-0 overflow-hidden flex items-center justify-center font-bold text-primary text-xs">
                            HMX
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-on-surface">{item.name}</span>
                            <span className="text-on-surface-variant text-[11px]">Industrial Grade (5L)</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-xs">{item.sku}</span>
                          <span className="text-on-surface-variant text-[9px] uppercase font-bold">{item.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-xs font-medium">{item.whStock.toLocaleString()} Units</td>
                      <td className="px-6 py-4 text-right text-xs font-bold text-primary">{item.requested} Units</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'HEALTHY' ? 'bg-success-vibrant/10 text-success-vibrant' : 'bg-tertiary-fixed text-on-tertiary-fixed'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-gutter">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30">
            <h3 className="text-base text-on-surface mb-6 font-bold">Financial Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Items</span>
                <span className="font-medium">{order.itemsCount} Items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Quantity</span>
                <span className="font-medium">{order.totalQty.toLocaleString()} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-medium">₹ {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">GST (18%)</span>
                <span className="font-medium">₹ {order.gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-error font-medium">
                <span>Discount</span>
                <span>- ₹ {order.discount.toLocaleString()}</span>
              </div>
              <div className="pt-4 mt-2 border-t border-dashed border-outline-variant/30 flex justify-between items-end">
                <span className="font-bold text-sm">Grand Total</span>
                <span className="font-bold text-lg text-primary">₹ {order.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {orderStatus === 'Pending Approval' && (
            <div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h3 className="text-base font-bold">Approval Center</h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-on-primary/80 font-bold uppercase">Approval Notes (Internal)</label>
                    <textarea 
                      value={approvalNotes}
                      onChange={(e) => setApprovalNotes(e.target.value)}
                      className="w-full bg-primary-container border-none rounded-lg text-on-primary-container p-3 text-xs focus:ring-2 focus:ring-primary-fixed-dim outline-none" 
                      placeholder="Add warehouse instructions or audit notes..." 
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={notifyStore}
                        onChange={(e) => setNotifyStore(e.target.checked)}
                        className="w-4 h-4 rounded border-none bg-primary-container text-primary-fixed-dim focus:ring-0"
                      />
                      <span className="text-xs font-semibold group-hover:text-primary-fixed-dim transition-colors">Notify Store Manager</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={notifyWarehouse}
                        onChange={(e) => setNotifyWarehouse(e.target.checked)}
                        className="w-4 h-4 rounded border-none bg-primary-container text-primary-fixed-dim focus:ring-0"
                      />
                      <span className="text-xs font-semibold group-hover:text-primary-fixed-dim transition-colors">Notify Warehouse Team</span>
                    </label>
                  </div>
                  <div className="flex flex-col gap-3 pt-4">
                    <button 
                      onClick={handleApprove}
                      className="shimmer-btn w-full bg-white text-primary py-3 rounded-xl font-bold shadow-xl active:scale-[0.98] transition-transform text-xs"
                    >
                      Approve & Dispatch
                    </button>
                    <button 
                      onClick={() => toast.success('Modifications request sent.')}
                      className="w-full py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-colors active:scale-[0.98] text-xs"
                    >
                      Request Modifications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30">
            <h3 className="text-base text-on-surface mb-6 font-bold">Activity Audit</h3>
            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/30">
              {ACTIVITY_LOGS.map((log) => (
                <div key={log.id} className="relative pl-10">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center z-10 font-bold text-xs text-primary">
                    {log.user.charAt(0)}
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold">{log.action}</span>
                    <span className="text-on-surface-variant">{log.user} • {log.time}</span>
                    {log.notes && (
                      <p className="text-on-surface-variant mt-1 italic">"{log.notes}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
