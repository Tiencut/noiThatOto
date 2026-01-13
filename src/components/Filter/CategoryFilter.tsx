"use client";
import React from 'react';

export default function CategoryFilter({ categories, selected, toggle }: { categories: string[]; selected: string[]; toggle: (c: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {categories.map((c) => (
        <label key={c} className={`text-sm inline-flex items-center gap-2 cursor-pointer ${selected.includes(c) ? 'font-medium' : 'text-gray-700'}`}>
          <input type="checkbox" checked={selected.includes(c)} onChange={() => toggle(c)} />
          {c}
        </label>
      ))}
    </div>
  );
}
