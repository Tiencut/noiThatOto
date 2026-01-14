"use client";
import React, { useEffect, useState } from 'react';
import useSWR, { mutate as globalMutate } from 'swr';
import Image from 'next/image';
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
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const limit = 48; // items per page

  function buildKey(filters: any = {}) {
    const params = new URLSearchParams();
    if (filters.q || q) params.set('q', filters.q || q);
    if (filters.categories && filters.categories.length) params.set('categories', filters.categories.join(','));
    if (filters.brands && filters.brands.length) params.set('brands', filters.brands.join(','));
    if (filters.carModel) params.set('carModel', filters.carModel);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
    if (filters.minRating) params.set('minRating', String(filters.minRating));
    params.set('page', String(page));
    params.set('limit', String(limit));
    return '/api/filter?' + params.toString();
  }

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, mutate, isValidating } = useSWR(buildKey(), fetcher, { revalidateOnFocus: false, dedupingInterval: 60000 });

  // Trigger a filtered fetch. Updates local state and forces SWR to revalidate the computed key.
  function fetchFiltered(filters: any = {}) {
    const nextPage = filters.page ?? 1;
    const qVal = filters.q;
    const key = buildKey({ ...filters, page: nextPage });
    // Defer state updates so we don't call setState while a child is rendering
    Promise.resolve().then(() => {
      if (qVal !== undefined) setQ(qVal);
      setPage(nextPage);
      // Revalidate the computed key and the current hook's key
      globalMutate(key);
      mutate();
    });
  }

  useEffect(() => {
    mutate();
    // prefetch next page to make next click instant
    const nextKey = buildKey({ page: page + 1 });
    globalMutate(nextKey);
  }, [q, page]);

  return (
    <div
      style={{
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        width: '100vw'
      }}
      className="px-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <FilterPanel onApply={(f) => fetchFiltered({ ...f, q })} />
        </aside>

        <section className="lg:col-span-3">
        <div className="mb-4 flex items-center gap-4">
          <input placeholder="Tìm tên sản phẩm" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 border rounded px-3 py-2" />
          <button className="px-3 py-2 bg-primary text-white rounded" onClick={() => fetchFiltered({ q })}>Tìm</button>
        </div>

        {error ? (
          <div>Lỗi tải dữ liệu</div>
        ) : isValidating && !data ? (
          <div>Đang tải...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(data?.items || []).map((p: Product) => (
                <a key={p.id} href={`/products/${p.id}`} className="block bg-white p-3 rounded shadow-sm">
                  {p.image?.thumb ? (
                    <div className="relative w-full h-40 mb-2 rounded overflow-hidden">
                      {p.image.thumb.startsWith('http') ? (
                        <img src={p.image.thumb} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <Image src={p.image.thumb} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
                      )}
                    </div>
                  ) : null}
                  <div className="text-sm font-medium">{highlight(p.name, q)}</div>
                  <div className="text-xs text-gray-500">{p.category}</div>
                  <div className="mt-2 text-sm">
                    <span className="font-semibold">Shopee: {p.price?.shopee?.toLocaleString('vi-VN')}₫</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Trước</button>
              <span className="text-sm">Trang {data?.page ?? page} / {Math.max(1, Math.ceil((data?.total || 0) / limit))}</span>
              <button disabled={data && page >= Math.ceil((data.total || 0) / limit)} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Sau</button>
            </div>
          </>
        )}
      </section>
    </div>
  </div>
  );
}
