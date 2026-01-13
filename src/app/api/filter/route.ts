import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { applyFilters } from '../../../lib/utils/filter';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;

    const q = params.get('q') || undefined;
    const categories = params.get('categories') ? params.get('categories')!.split(',') : undefined;
    const carModel = params.get('carModel') || undefined;
    const minPrice = params.get('minPrice') ? Number(params.get('minPrice')) : undefined;
    const maxPrice = params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined;
    const minRating = params.get('minRating') ? Number(params.get('minRating')) : undefined;
    const sortBy = params.get('sortBy') || undefined;

    const file = path.join(process.cwd(), 'public', 'data', 'products.json');
    const raw = fs.readFileSync(file, 'utf-8');
    const products = JSON.parse(raw);

    const filtered = applyFilters(products, { q, categories, carModel, minPrice, maxPrice, minRating, sortBy });

    return NextResponse.json(filtered);
  } catch (err) {
    return NextResponse.json({ error: 'Cannot read products' }, { status: 500 });
  }
}
