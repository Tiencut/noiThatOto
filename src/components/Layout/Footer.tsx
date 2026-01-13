import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container py-6 text-sm text-gray-600">© {new Date().getFullYear()} CarDecor Oto</div>
    </footer>
  );
}
