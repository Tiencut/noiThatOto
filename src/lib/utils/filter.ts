export type Filters = {
  q?: string;
  categories?: string[];
  brands?: string[];
  carModel?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: string;
};

export function getLowestPrice(product: any) {
  const prices = [product.price?.shopee, product.price?.lazada, product.price?.tiktok].filter(Boolean);
  return Math.min(...prices);
}

export function applyFilters(products: any[], filters: Filters) {
  let res = products.slice();

  if (filters.q) {
    const q = filters.q.toLowerCase();
    res = res.filter((p) => p.name.toLowerCase().includes(q));
  }

  if (filters.categories && filters.categories.length > 0) {
    res = res.filter((p) => filters.categories!.includes(p.category));
  }

  if (filters.brands && filters.brands.length > 0) {
    const bs = filters.brands.map((b) => b.toLowerCase());
    res = res.filter((p) => {
      // 1) if product has a brand field
      if (p.brand && bs.includes(String(p.brand).toLowerCase())) return true;
      // 2) if product name mentions the brand
      if (p.name && bs.some((b) => String(p.name).toLowerCase().includes(b))) return true;
      // 3) if any product tag matches
      if (p.tags && Array.isArray(p.tags) && p.tags.some((t: string) => bs.includes(t.toLowerCase()))) return true;
      // 4) if any car model string contains the brand name (e.g., "Kia Sorento")
      if (p.carModels && Array.isArray(p.carModels) && p.carModels.some((m: string) => bs.some((b) => m.toLowerCase().includes(b)))) return true;
      return false;
    });
  }

  if (filters.carModel) {
    res = res.filter((p) => p.carModels && p.carModels.includes(filters.carModel!));
  }

  if (typeof filters.minPrice === 'number' || typeof filters.maxPrice === 'number') {
    res = res.filter((p) => {
      const price = getLowestPrice(p);
      if (typeof filters.minPrice === 'number' && price < filters.minPrice!) return false;
      if (typeof filters.maxPrice === 'number' && price > filters.maxPrice!) return false;
      return true;
    });
  }

  if (typeof filters.minRating === 'number') {
    res = res.filter((p) => (p.rating?.score || 0) >= filters.minRating!);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'sales':
        res.sort((a, b) => (b.sales?.monthly || 0) - (a.sales?.monthly || 0));
        break;
      case 'price-asc':
        res.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
        break;
      case 'price-desc':
        res.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
        break;
      case 'rating':
        res.sort((a, b) => (b.rating?.score || 0) - (a.rating?.score || 0));
        break;
      case 'new':
        res.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      default:
        break;
    }
  }

  return res;
}
