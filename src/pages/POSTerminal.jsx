import React, { useState } from 'react';
import { PRODUCTS } from '@/constants/dummyData';
import toast from 'react-hot-toast';

export default function POSTerminal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    toast.success(`${product.name} added to register cart`);
  };

  const updateQty = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const clearCart = () => {
    setCart([]);
    toast.error('Register cart cleared');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty!');
      return;
    }

    const receipt = {
      receiptNo: 'RX-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString(),
      items: [...cart],
      subtotal,
      gst,
      grandTotal,
      cashier: 'Priya Cashier'
    };

    setActiveReceipt(receipt);
    setIsReceiptOpen(true);
    toast.success('Transaction Completed!');
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter flex-1 w-full min-h-[calc(100vh-140px)] items-stretch">
      <div className="lg:col-span-8 flex flex-col space-y-4">
        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 flex gap-4 items-center">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input
              type="text"
              placeholder="Search products by name or SKU barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-outline-variant bg-surface-container-low rounded-lg text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto max-h-[500px] pr-2">
          {filteredProducts.map((p) => (
            <div 
              key={p.id} 
              onClick={() => addToCart(p)}
              className="bg-white rounded-xl border border-outline-variant/30 p-4 shadow-sm hover:border-primary cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="w-full h-32 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary mb-3 text-xs">
                HMX Clean
              </div>
              <div>
                <h4 className="font-bold text-xs text-on-surface line-clamp-1">{p.name}</h4>
                <p className="text-[10px] text-outline mt-1 font-mono">{p.sku}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-primary text-xs">₹ {p.price.toFixed(2)}</span>
                  <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded">Stock: {p.storeStock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 bg-white rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col justify-between h-full min-h-[480px]">
        <div>
          <h3 className="text-base text-primary font-bold mb-4 flex justify-between items-center border-b border-outline-variant pb-3">
            <span>Billing Register</span>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-xs font-bold text-error hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">delete</span> Clear
              </button>
            )}
          </h3>

          <div className="space-y-3 overflow-y-auto max-h-[260px] pr-2">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-3 p-2 bg-surface rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">{item.name}</p>
                    <p className="text-[10px] text-outline font-bold">₹ {item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 bg-surface-container flex items-center justify-center rounded text-xs font-bold hover:bg-outline-variant/30">-</button>
                    <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                    <button onClick={() => addToCart(item)} className="w-5 h-5 bg-surface-container flex items-center justify-center rounded text-xs font-bold hover:bg-outline-variant/30">+</button>
                  </div>
                  <span className="font-bold text-xs text-primary w-20 text-right">₹ {(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-outline flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl">shopping_cart</span>
                <span className="text-xs font-semibold">No items in cart register</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-outline-variant pt-4 space-y-4">
          <div className="space-y-2 text-xs text-on-surface-variant font-medium">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹ {gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-dashed border-outline-variant">
              <span>Grand Total</span>
              <span>₹ {grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="shimmer-btn w-full bg-primary text-on-primary py-3 rounded-xl font-bold shadow-lg active:scale-[0.98] disabled:opacity-50 transition-transform flex items-center justify-center gap-2 text-xs"
          >
            <span className="material-symbols-outlined text-sm">receipt_long</span>
            Pay & Print Receipt
          </button>
        </div>
      </div>

      {isReceiptOpen && activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReceiptOpen(false)} />
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative z-10 space-y-6 border border-outline-variant font-mono text-xs text-on-surface">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-primary">SafaiBazaar Retail</h2>
              <p className="text-[10px] text-outline">SB-IND-001 • Indore Central</p>
              <p className="text-[9px] text-outline">GSTIN: 23AAAAA0000A1Z5</p>
            </div>

            <div className="border-t border-b border-dashed border-outline-variant py-2 space-y-1 text-on-surface-variant">
              <div className="flex justify-between">
                <span>Receipt:</span>
                <span className="font-bold">{activeReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{activeReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Cashier:</span>
                <span>{activeReceipt.cashier}</span>
              </div>
            </div>

            <div className="space-y-2 border-b border-dashed border-outline-variant pb-4">
              {activeReceipt.items.map((item) => (
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
                <span>₹ {activeReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>CGST (9%):</span>
                <span>₹ {(activeReceipt.gst / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (9%):</span>
                <span>₹ {(activeReceipt.gst / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-primary pt-3 border-t border-double border-outline-variant">
                <span>GRAND TOTAL:</span>
                <span>₹ {activeReceipt.grandTotal.toFixed(2)}</span>
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
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
