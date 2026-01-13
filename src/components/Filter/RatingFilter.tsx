"use client";
import React from 'react';

export default function RatingFilter({ value, onChange }: { value?: number; onChange: (v?: number) => void }) {
  return (
    <select value={value ?? ''} onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)} className="mt-2 w-full border rounded px-2 py-1">
      <option value="">Tất cả</option>
      <option value="4">≥ 4.0</option>
      <option value="4.5">≥ 4.5</option>
      <option value="4.8">≥ 4.8</option>
    </select>
  );
}
