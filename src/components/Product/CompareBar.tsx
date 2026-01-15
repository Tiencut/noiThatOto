"use client";
import Link from "next/link";
import React from "react";
import useCompare from "../../lib/hooks/useCompare";

export default function CompareBar() {
  const { ids, clear } = useCompare();
  if (!ids || ids.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border rounded shadow-lg px-4 py-2 flex items-center gap-4">
      <div className="text-sm">Đã chọn <strong>{ids.length}</strong> để so sánh</div>
      <Link href="/compare" className="px-3 py-1 bg-blue-600 text-white rounded">So sánh</Link>
      <button onClick={() => clear()} className="px-3 py-1 border rounded">Xóa</button>
    </div>
  );
}
