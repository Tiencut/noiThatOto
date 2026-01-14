'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Brand {
  id: number;
  name: string;
  icon: string;
}

export default function CarBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await fetch('/data/brands.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Brand[] = await response.json();
        setBrands(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Hãng xe</h1>
        <p>Đang tải danh sách hãng xe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Hãng xe</h1>
        <p className="text-red-500">Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hãng xe</h1>
      {brands.length === 0 ? (
        <p>Không có hãng xe nào được tìm thấy.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <Link href={`/car-models/${encodeURIComponent(brand.name)}`} key={brand.id} prefetch={true}>
              <li className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center cursor-pointer">
                <img
                  src={`/api/brand-logo?name=${encodeURIComponent(brand.name)}`}
                  alt={brand.name}
                  className="w-16 h-16 mb-2 object-contain"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1';
                      img.src = '/icons/default-brand.svg';
                    }
                  }}
                />
                <h2 className="text-xl font-semibold">{brand.name}</h2>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}