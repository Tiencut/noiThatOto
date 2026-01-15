"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useCompare from "../../../lib/hooks/useCompare";

export default function ComparePage() {
  const { ids, remove, clear } = useCompare();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!ids || ids.length === 0) {
      setItems([]);
      return;
    }
    fetch('/data/products.json')
      .then(r => r.json())
      .then((all: any[]) => {
        const found = all.filter(p => ids.includes(p.id));
        setItems(found);
      })
      .catch(() => setItems([]));
  }, [ids]);

  if (!ids || ids.length === 0) return <div className="p-6">Chưa có sản phẩm để so sánh.</div>;

  const rows = [
    { key: 'image', label: 'Hình ảnh' },
    { key: 'name', label: 'Tên' },
    { key: 'brand', label: 'Thương hiệu' },
    { key: 'category', label: 'Danh mục' },
    { key: 'price_shopee', label: 'Giá Shopee' },
    { key: 'price_lazada', label: 'Giá Lazada' },
    { key: 'price_tiktok', label: 'Giá TikTok' },
    { key: 'rating', label: 'Rating' },
    { key: 'description', label: 'Mô tả' },
    { key: 'actions', label: 'Hành động' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">So sánh sản phẩm</h1>
      <div className="mb-4 flex gap-2">
        <button onClick={() => clear()} className="px-3 py-2 border rounded">Xóa hết</button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Thuộc tính</th>
              {items.map((p) => (
                <th key={p.id} className="border px-4 py-2 text-center">{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="align-top">
                <td className="border px-4 py-2 font-semibold w-48">{r.label}</td>
                {items.map((p) => {
                  const price = (p.price?.shopee ?? 0);
                  const priceL = (p.price?.lazada ?? 0);
                  const priceT = (p.price?.tiktok ?? 0);
                  return (
                    <td key={p.id + r.key} className="border px-4 py-2 text-sm">
                      {r.key === 'image' && (
                        <img src={p.image?.thumb || '/placeholder.png'} alt={p.name} className="w-32 h-24 object-cover mx-auto" />
                      )}
                      {r.key === 'name' && <div>{p.name}</div>}
                      {r.key === 'brand' && <div>{p.brand || '-'}</div>}
                      {r.key === 'category' && <div>{p.category || '-'}</div>}
                      {r.key === 'price_shopee' && <div>{price ? price.toLocaleString('vi-VN') + '₫' : '-'}</div>}
                      {r.key === 'price_lazada' && <div>{priceL ? priceL.toLocaleString('vi-VN') + '₫' : '-'}</div>}
                      {r.key === 'price_tiktok' && <div>{priceT ? priceT.toLocaleString('vi-VN') + '₫' : '-'}</div>}
                      {r.key === 'rating' && <div>{p.rating ?? '-'}</div>}
                      {r.key === 'description' && <div className="text-xs text-gray-700">{p.description ? (p.description.length > 200 ? p.description.slice(0, 200) + '...' : p.description) : '-'}</div>}
                      {r.key === 'actions' && (
                        <div className="flex gap-2 justify-center">
                          <Link href={`/products/${p.id}`} className="px-3 py-1 bg-green-600 text-white rounded">Xem</Link>
                          <a href={p.affiliate?.shopee} target="_blank" rel="noreferrer" className="px-3 py-1 bg-orange-100 text-orange-800 rounded">Mua</a>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
