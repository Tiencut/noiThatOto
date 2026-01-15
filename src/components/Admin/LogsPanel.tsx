"use client";

import React from "react";

type Props = { lines?: string[] };

export default function LogsPanel({ lines = [] }: Props) {
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h4 className="font-semibold mb-2">Recent Logs</h4>
      <div className="text-xs text-gray-600 max-h-40 overflow-auto">
        {lines.length === 0 ? <div>No logs</div> : (
          <ul className="list-disc pl-4 space-y-1">
            {lines.map((l, i) => <li key={i} className="break-words">{l}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
