"use client";
import React, { useEffect, useState } from 'react';
import ProductGrid from '../Product/ProductGrid';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        const sorted = data.sort((a: any, b: any) => (b.sales?.monthly || 0) - (a.sales?.monthly || 0));
        setProducts(sorted.slice(0, 10));
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <section id="featured">
      <h3 className="text-2xl font-semibold mb-4">Sản phẩm nổi bật</h3>
      <ProductGrid products={products} />
    </section>
  );
}