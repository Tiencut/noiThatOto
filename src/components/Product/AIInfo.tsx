import React from 'react';

export default function AIInfo({ aiInfo }: { aiInfo: any }) {
  if (!aiInfo) return null;
  return (
    <div className="bg-gray-50 p-3 rounded">
      <h4 className="font-semibold mb-2">Tóm tắt AI</h4>
      <ul className="text-sm space-y-1">
        {Object.entries(aiInfo).map(([k, v]) => (
          <li key={k}><strong>{k}:</strong> {v as string}</li>
        ))}
      </ul>
    </div>
  );
}
