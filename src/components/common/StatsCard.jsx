import React from 'react';

export default function StatsCard({ title, value, icon, subtitle, trend, trendType, borderLeftColor }) {
  const isTrendUp = trendType === 'up';
  
  return (
    <div className={`bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/30 border-l-4 ${borderLeftColor || 'border-primary'} flex flex-col justify-between hover:shadow-md transition-all duration-300 transform hover:-translate-y-[2px]`}>
      <div className="flex justify-between items-start mb-2">
        <span className="font-label-caps text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">{title}</span>
        {icon && (
          <span className="material-symbols-outlined text-primary bg-primary-fixed-dim/20 p-2 rounded-lg text-lg">
            {icon}
          </span>
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-2xl font-bold text-on-surface">{value}</span>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isTrendUp ? 'bg-success-vibrant/10 text-success-vibrant' : 'bg-error-alert/10 text-error-alert'
          }`}>
            {trend}
          </span>
        )}
      </div>
      
      {subtitle && (
        <span className="text-xs text-on-surface-variant mt-2">{subtitle}</span>
      )}
    </div>
  );
}
