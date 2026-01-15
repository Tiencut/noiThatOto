"use client";

import React from "react";
import { Product, ProductFormShape } from "./Types";

type Props = {
  products: Product[];
  loading: boolean;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onSave: (id?: string) => void;
  editingId: string | null;
  form: ProductFormShape;
  setForm: (f: ProductFormShape) => void;
};

export default function ProductList({ products, loading, onEdit, onDelete, onSave, editingId, form, setForm }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading ? (
        <div className="col-span-2 p-6 bg-white rounded shadow">Loading...</div>
      ) : products.length === 0 ? (
        <div className="col-span-2 p-6 bg-white rounded shadow">No products</div>
      ) : (
        products.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-start">
            <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              {p.image?.thumb ? <img src={p.image.thumb} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300">No image</div>}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category} • {Array.isArray(p.carModels) ? p.carModels.join(', ') : p.carModels}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">{p.price?.original ? p.price.original.toLocaleString() + '₫' : '-'}</div>
                  <div className="text-xs text-gray-500">{p.rating?.score ? `${p.rating.score} ★` : ''}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button className="px-3 py-1 text-sm border rounded" onClick={() => onEdit(p)}>Edit</button>
                <button className="px-3 py-1 text-sm border text-red-600 rounded" onClick={() => p.id && onDelete(p.id)}>Delete</button>
                <a href={p.affiliate?.shopee || '#'} target="_blank" rel="noreferrer" className="ml-auto text-sm text-blue-600">Go Shopee</a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
