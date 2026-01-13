import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';

    const file = path.join(process.cwd(), 'public', 'data', 'products.json');
    const raw = fs.readFileSync(file, 'utf-8');
    const products = JSON.parse(raw);

    if (!q) return NextResponse.json(products);

    const res = products.filter((p: any) => p.name.toLowerCase().includes(q.toLowerCase()));
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json({ error: 'Cannot search products' }, { status: 500 });
  }
}
