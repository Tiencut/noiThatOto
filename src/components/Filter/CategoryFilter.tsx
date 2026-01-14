"use client";
import React, { useState, useRef } from 'react';


interface Category {
  id: number;
  name: string;
  icon: string;
  why: string;
  buyWhen: string;
  priority?: string;
}

export default function CategoryFilter({ categories, selected, toggle }: { categories: Category[]; selected: string[]; toggle: (c: string) => void }) {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<keyof typeof groups | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);
  const tooltipCloseTimer = useRef<number | null>(null);
  const groupCloseTimer = useRef<number | null>(null);

  const groups = categories.reduce(
    (acc, cur) => {
      const p = cur.priority || 'NICE';
      if (p === 'MUST') acc.MUST.push(cur);
      else if (p === 'SHOULD') acc.SHOULD.push(cur);
      else acc.NICE.push(cur);
      return acc;
    },
    { MUST: [] as Category[], SHOULD: [] as Category[], NICE: [] as Category[] }
  );

  const sectionMeta: { key: keyof typeof groups; label: string; border: string }[] = [
    { key: 'MUST', label: 'Bắt Buộc', border: 'border-red-200' },
    { key: 'SHOULD', label: 'Nên Có', border: 'border-yellow-200' },
    { key: 'NICE', label: 'Tùy Chọn', border: 'border-gray-200' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {sectionMeta.map((s) => {
        const items = groups[s.key];
        if (!items || items.length === 0) return null;
        const isOpen = Boolean(openGroups[s.key]);
        const showList = isOpen || hoveredGroup === s.key;
        return (
          <div key={s.key} className={`p-3 rounded-md border ${s.border}`}>
            <div
              className="flex items-center justify-between mb-2 cursor-pointer"
              onMouseEnter={() => {
                if (groupCloseTimer.current) {
                  clearTimeout(groupCloseTimer.current);
                  groupCloseTimer.current = null;
                }
                setHoveredGroup(s.key);
              }}
              onMouseLeave={() => {
                if (groupCloseTimer.current) clearTimeout(groupCloseTimer.current);
                groupCloseTimer.current = window.setTimeout(() => setHoveredGroup(null), 150);
              }}
              onClick={() => setOpenGroups((prev) => ({ ...prev, [s.key]: !prev[s.key] }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenGroups((prev) => ({ ...prev, [s.key]: !prev[s.key] })); }}
            >
              <h4 className="text-sm font-semibold">{s.label}</h4>
              <span className="text-xs text-gray-500">{items.length} mục</span>
            </div>

            {showList && (
              <div
                className="grid grid-cols-1 gap-2"
                onMouseEnter={() => {
                  if (groupCloseTimer.current) {
                    clearTimeout(groupCloseTimer.current);
                    groupCloseTimer.current = null;
                  }
                  setHoveredGroup(s.key);
                }}
                onMouseLeave={() => {
                  if (groupCloseTimer.current) clearTimeout(groupCloseTimer.current);
                  groupCloseTimer.current = window.setTimeout(() => setHoveredGroup(null), 150);
                }}
              >
                {items.map((c) => (
                  <div key={c.id} className="relative">
                    <div
                      className={`flex items-center justify-between gap-2 p-2 rounded-lg transition-all duration-200 ${
                        selected.includes(c.name) ? 'font-medium text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selected.includes(c.name)}
                          onChange={() => toggle(c.name)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-lg">{c.icon}</span>
                        <span className="text-sm flex items-center gap-2">
                          <span>{c.name}</span>
                          <span
                            aria-hidden
                            className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                              c.priority === 'MUST' ? 'bg-red-100 text-red-700' : c.priority === 'SHOULD' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {c.priority}
                          </span>
                        </span>
                      </label>

                      <button
                        type="button"
                        aria-label={`Thông tin ${c.name}`}
                        className="ml-2 flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs flex items-center justify-center hover:bg-gray-200 focus:outline-none"
                        onMouseEnter={(e) => {
                          if (tooltipCloseTimer.current) {
                            clearTimeout(tooltipCloseTimer.current);
                            tooltipCloseTimer.current = null;
                          }
                          const el = e.currentTarget as HTMLElement;
                          const rect = el.getBoundingClientRect();
                          const width = 288; // px (w-72)
                          let left = Math.round(rect.right + 8);
                          let top = Math.round(rect.top);
                          if (left + width > window.innerWidth - 8) {
                            left = Math.round(rect.left - width - 8);
                          }
                          if (left < 8) left = 8;
                          if (top + 200 > window.innerHeight - 8) top = Math.round(window.innerHeight - 200 - 8);
                          setTooltipPos({ left, top });
                          setHoveredCategory(c.id);
                        }}
                        onMouseLeave={() => {
                          if (tooltipCloseTimer.current) clearTimeout(tooltipCloseTimer.current);
                          tooltipCloseTimer.current = window.setTimeout(() => {
                            setHoveredCategory(null);
                            setTooltipPos(null);
                            tooltipCloseTimer.current = null;
                          }, 150);
                        }}
                        onFocus={(e) => {
                          if (tooltipCloseTimer.current) {
                            clearTimeout(tooltipCloseTimer.current);
                            tooltipCloseTimer.current = null;
                          }
                          const el = e.currentTarget as HTMLElement;
                          const rect = el.getBoundingClientRect();
                          const width = 288;
                          let left = Math.round(rect.right + 8);
                          let top = Math.round(rect.top);
                          if (left + width > window.innerWidth - 8) {
                            left = Math.round(rect.left - width - 8);
                          }
                          if (left < 8) left = 8;
                          if (top + 200 > window.innerHeight - 8) top = Math.round(window.innerHeight - 200 - 8);
                          setTooltipPos({ left, top });
                          setHoveredCategory(c.id);
                        }}
                        onBlur={() => {
                          if (tooltipCloseTimer.current) clearTimeout(tooltipCloseTimer.current);
                          tooltipCloseTimer.current = window.setTimeout(() => {
                            setHoveredCategory(null);
                            setTooltipPos(null);
                            tooltipCloseTimer.current = null;
                          }, 150);
                        }}
                      >
                        ?
                      </button>
                    </div>

                    {hoveredCategory === c.id && tooltipPos && (
                      <div
                        onMouseEnter={() => setHoveredCategory(c.id)}
                        onMouseLeave={() => {
                          setHoveredCategory(null);
                          setTooltipPos(null);
                        }}
                        style={{ left: tooltipPos.left, top: tooltipPos.top, width: 288 }}
                        className="fixed z-50 p-3 bg-white border border-gray-200 rounded-lg shadow-lg text-xs text-gray-800"
                      >
                        <p className="font-semibold mb-1">Tại sao cần:</p>
                        <p className="mb-2">{c.why}</p>
                        <p className="font-semibold mb-1">Khi nào nên mua:</p>
                        <p>{c.buyWhen}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
