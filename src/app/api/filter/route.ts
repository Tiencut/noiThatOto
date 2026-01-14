import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { applyFilters } from '../../../lib/utils/filter';

// Simple in-memory cache to avoid re-reading file and re-filtering too often
let PRODUCTS_CACHE: any[] | null = null;
const FILTER_CACHE = new Map<string, { ts: number; result: any[] }>();
const FILTER_CACHE_TTL = 30 * 1000; // 30s

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;

    const q = params.get('q') || undefined;
    const categories = params.get('categories') ? params.get('categories')!.split(',') : undefined;
    const brands = params.get('brands') ? params.get('brands')!.split(',') : undefined;
    const carModel = params.get('carModel') || undefined;
    const minPrice = params.get('minPrice') ? Number(params.get('minPrice')) : undefined;
    const maxPrice = params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined;
    const minRating = params.get('minRating') ? Number(params.get('minRating')) : undefined;
    const sortBy = params.get('sortBy') || undefined;

    const file = path.join(process.cwd(), 'public', 'data', 'products.json');
    // Load products once into memory
    if (!PRODUCTS_CACHE) {
      const raw = fs.readFileSync(file, 'utf-8');
      PRODUCTS_CACHE = JSON.parse(raw);
    }
    const products = PRODUCTS_CACHE;

    // Use a cache for filter results keyed by params string
    const cacheKey = params.toString();
    const cached = FILTER_CACHE.get(cacheKey);
    let filtered: any[];
    const now = Date.now();
    if (cached && now - cached.ts < FILTER_CACHE_TTL) {
      filtered = cached.result;
    } else {
      filtered = applyFilters(products, { q, categories, brands, carModel, minPrice, maxPrice, minRating, sortBy });
      FILTER_CACHE.set(cacheKey, { ts: now, result: filtered });
    }

    // Pagination
    const page = params.get('page') ? Math.max(1, Number(params.get('page'))) : 1;
    const limit = params.get('limit') ? Math.max(1, Number(params.get('limit'))) : 48;
    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = filtered.slice(start, end);

    const res = NextResponse.json({ items, total, page, limit });
    // Cache on CDN/edge for short time and allow stale-while-revalidate
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (err) {
    return NextResponse.json({ error: 'Cannot read products' }, { status: 500 });
  }
}
