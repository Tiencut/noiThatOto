import React from 'react';

export default async function ModelProducts({ params }: { params: { model: string } }) {
  const model = params.model;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/filter?carModel=${encodeURIComponent(model)}`);
  const products = await res.json();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sản phẩm cho {model}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p: any) => (
          <a key={p.id} href={`/products/${p.id}`} className="block bg-white p-3 rounded shadow-sm">
            <img src={p.image?.thumb} alt={p.name} className="w-full h-40 object-cover mb-2 rounded" />
            <div className="text-sm font-medium">{p.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
