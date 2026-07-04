import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, LineChart, Line, Legend } from 'recharts';

export default function ChartCard({ title, type, data, keys, labels, colors, height = 300 }) {
  const defaultColors = colors || ['#00433d', '#006b5f', '#10B981', '#7f4025'];
  
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {keys.map((key, i) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={defaultColors[i % defaultColors.length]} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={defaultColors[i % defaultColors.length]} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6f7977" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6f7977" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: '#ffffff', border: '1px solid #BEC9C6', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              {keys.map((key, i) => (
                <Area 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  name={labels ? labels[i] : key}
                  stroke={defaultColors[i % defaultColors.length]} 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill={`url(#grad-${key})`} 
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6f7977" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6f7977" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: '#ffffff', border: '1px solid #BEC9C6', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              {keys.map((key, i) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  name={labels ? labels[i] : key}
                  fill={defaultColors[i % defaultColors.length]} 
                  radius={[4, 4, 0, 0]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
      default:
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6f7977" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6f7977" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: '#ffffff', border: '1px solid #BEC9C6', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              {keys.map((key, i) => (
                <Line 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  name={labels ? labels[i] : key}
                  stroke={defaultColors[i % defaultColors.length]} 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl shadow-sm">
      <h3 className="font-headline-md text-lg text-primary mb-6 font-bold">{title}</h3>
      {renderChart()}
    </div>
  );
}
