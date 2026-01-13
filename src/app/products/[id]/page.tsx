import React from 'react';
import dynamic from 'next/dynamic';

const PriceCompare = dynamic(() => import('../../../../components/Product/PriceCompare'), { ssr: false });

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`);
  const products = await res.json();
  return products.find((p: any) => p.id === id);
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await getProduct(id);

  if (!product) return <div>Sản phẩm không tìm thấy</div>;

  const utm = `?utm_source=cardecor&utm_medium=affiliate&utm_campaign=product_${product.id}`;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <img src={product.image.full} alt={product.name} className="w-full rounded" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="mb-4">
            <strong>Giá:</strong>
            <div className="flex gap-2 mt-2">
              <a className="px-3 py-2 bg-orange-100 text-orange-800 rounded" href={product.affiliate.shopee + utm} target="_blank" rel="noreferrer">Shopee</a>
              <a className="px-3 py-2 bg-blue-100 text-blue-800 rounded" href={product.affiliate.lazada + utm} target="_blank" rel="noreferrer">Lazada</a>
              <a className="px-3 py-2 bg-pink-100 text-pink-800 rounded" href={product.affiliate.tiktok + utm} target="_blank" rel="noreferrer">TikTok Shop</a>
            </div>
          </div>

                  <div className="mb-4">
            <h3 className="font-semibold">AI tóm tắt (Gemini - mock)</h3>
            <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(product.aiInfo, null, 2)}</pre>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">So sánh giá</h3>
            <div className="mt-3">
              {/* PriceCompare is a client component */}
              {/* @ts-ignore Server -> can include client components directly in App Router */}
              <PriceCompare productId={product.id} price={product.price} affiliate={product.affiliate} />
            </div>
          </div>

          <div className="text-xs text-gray-500">Cập nhật: {product.updatedAt}</div>
        </div>
      </div>
    </div>
  );
}
