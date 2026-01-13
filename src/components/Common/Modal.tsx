"use client";
import React from 'react';

export default function Modal({ children, open, onClose }: { children: React.ReactNode; open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded max-w-lg w-full">
        <div className="text-right"><button onClick={onClose} className="text-sm">Đóng</button></div>
        {children}
      </div>
    </div>
  );
}
