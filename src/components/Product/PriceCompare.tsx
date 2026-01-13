"use client";
import React from 'react';

type Price = { shopee: number; lazada: number; tiktok: number; original?: number };

export default function PriceCompare({ productId, price, affiliate }: { productId: string; price: Price; affiliate: { shopee: string; lazada: string; tiktok: string } }) {
  const entries = [
    { key: 'shopee', label: 'Shopee', value: price.shopee, url: affiliate.shopee },
    { key: 'lazada', label: 'Lazada', value: price.lazada, url: affiliate.lazada },
    { key: 'tiktok', label: 'TikTok', value: price.tiktok, url: affiliate.tiktok }
  ];
  const min = Math.min(price.shopee || Infinity, price.lazada || Infinity, price.tiktok || Infinity);

  async function trackClick(channel: string) {
    try {
      await fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId, channel, ts: Date.now() }) });
    } catch (err) {
      // ignore
    }
  }

  function buildUtm(url: string) {
    const utm = new URL(url, window.location.origin);
    utm.searchParams.set('utm_source', 'cardecor');
    utm.searchParams.set('utm_medium', 'affiliate');
    utm.searchParams.set('utm_campaign', `product_${productId}`);
    return utm.toString();
  }

  return (
    <div className="bg-gray-50 p-3 rounded">
      <h4 className="font-semibold mb-2">So sánh giá</h4>
      <div className="grid grid-cols-3 gap-2">
        {entries.map((e) => (
          <div key={e.key} className={`p-2 rounded ${e.value === min ? 'border-2 border-primary' : 'border'} text-center`}>
            <div className="text-sm text-gray-600">{e.label}</div>
            <div className="text-lg font-bold">{e.value?.toLocaleString('vi-VN')}₫</div>
            {price.original ? <div className="text-xs text-gray-500">Giảm {Math.max(0, 100 - Math.round((e.value / (price.original || e.value)) * 100))}%</div> : null}
            {e.value === min ? <div role="status" aria-live="polite" className="text-xs text-green-700 mt-1">Giá tốt nhất</div> : null}
            <div className="mt-2">
              {
                (() => {
                  const percent = Math.max(0, Math.round((1 - e.value / (price.original || e.value)) * 100));
                  const title = `Mua trên ${e.label} — Tiết kiệm ${percent}%`;
                  return (
                    <a aria-label={`Mua trên ${e.label}`} title={title} className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded text-sm" href={buildUtm(e.url)} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(e.key)}>
                      Mua trên {e.label}
                    </a>
                  );
                })()
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
