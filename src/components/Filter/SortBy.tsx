"use client";
import React from 'react';

export default function SortBy({ value, onChange }: { value?: string; onChange: (v?: string) => void }) {
  return (
    <select value={value ?? ''} onChange={(e) => onChange(e.target.value || undefined)} className="mt-2 w-full border rounded px-2 py-1">
      <option value="">Mặc định</option>
      <option value="sales">Bán chạy</option>
      <option value="price-asc">Giá: thấp → cao</option>
      <option value="price-desc">Giá: cao → thấp</option>
      <option value="rating">Rating</option>
      <option value="new">Mới</option>
    </select>
  );
}
