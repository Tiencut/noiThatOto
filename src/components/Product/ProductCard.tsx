import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import useCompare from '../../lib/hooks/useCompare';

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const { toggle, contains } = useCompare();
  const price = product.price?.shopee ?? product.price?.lazada ?? product.price?.tiktok ?? 0;
  const href = `/products/${product.id}`;

  const prefetchOnIntent = () => {
    try {
      router.prefetch(href);
    } catch (e) {
      // ignore prefetch errors
    }
  };

  return (
    <div className="bg-white p-3 rounded shadow-sm hover:shadow-md transition relative">
      <Link href={href} className="block" onMouseEnter={prefetchOnIntent} onFocus={prefetchOnIntent}>
        <img src={product.image?.thumb || '/placeholder.png'} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
        <div className="text-sm font-medium truncate">{product.name}</div>
        <div className="text-xs text-gray-500">{product.category}</div>
        <div className="mt-2 text-sm">
          <span className="font-semibold">{price.toLocaleString('vi-VN')}₫</span>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggle(product.id);
        }}
        className="absolute top-3 right-3 bg-white border rounded-full p-1 shadow"
        aria-pressed={contains(product.id)}
        title={contains(product.id) ? 'Bỏ so sánh' : 'Thêm vào so sánh'}
      >
        {contains(product.id) ? '✓' : '≡'}
      </button>
    </div>
  );
}
