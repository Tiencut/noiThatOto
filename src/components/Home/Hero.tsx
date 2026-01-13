"use client";
import React from 'react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-white rounded-lg p-8 mb-8" aria-labelledby="hero-title">
      <div className="container">
        <h2 id="hero-title" className="text-3xl md:text-4xl font-bold mb-2">Chọn phụ kiện xe của bạn — Chuẩn OEM</h2>
        <p className="text-gray-700 mb-4">Top sản phẩm nội thất ô tô — so sánh giá Shopee, Lazada, TikTok · AI bổ sung thông tin sản phẩm</p>
        <div className="flex gap-3">
          <a href="/products" className="px-4 py-3 bg-primary text-white rounded shadow">Xem sản phẩm</a>
          <a href="#featured" className="px-4 py-3 border rounded">Sản phẩm nổi bật</a>
        </div>
      </div>
    </section>
  );
}