"use client";
import React from 'react';
import ProductGrid from '../Product/ProductGrid';
import { useProducts } from '../../lib/hooks/useProducts';

export default function FeaturedProducts() {
  const { products, loading } = useProducts();
  const top = (products || []).slice().sort((a: any, b: any) => (b.sales?.monthly || 0) - (a.sales?.monthly || 0)).slice(0, 10);

  return (
    <section id="featured">
      <h3 className="text-2xl font-semibold mb-4">Sản phẩm nổi bật</h3>
      {loading ? <div>Đang tải...</div> : <ProductGrid products={top} />}
    </section>
  );
}