"use client";
import React, { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface CarModel {
  id: number;
  name: string;
}

type Props = { onApply: (filters: any) => void };

export default function FilterPanel({ onApply }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [carModels, setCarModels] = useState<CarModel[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCarModel, setSelectedCarModel] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetch('/data/categories.json')
      .then((r) => r.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error('Lỗi tải categories:', err);
        setCategories([]);
      });
    
    fetch('/data/car-models.json')
      .then((r) => r.json())
      .then((data) => setCarModels(data))
      .catch((err) => {
        console.error('Lỗi tải car models:', err);
        setCarModels([]);
      });
  }, []);

  function toggleCategory(catName: string) {
    setSelectedCategories((s) => (s.includes(catName) ? s.filter((x) => x !== catName) : [...s, catName]));
  }

  function apply() {
    onApply({ categories: selectedCategories, carModel: selectedCarModel, minPrice, maxPrice, minRating });
  }

  function reset() {
    setSelectedCategories([]);
    setSelectedCarModel('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinRating(undefined);
    onApply({});
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      {/* Model xe */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900">Model xe</h4>
        <select 
          value={selectedCarModel} 
          onChange={(e) => setSelectedCarModel(e.target.value)} 
          className="mt-2 w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả</option>
          {carModels.map((m) => (
            <option key={m.id} value={m.name}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Loại phụ kiện */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900">Loại phụ kiện</h4>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <label 
              key={c.id} 
              className={`text-sm inline-flex items-center gap-2 cursor-pointer transition ${
                selectedCategories.includes(c.name) ? 'font-medium text-blue-600' : 'text-gray-700'
              }`}
            >
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(c.name)} 
                onChange={() => toggleCategory(c.name)}
                className="w-4 h-4 cursor-pointer"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      {/* Giá */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900">Giá (VNĐ)</h4>
        <div className="flex items-center gap-2 mt-2">
          <input 
            type="number" 
            placeholder="Min" 
            min="0"
            max="5000000"
            value={minPrice ?? ''} 
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)} 
            className="border border-gray-300 px-2 py-1 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="number" 
            placeholder="Max" 
            min="0"
            max="5000000"
            value={maxPrice ?? ''} 
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)} 
            className="border border-gray-300 px-2 py-1 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900">Rating</h4>
        <select 
          value={minRating ?? ''} 
          onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : undefined)} 
          className="mt-2 w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả</option>
          <option value="4">≥ 4.0 ⭐</option>
          <option value="4.5">≥ 4.5 ⭐</option>
          <option value="4.8">≥ 4.8 ⭐</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={apply} 
          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition"
        >
          Áp dụng
        </button>
        <button 
          onClick={reset} 
          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded transition"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}
