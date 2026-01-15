"use client";

import React from "react";
import { ProductFormShape } from "./Types";

type Props = {
  form: ProductFormShape;
  setForm: (f: ProductFormShape) => void;
  onAdd: (e: React.FormEvent) => void;
  onReset: () => void;
  editingId: string | null;
};

export default function ProductForm({ form, setForm, onAdd, onReset, editingId }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Thêm / Chỉnh sửa sản phẩm</h3>
      <div className="mb-4 text-sm text-gray-600 bg-yellow-50 p-3 rounded">
        <strong>Hướng dẫn:</strong> Dán affiliate URLs tương ứng. carModels và tags nhập bằng dấu phẩy. Lưu ý: trên hosting serverless thay đổi file JSON là tạm thời.
      </div>
      <form className="space-y-3" onSubmit={onAdd}>
        <div>
          <label className="text-xs text-gray-600">Name</label>
          <input className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-200" placeholder="Tên sản phẩm" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="text-xs text-gray-600">Category</label>
          <input className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50" placeholder="Category" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </div>
        <div>
          <label className="text-xs text-gray-600">Image URL</label>
          <input className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50" placeholder="Image thumb URL" value={form.image?.thumb || ""} onChange={(e) => setForm({ ...form, image: { ...(form.image || {}), thumb: e.target.value } })} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-600">Price (original)</label>
            <input className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50" placeholder="0" type="number" value={form.price?.original ?? 0} onChange={(e) => setForm({ ...form, price: { ...(form.price || {}), original: Number(e.target.value) } })} />
          </div>
          <div>
            <label className="text-xs text-gray-600">Car models</label>
            <input className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50" placeholder="City, Civic" value={form.carModels || ""} onChange={(e) => setForm({ ...form, carModels: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-600">Description</label>
          <textarea className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50" placeholder="Mô tả ngắn" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label className="text-xs text-gray-600">Affiliate URLs</label>
          <input className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 mb-2" placeholder="Shopee affiliate URL" value={form.affiliate?.shopee || ""} onChange={(e) => setForm({ ...form, affiliate: { ...(form.affiliate || {}), shopee: e.target.value } })} />
          <input className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 mb-2" placeholder="Lazada affiliate URL" value={form.affiliate?.lazada || ""} onChange={(e) => setForm({ ...form, affiliate: { ...(form.affiliate || {}), lazada: e.target.value } })} />
          <input className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50" placeholder="TikTok affiliate URL" value={form.affiliate?.tiktok || ""} onChange={(e) => setForm({ ...form, affiliate: { ...(form.affiliate || {}), tiktok: e.target.value } })} />
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow" type="submit">{editingId ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
          <button type="button" className="flex-1 border border-gray-200 px-4 py-2 rounded-lg" onClick={onReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
