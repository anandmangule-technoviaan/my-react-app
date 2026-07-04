import React, { useState } from 'react';
import DataTable from '@/components/common/DataTable';

export default function SalesHistory() {
  const [salesRecords, setSalesRecords] = useState([
    { id: 1, receiptNo: 'RX-748392', date: 'Oct 24, 2026, 11:20 AM', itemsCount: 3, totalAmount: 1650.00, cashier: 'Priya Cashier', items: [
      { id: 1, name: 'HMX Floor Cleaner 5L', price: 650.00, qty: 2 },
      { id: 2, name: 'HMX Glass Cleaner 5L', price: 450.00, qty: 1 }
    ], subtotal: 1398.30, gst: 251.70 },
    { id: 2, receiptNo: 'RX-129402', date: 'Oct 23, 2026, 04:15 PM', itemsCount: 1, totalAmount: 520.00, cashier: 'Priya Cashier', items: [
      { id: 3, name: 'HMX Hand Wash 5L', price: 520.00, qty: 1 }
    ], subtotal: 440.67, gst: 79.33 }
  ]);

  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const columns = [
    { key: 'receiptNo', label: 'Receipt #', render: (row) => <span className="font-mono font-bold text-primary">{row.receiptNo}</span> },
    { key: 'date', label: 'Date/Time' },
    { key: 'itemsCount', label: 'Items Qty', render: (row) => <span>{row.itemsCount} Items</span>, className: 'text-right' },
    { key: 'totalAmount', label: 'Paid Total', render: (row) => <span className="font-bold">₹{row.totalAmount.toFixed(2)}</span>, className: 'text-right' },
    { key: 'cashier', label: 'Register Operator' }
  ];

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">POS Sales History</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Review transaction logs, print duplicates, and lookup invoices.</p>
        </div>
      </div>

      <DataTable
        title="POS Retail Logs"
        columns={columns}
        data={salesRecords}
        searchKey="receiptNo"
        searchPlaceholder="Search receipt reference..."
        onRowClick={(row) => {
          setSelectedReceipt(row);
          setIsReceiptOpen(true);
        }}
      />

      {isReceiptOpen && selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReceiptOpen(false)} />
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative z-10 space-y-6 border border-outline-variant font-mono text-xs text-on-surface">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-primary">SafaiBazaar Retail</h2>
              <p className="text-xs text-outline">SB-IND-001 • Indore Central</p>
              <p className="text-[10px] text-outline">GSTIN: 23AAAAA0000A1Z5</p>
            </div>

            <div className="border-t border-b border-dashed border-outline-variant py-2 space-y-1 text-on-surface-variant">
              <div className="flex justify-between">
                <span>Receipt:</span>
                <span className="font-bold">{selectedReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Cashier:</span>
                <span>{selectedReceipt.cashier}</span>
              </div>
            </div>

            <div className="space-y-2 border-b border-dashed border-outline-variant pb-4">
              {selectedReceipt.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="truncate block font-bold">{item.name}</span>
                    <span className="text-[10px] text-outline">{item.qty} x ₹{item.price}</span>
                  </div>
                  <span className="font-bold text-primary">₹{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 font-semibold text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹ {selectedReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>CGST (9%):</span>
                <span>₹ {(selectedReceipt.gst / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (9%):</span>
                <span>₹ {(selectedReceipt.gst / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-primary pt-3 border-t border-double border-outline-variant">
                <span>GRAND TOTAL:</span>
                <span>₹ {selectedReceipt.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center text-[10px] space-y-1 pt-4 text-outline border-t border-dashed border-outline-variant">
              <p className="font-bold">Thank you for shopping!</p>
              <p>Please visit safaibazaar.com again</p>
            </div>

            <div className="flex gap-3 font-sans">
              <button 
                onClick={() => setIsReceiptOpen(false)}
                className="flex-1 py-2 border border-outline-variant text-on-surface rounded-lg font-semibold hover:bg-surface-container-low transition-colors text-xs"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  window.print();
                  setIsReceiptOpen(false);
                }}
                className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-bold shadow-md hover:bg-primary/95 transition-colors text-xs"
              >
                Print Duplicate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
