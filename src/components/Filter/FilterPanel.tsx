"use client";  // ← BỎ COMMENT
import { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';  // ← BỎ COMMENT

interface Brand {
  id: number;
  name: string;
}

type Props = { onApply: (filters: any) => void };

export default function FilterPanel({ onApply }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCarModel, setSelectedCarModel] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetch('/data/categories.json')
      .then((r) => r.json())
      .then((data) => {
        // data may be an array of strings or objects; normalize to {id,name}
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
          setCategories(data.map((name: string, idx: number) => ({ id: idx + 1, name, icon: '', why: '', buyWhen: '' })));
        } else if (Array.isArray(data)) {
          setCategories(data as Category[]);
        } else {
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error('Lỗi tải categories:', err);
        setCategories([]);
      });

    fetch('/data/car-models.json')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
          setCarModels(data.map((name: string, idx: number) => ({ id: idx + 1, name })));
        } else if (Array.isArray(data)) {
          setCarModels(data as CarModel[]);
        } else {
          setCarModels([]);
        }
      })
      .catch((err) => {
        console.error('Lỗi tải car models:', err);
        setCarModels([]);
      });

    // Try to load brands.json; if missing, infer from car models
    fetch('/data/brands.json')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
          setBrands(data.map((name: string, idx: number) => ({ id: idx + 1, name })));
        } else if (Array.isArray(data)) {
          setBrands(data as Brand[]);
        } else {
          setBrands([]);
        }
      })
      .catch(() => {
        // fallback: infer brand from carModels first token
        try {
          setBrands((prev) => {
            if (prev.length > 0) return prev;
            const inferred = Array.from(new Set(carModels.map((m) => m.name.split(' ')[0]))).map((name, idx) => ({ id: idx + 1, name }));
            return inferred;
          });
        } catch (e) {
          setBrands([]);
        }
      });
  }, []);

  function toggleCategory(catName: string) {
    // compute next selection first to avoid reading stale state when calling onApply
    setSelectedCategories((s) => {
      const next = s.includes(catName) ? s.filter((x) => x !== catName) : [...s, catName];
      return next;
    });
    // call onApply with the new selection (read it from the event calculation, not from state)
    const next = selectedCategories.includes(catName) ? selectedCategories.filter((x) => x !== catName) : [...selectedCategories, catName];
    onApply({ categories: next, brands: selectedBrands, carModel: selectedCarModel, minPrice, maxPrice, minRating });
  }

  function toggleBrand(brandName: string) {
    setSelectedBrands((s) => {
      const next = s.includes(brandName) ? s.filter((x) => x !== brandName) : [...s, brandName];
      return next;
    });
    const next = selectedBrands.includes(brandName) ? selectedBrands.filter((x) => x !== brandName) : [...selectedBrands, brandName];
    onApply({ categories: selectedCategories, brands: next, carModel: selectedCarModel, minPrice, maxPrice, minRating });
  }

  function apply() {
    onApply({ categories: selectedCategories, brands: selectedBrands, carModel: selectedCarModel, minPrice, maxPrice, minRating });
  }

  function reset() {
    setSelectedCategories([]);
    setSelectedCarModel('');
    setSelectedBrands([]);
    setBrandSearch('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinRating(undefined);
    onApply({});
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      {/* Hãng xe */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900">Hãng xe</h4>
        <input
          placeholder="Tìm hãng..."
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          className="mt-2 w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-2 max-h-40 overflow-auto border border-gray-100 rounded">
          {brands
            .filter((b) => (brandSearch ? b.name.toLowerCase().includes(brandSearch.toLowerCase()) : true))
            .map((b) => (
                <label key={b.id} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50">
                <input type="checkbox" checked={selectedBrands.includes(b.name)} onChange={() => toggleBrand(b.name)} className="w-4 h-4" />
                {/* Try local icon first; if it 404s, fallback to server Brandfetch proxy */}
                <img
                  src={`/api/brand-logo?name=${encodeURIComponent(b.name)}`}
                  alt={b.name}
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1';
                      img.src = '/icons/default-brand.svg';
                    }
                  }}
                />
                <span className="text-sm">{b.name}</span>
              </label>
            ))}
          {brands.length === 0 && <div className="p-2 text-sm text-gray-500">Không có hãng</div>}
        </div>
      </div>

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
        <CategoryFilter
          categories={categories}
          selected={selectedCategories}
          toggle={toggleCategory}
        />
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
