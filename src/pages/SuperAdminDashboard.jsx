import React from 'react';
import StatsCard from '@/components/common/StatsCard';
import ChartCard from '@/components/common/ChartCard';
import { SALES_DATA, PRODUCTS } from '@/constants/dummyData';

export default function SuperAdminDashboard() {
  const stockDistributionData = [
    { name: 'Hub West', stock: 4500 },
    { name: 'Hub North', stock: 3200 },
    { name: 'Hub East', stock: 2800 },
    { name: 'Hub South', stock: 3100 }
  ];

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-on-surface tracking-tight font-bold">Welcome back, Super Admin</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-vibrant/10 text-success-vibrant">
              <span className="w-1.5 h-1.5 rounded-full bg-success-vibrant animate-pulse"></span>
              Live Business Status: Operational
            </span>
            <span className="text-on-surface-variant text-[11px] font-semibold">Last sync: 2 mins ago</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high text-primary text-xs font-bold hover:bg-primary-fixed transition-all border border-outline-variant/30">
            <span className="material-symbols-outlined text-sm">group_add</span> Create Admin
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high text-primary text-xs font-bold hover:bg-primary-fixed transition-all border border-outline-variant/30">
            <span className="material-symbols-outlined text-sm">domain_add</span> Add Warehouse
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-gutter">
        <StatsCard title="Total Admins" value="1,284" icon="admin_panel_settings" trend="+12% up" trendType="up" subtitle="Active roles" borderLeftColor="border-primary" />
        <StatsCard title="Active Warehouses" value="42" icon="warehouse" trend="Stable" trendType="up" subtitle="Distribution hubs" borderLeftColor="border-primary-fixed-dim" />
        <StatsCard title="Active Stores" value="118" icon="store" trend="+4 new" trendType="up" subtitle="Retail outlets" borderLeftColor="border-success-vibrant" />
        <StatsCard title="Total Products" value="3.4k" icon="inventory_2" trend="-2% down" trendType="down" subtitle="Catalog size" borderLeftColor="border-tertiary" />
        <StatsCard title="Today's Sales" value="₹1,42,900" icon="point_of_sale" trend="+24% up" trendType="up" subtitle="POS & orders" borderLeftColor="border-primary" />
        <StatsCard title="Monthly Revenue" value="₹4.12 Cr" icon="assessment" trend="+8% up" trendType="up" subtitle="Accrued revenue" borderLeftColor="border-success-vibrant" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 space-y-gutter">
          <ChartCard 
            title="Sales Overview" 
            type="area" 
            data={SALES_DATA} 
            keys={['revenue', 'sales']} 
            labels={['Revenue (₹)', 'Sales Count']} 
            colors={['#00433d', '#10B981']}
          />

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg text-primary font-bold">Top Performing Products</h3>
              <button className="text-primary font-bold text-sm hover:underline">View All Catalog</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant/30">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">WH Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Store Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {PRODUCTS.slice(0, 4).map((p) => (
                    <tr key={p.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-outline-variant/20" />
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-on-surface">{p.name}</span>
                            <span className="text-xs text-on-surface-variant">{p.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-sm">{p.whStock.toLocaleString()} Units</td>
                      <td className="px-6 py-4 text-right font-semibold text-sm">{p.storeStock.toLocaleString()} Units</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          p.status === 'HEALTHY' ? 'bg-success-vibrant/10 text-success-vibrant' : 'bg-tertiary-fixed text-on-tertiary-fixed'
                        }`}>
                          {p.status}
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
          <ChartCard 
            title="Warehouse Stock" 
            type="bar" 
            data={stockDistributionData} 
            keys={['stock']} 
            labels={['Stock Level']} 
            colors={['#006b5f']}
          />

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg text-primary font-bold mb-6">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                <span className="font-bold text-sm text-on-surface">API Gateway</span>
                <span className="px-3 py-1 bg-success-vibrant/10 text-success-vibrant rounded-full text-xs font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                <span className="font-bold text-sm text-on-surface">Database Cluster</span>
                <span className="px-3 py-1 bg-success-vibrant/10 text-success-vibrant rounded-full text-xs font-bold">100% ONLINE</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                <span className="font-bold text-sm text-on-surface">Cache Cluster</span>
                <span className="px-3 py-1 bg-success-vibrant/10 text-success-vibrant rounded-full text-xs font-bold">STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
