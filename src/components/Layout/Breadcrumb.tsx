import Link from 'next/link';
import React from 'react';

export default function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      {items.map((it, i) => (
        <span key={i}>
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
          {i < items.length - 1 ? ' / ' : ''}
        </span>
      ))}
    </nav>
  );
}
