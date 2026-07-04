import React, { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { ACTIVITY_LOGS } from '@/constants/dummyData';

export default function ActivityLogs() {
  const [logs, setLogs] = useState(ACTIVITY_LOGS);

  const columns = [
    { key: 'time', label: 'Timestamp', className: 'font-mono text-xs text-outline w-48' },
    { key: 'action', label: 'Trigger Event', className: 'font-bold text-primary w-48' },
    { key: 'user', label: 'User Actor', className: 'font-semibold w-40' },
    { key: 'notes', label: 'Operation Summary Notes' }
  ];

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">Security Auditing & Logs</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Review real-time system actor updates, database migrations, and order adjustments.</p>
        </div>
      </div>

      <DataTable
        title="Activity Event Ledger"
        columns={columns}
        data={logs}
        searchKey="action"
        searchPlaceholder="Search events (e.g. Order)..."
      />
    </div>
  );
}
