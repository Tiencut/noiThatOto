import React from 'react';

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-r from-primary/10 to-white rounded-lg p-8 mb-8">
        <div className="container">
          <h2 className="text-2xl font-bold mb-2">Chọn phụ kiện xe của bạn — Chuẩn OEM</h2>
          <p className="text-gray-700">So sánh giá Shopee, Lazada, TikTok · AI tóm tắt thông tin sản phẩm</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Sản phẩm nổi bật</h3>
        <div>
          <a href="/products" className="inline-block px-4 py-2 bg-primary text-white rounded">Xem tất cả sản phẩm</a>
        </div>
      </section>
    </div>
  );
}
