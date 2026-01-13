"use client";
import React, { useEffect, useState } from 'react';
import FilterPanel from '../../components/Filter/FilterPanel';

type Product = {
  id: string;
  name: string;
  category: string;
  price: { shopee: number; lazada: number; tiktok: number };
  image: { thumb: string };
};

function highlight(text: string, q?: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return <span>{before}<mark className="bg-yellow-200">{match}</mark>{after}</span>;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');

  async function fetchFiltered(filters: any = {}) {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.q || q) params.set('q', filters.q || q);
    if (filters.categories && filters.categories.length) params.set('categories', filters.categories.join(','));
    if (filters.carModel) params.set('carModel', filters.carModel);
    if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
    if (filters.minRating) params.set('minRating', String(filters.minRating));

    const res = await fetch('/api/filter?' + params.toString());
    const data = await res.json();
    setProducts(data.slice(0, 200));
    setLoading(false);
  }

  useEffect(() => {
    fetchFiltered();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <FilterPanel onApply={(f) => fetchFiltered({ ...f, q })} />
      </aside>

      <section className="lg:col-span-3">
        <div className="mb-4 flex items-center gap-4">
          <input placeholder="Tìm tên sản phẩm" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 border rounded px-3 py-2" />
          <button className="px-3 py-2 bg-primary text-white rounded" onClick={() => fetchFiltered({ q })}>Tìm</button>
        </div>

        {loading ? <div>Đang tải...</div> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <a key={p.id} href={`/products/${p.id}`} className="block bg-white p-3 rounded shadow-sm">
                <img src={p.image?.thumb} alt={p.name} className="w-full h-40 object-cover mb-2 rounded" />
                <div className="text-sm font-medium">{highlight(p.name, q)}</div>
                <div className="text-xs text-gray-500">{p.category}</div>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">Shopee: {p.price?.shopee?.toLocaleString('vi-VN')}₫</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
