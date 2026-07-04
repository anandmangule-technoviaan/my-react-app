import React, { useState } from 'react';
import StatsCard from '@/components/common/StatsCard';
import ChartCard from '@/components/common/ChartCard';
import { SALES_DATA } from '@/constants/dummyData';
import toast from 'react-hot-toast';

export default function ReportsAnalytics() {
  const [reportType, setReportType] = useState('Sales');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`${reportType} Report PDF generated successfully!`);
    }, 1500);
  };

  const storeBreakdownData = [
    { name: 'Indore', revenue: 145000 },
    { name: 'Bhopal', revenue: 86500 },
    { name: 'Jabalpur', revenue: 65000 },
    { name: 'Gwalior', revenue: 42000 }
  ];

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Executive Analytics & Reports</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Central command audit reports, retail collections logs, and inventory forecasting.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <StatsCard title="Total Enterprise Revenue" value="₹24.8 Lakh" icon="payments" trend="+14% MoM" trendType="up" borderLeftColor="border-primary" />
        <StatsCard title="Completed Restocks" value="284 Orders" icon="local_shipping" trend="98% on-time" trendType="up" borderLeftColor="border-success-vibrant" />
        <StatsCard title="Customer Return Rate" value="1.4%" icon="keyboard_return" trend="Low" trendType="up" borderLeftColor="border-primary-fixed-dim" />
        <StatsCard title="Active Retail Stores" value="118 Stores" icon="storefront" trend="Stable" trendType="up" borderLeftColor="border-tertiary" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
        <h3 className="text-lg text-primary font-bold mb-4">Report Generator</h3>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Select Report Category</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="Sales">Sales & Billing Ledger</option>
              <option value="Inventory">Warehouse Stock Thresholds</option>
              <option value="GST">GST Taxation Report (GSTR-1)</option>
              <option value="Wastage">Store Wastage Log</option>
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Timeframe Interval</label>
            <select
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
            >
              <option>Current Calendar Month</option>
              <option>Previous Quarter</option>
              <option>Custom Date Range</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="shimmer-btn bg-primary text-on-primary font-bold px-6 py-3 rounded-xl shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2 h-11 text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_chart</span>
            {isGenerating ? 'Compiling PDF...' : 'Compile Document'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <ChartCard 
          title="Revenue Growth (Weekly)" 
          type="area" 
          data={SALES_DATA} 
          keys={['revenue']} 
          labels={['Sales (₹)']} 
          colors={['#00433d']}
        />
        <ChartCard 
          title="Revenue Breakdown by Store Location" 
          type="bar" 
          data={storeBreakdownData} 
          keys={['revenue']} 
          labels={['Indore Store (₹)']} 
          colors={['#006b5f']}
        />
      </div>
    </div>
  );
}
