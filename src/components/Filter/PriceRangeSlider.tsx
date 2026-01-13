"use client";
import React from 'react';

export default function PriceRangeSlider({ min, max, onChange }: { min?: number; max?: number; onChange: (min?: number, max?: number) => void }) {
  return (
    <div className="text-sm">
      <div className="flex gap-2">
        <input type="number" placeholder="Min" value={min ?? ''} onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined, max)} className="border px-2 py-1 rounded w-1/2" />
        <input type="number" placeholder="Max" value={max ?? ''} onChange={(e) => onChange(min, e.target.value ? Number(e.target.value) : undefined)} className="border px-2 py-1 rounded w-1/2" />
      </div>
    </div>
  );
}
