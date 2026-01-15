"use client";

import React, { useEffect, useState } from "react";
import { Product, ProductFormShape } from "./Types";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import LogsPanel from "./LogsPanel";
import StatsBadge from "./StatsBadge";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [form, setForm] = useState<ProductFormShape>({
    name: "",
    category: "",
    price: { original: 0 },
    image: { thumb: "" },
    affiliate: { shopee: "", lazada: "", tiktok: "" },
    description: "",
    carModels: "",
    tags: "",
  });

  useEffect(() => {
    fetchLogs();
    fetchProducts();
  }, []);

  async function fetchLogs() {
    try {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      setLogs(data.lines || []);
    } catch (err) {
      setLogs([]);
    }
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ name: "", category: "", price: { original: 0 }, image: { thumb: "" }, affiliate: { shopee: "", lazada: "", tiktok: "" }, description: "", carModels: "", tags: "" });
    setEditingId(null);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await fetchProducts();
        resetForm();
      } else {
        console.error("Create failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function startEdit(p: Product) {
    setEditingId(p.id as string);
    setForm({ ...p, carModels: Array.isArray(p.carModels) ? p.carModels.join(", ") : (p.carModels as string) || "", tags: Array.isArray(p.tags) ? p.tags.join(", ") : (p.tags as string) || "" } as ProductFormShape);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSave(id?: string) {
    if (!id) return;
    try {
      const payload: any = { ...form };
      if (typeof payload.carModels === "string") payload.carModels = payload.carModels.split(",").map((s: string) => s.trim()).filter(Boolean);
      if (typeof payload.tags === "string") payload.tags = payload.tags.split(",").map((s: string) => s.trim()).filter(Boolean);
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchProducts();
        resetForm();
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Xóa sản phẩm này?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchProducts();
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Quản lý sản phẩm & affiliate links</p>
        </div>
        <div className="text-right">
          <StatsBadge count={products.length} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <ProductForm form={form} setForm={setForm} onAdd={handleAdd} onReset={resetForm} editingId={editingId} />
        </div>

        <div className="lg:col-span-2">
          <ProductList products={products} loading={loading} onEdit={startEdit} onDelete={handleDelete} onSave={handleSave} editingId={editingId} form={form} setForm={setForm} />
        </div>
      </div>

      <div className="mt-6">
        <LogsPanel lines={logs} />
      </div>
    </div>
  );
}
