"use client";
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">CarDecor Oto</Link>
        <nav className="flex items-center gap-4">
          <Link href="/products" prefetch={true} className="text-sm text-gray-700">Sản phẩm</Link>
          <Link href="/car-models" prefetch={true} className="text-sm text-gray-700">Model xe</Link>
          <Link href="/car-brands" prefetch={true} className="text-sm text-gray-700">Hãng xe</Link>
          <form action="/products" method="get" className="hidden sm:block">
            <input name="q" placeholder="Tìm sản phẩm" aria-label="Tìm sản phẩm" className="border rounded px-2 py-1" />
          </form>
        </nav>
      </div>
    </header>
  );
}
