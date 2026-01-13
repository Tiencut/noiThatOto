"use client";
import React from 'react';

export default function CarModelFilter({ value, onChange, models }: { value: string; onChange: (v: string) => void; models: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full border rounded px-2 py-1">
      <option value="">Tất cả</option>
      {models.map((m) => <option key={m} value={m}>{m}</option>)}
    </select>
  );
}
