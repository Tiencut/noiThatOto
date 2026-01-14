"use client";

import React, { useEffect, useState } from 'react';

export default function AdminPage() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/admin/logs')
      .then((r) => r.json())
      .then((data) => setLogs(data.lines || []))
      .catch(() => setLogs([]));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin</h2>
      <p className="mb-4 text-sm text-gray-600">Logs click affiliate (dev only)</p>
      <div className="bg-white p-4 rounded shadow-sm max-h-80 overflow-auto text-xs">
        {logs.length === 0 ? <div>Không có logs</div> : logs.map((l, i) => <div key={i} className="border-b py-1">{l}</div>)}
      </div>
    </div>
  );
}
