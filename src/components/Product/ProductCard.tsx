import Link from 'next/link';
import React from 'react';

export default function ProductCard({ product }: { product: any }) {
  const price = product.price?.shopee ?? product.price?.lazada ?? product.price?.tiktok ?? 0;
  return (
    <Link href={`/products/${product.id}`} className="block bg-white p-3 rounded shadow-sm hover:shadow-md transition">
      <img src={product.image?.thumb || '/placeholder.png'} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
      <div className="text-sm font-medium truncate">{product.name}</div>
      <div className="text-xs text-gray-500">{product.category}</div>
      <div className="mt-2 text-sm">
        <span className="font-semibold">{price.toLocaleString('vi-VN')}₫</span>
      </div>
    </Link>
  );
}
